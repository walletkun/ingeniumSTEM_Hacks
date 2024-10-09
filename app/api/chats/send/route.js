import { db, auth } from "@/firebaseAdmin";
import { NextResponse } from "next/server";
import { queryPinecone } from "@/app/pinecone_operations/pinecone_retrieve";
import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config();


const openai = new OpenAI({apiKey: ""});


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
        const { message, workspaceTitle, conversationId} = await req.json();
        console.log("Received conversationId:", conversationId);
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
        
        //Refernce to the conversation document
        let conversationRef;
        if(conversationId){
            conversationRef = db.collection('users').doc(userId)
            .collection('workspaces').doc(workspaceId)
            .collection('conversations').doc(conversationId);
            console.log("Using existing conversation:", conversationId);
        }else{
            conversationRef = db.collection('users').doc(userId)
            .collection('workspaces').doc(workspaceId).collection('conversations').doc();
            console.log("Using existing conversation:", conversationId);
        }

        //Get the current conversation or create it if it does not exist
        const conversationDoc = await conversationRef.get();
        let messages = [];
        let isNewConversation = false;
        if(conversationDoc.exists){
            messages = conversationDoc.data().messages || [];
        }else{
            //Set isNewConversation to true
            isNewConversation = true;
            //Create a new conversation document
            await conversationRef.set({
                title: `New Chat ${Date.now()}`,
                createdAt: Date.now(),
                messages: []
            });
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
            ...messages.filter(m => m.content !== null && m.content !== undefined).map(m => ({ role: m.role, content: m.content })),
            {role: 'system', content: `Relevant information: ${pineconeResults}`},
        ];

        try{
        // Generate AI response
        const completion = await openai.chat.completions.create({
            messages: openaiMessages,
            model: 'gpt-4',
            stream: true,
        });
        let suggestedTitle;
        if(isNewConversation){
            const titlePrompt = `Summarize the following conversation in 5 words or less: "${message}"`;
            try{
                const titleCompletion = await openai.chat.completions.create({
                    messages: [{ role: 'user', content: titlePrompt }],
                    model: 'gpt-4o'
                });
                suggestedTitle = titleCompletion.choices[0].message.content.trim();
                await conversationRef.set({title: suggestedTitle}, {merge: true});
                console.log("Generated suggested Title: ", suggestedTitle);
            }catch(error){
                console.error("Failed to generate suggested title:", error);
                suggestedTitle = `New Chat ${Date.now()}`;
            }
        }

        console.log(suggestedTitle)

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
                        role: 'system',
                        content: aiResponse,
                        timestamp: Date.now(),
                    }
                    messages.push(newAiMessage);

                    //Update the conversation document with the new message
                    await conversationRef.set({ messages }, {merge: true});
                    controller.close();
                }
            }
        });
        const response = new NextResponse(stream, {
            headers: {
                'X-Conversation-Id' : conversationRef.id,
                'X-Conversation-Title': suggestedTitle || `New Chat ${Date.now()}`,
            },
        })
        return response;
    }catch (openaiError) {
        console.error("OpenAI API error:", openaiError);
        return NextResponse.json({ error: 'Failed to generate AI response' }, { status: 500 });
    }
    } catch (e) {
        console.error('API Error:', e);
        return NextResponse.json({ error: 'An error occurred while processing your request' }, { status: 500 });
    }
}