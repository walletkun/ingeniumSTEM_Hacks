import { admin, db, auth } from "@/firebaseAdmin";
import { NextResponse } from "next/server";
import { queryPinecone } from "@/app/pinecone_operations/pinecone_retrieve";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});


const systemPrompt = `Your role is to act as a friendly and highly effective AI tutor, with two primary functions: delivering outstanding communication and providing exceptional teaching on the selected subject. Follow these guidelines:
Subject-Specific Expertise: focus exclusively on the subject that the content given to you specifies. All responses, examples, and interactions should remain aligned with this topic, ensuring no deviation from the user's chosen focus.
Exceptional Teaching Skills: Your priority is to ensure the user fully understands the material being discussed. Use clear and engaging explanations and:
Ask follow-up questions to test the user's understanding of the topic in real-time.
If the user consistently answers incorrectly, strongly encourage them to practice more with you until they show signs of comprehension before moving forward.
If the user insists on proceeding despite lack of understanding, suggest they return to previous material, but proceed with the new lesson if they remain persistent.
Simplified Explanations: If the user repeatedly expresses difficulty understanding a concept:
Offer a simpler explanation.
If needed, provide a "5-year-old" level explanation to ensure the user grasps the basics.`;

export async function POST(req) {
    try {
        const { message, workspaceTitle } = await req.json();
        const authHeader = req.headers.get('authorization');
        const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

        if (!token) {
            return NextResponse.json({ error: 'You need to be logged in to send messages' }, { status: 401 });
        }

        // Verify the token
        let decodedToken;
        try {
            decodedToken = await auth.verifyIdToken(token);
        } catch (error) {
            console.error("Token verification failed:", error);
            return NextResponse.json({ error: 'Invalid authentication token' }, { status: 401 });
        }
        const userId = decodedToken.uid;
        console.log("User ID:", userId);

        // Get workspace snapshot
        const workspaceSnapshot = await db.collection('users').doc(userId)
            .collection('workspaces')
            .where('title', '==', workspaceTitle)
            .limit(1)
            .get();

        if (workspaceSnapshot.empty) {
            return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
        }

        // Get the workspace id that we're in
        const workspaceId = workspaceSnapshot.docs[0].id;
        
        //Refernce to the single conversaton docmnet
        const conversationRef = db.collection('users').doc(userId)
        .collection('workspaces').doc(workspaceId)
        .collection('conversations').doc('chat');

        
        //Get the current conversation or create it if it does not exist
        const conversationDoc = await conversationRef.get();
        let messages = [];
        if(conversationDoc.exists){
            messages = conversationDoc.data().messages || [];
        }

        //Add new user message
        const newUserMessage = {
            role: 'user',
            content: message,
            timestamp: Date.now(),
        }
        messages.push(newUserMessage);

        //Update the conversation document
        await conversationRef.set({ messages }, {merge: true});

        //Query Pinecone for top results as a string
        const pineconeResults = await queryPinecone(message, userId, workspaceId);

        //Prepare messages for OpenAI
        const openaiMessages = [
            {role: 'system', content: systemPrompt},
            ...messages.map(m => ({role: m.role, content: m.content})), //Only send the role and content to OpenAI,
            {role: 'system', content: `Relevant information: ${pineconeResults}`},
        ];

        try{
        // Generate AI response
        const completion = await openai.chat.completions.create({
            messages: openaiMessages,
            model: 'gpt-4',
            stream: true,
        });

        const stream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                let aiResponse = '';
                try {
                    for await (const chunk of completion) {
                        const content = chunk.choices[0]?.delta?.content || '';
                        aiResponse += content;
                        controller.enqueue(encoder.encode(content));
                    }
                } catch (error) {
                    console.error('AI Error:', error);
                    controller.error(error);
                } finally {
                    // Save AI response to conversation collection
                    const newAiMessage = {
                        role:'system',
                        content: aiResponse,
                        timestamp: Date.now(), //Use current timestamp instead of server timestamp to reduce error
                    }
                    messages.push(newAiMessage);

                    //Update the conversation document with the new message
                    await conversationRef.set({ messages }, {merge: true});
                    controller.close();
                }
            }
        });
        return new NextResponse(stream);
    }catch (openaiError) {
        console.error("OpenAI API error:", openaiError);
        return NextResponse.json({ error: 'Failed to generate AI response' }, { status: 500 });
    }
    } catch (e) {
        console.error('API Error:', e);
        return NextResponse.json({ error: 'An error occurred while processing your request' }, { status: 500 });
    }
}