import { NextResponse } from "next/server";
import { db, auth } from '@/firebaseAdmin';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const workspaceTitle = searchParams.get('title');

    const authHeader = req.headers.get("Authorization");
    const token = authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      return NextResponse.json(
        { error: "You need to be logged in to get chats" },
        { status: 401 }
      );
    }

    // Verify the token
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;


    console.log("Fetching workspace for user:", userId, "with title:", workspaceTitle);


    // Get the workspace
    const workspacesSnapshot = await db.collection('users').doc(userId)
      .collection('workspaces')
      .where('title', '==', workspaceTitle)
      .limit(1)
      .get();

    if (workspacesSnapshot.empty) {
      return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
    }

    const workspaceDoc = workspacesSnapshot.docs[0];
    const workspaceRef = workspaceDoc.ref;

    console.log("Workspace found:", workspaceDoc.id);


    // Get the conversation document
    const conversationDoc= await workspaceRef.collection('conversations').doc('chat').get();
    

    if(!conversationDoc.exists){
      return NextResponse.json({messages: []});
    }

    const conversationData = conversationDoc.data();

    console.log("Conversation data retrieved:", conversationData);


    return NextResponse.json(conversationData);

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to get chat messages", message: error.message },
      { status: 500 }
    );
  }
}