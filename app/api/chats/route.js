import { NextResponse } from "next/server";
import { db, auth } from "@/firebaseAdmin";
import { queryPinecone } from "@/app/pinecone_operations/pinecone_retrieve";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const workspaceTitle = searchParams.get("title");
    const conversationId = searchParams.get("conversationId");

    console.log("Received request for workspace:", workspaceTitle);

    const authHeader = req.headers.get("Authorization");
    const token =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

    if (!token) {
      console.log("No token provided");
      return NextResponse.json(
        { error: "You need to be logged in to get chats" },
        { status: 401 }
      );
    }

    // Verify the token
    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(token);
    } catch (error) {
      console.error("Token verification failed:", error);
      return NextResponse.json(
        { error: "Invalid authentication token" },
        { status: 401 }
      );
    }

    const userId = decodedToken.uid;
    console.log(
      "Fetching workspace for user:",
      userId,
      "with title:",
      workspaceTitle
    );

    // Get the workspace
    const workspacesSnapshot = await db
      .collection("users")
      .doc(userId)
      .collection("workspaces")
      .where("title", "==", workspaceTitle)
      .limit(1)
      .get();

    if (workspacesSnapshot.empty) {
      console.log("Workspace not found for title:", workspaceTitle);
      return NextResponse.json(
        { error: "Workspace not found" },
        { status: 404 }
      );
    }

    const workspaceDoc = workspacesSnapshot.docs[0];
    const workspaceRef = workspaceDoc.ref;

    console.log("Workspace found:", workspaceDoc.id);

    let conversationDoc;
    if (conversationId) {
      conversationDoc = await workspaceRef
        .collection("conversations")
        .doc(conversationId)
        .get();
    } else {
      const conversationSnapshot = await workspaceRef
        .collection("conversations")
        .orderBy("createdAt", "desc")
        .limit(1)
        .get();

      if (conversationSnapshot.empty) {
        const newConversationRef = workspaceRef
          .collection("conversations")
          .doc();
        await newConversationRef.set({
          messages: [
            {
              role: "system",
              content: `Welcome to your new workspace: ${workspaceTitle}! How may I help you today?`,
              timestamp: Date.now(),
            },
          ],
          createdAt: Date.now(),
        });

        conversationDoc = await newConversationRef.get();
      } else {
        conversationDoc = conversationSnapshot.docs[0];
      }
    }

    if (!conversationDoc.exists) {
      console.log("Conversation not found for workspace: ", workspaceTitle);
      return NextResponse.json({ messages: [] });
    }

    const conversationData = conversationDoc.data();

    console.log(
      "Conversation data retrieved:",
      JSON.stringify(conversationData)
    );

    // Query Pinecone for relevant information
    const lastMessage =
      conversationData.messages[conversationData.messages.length - 1];
    const pineconeResults = await queryPinecone(
      lastMessage.content,
      userId,
      workspaceDoc.id
    );

    // Add Pinecone results to the response
    const response = {
      conversationId: conversationDoc.id,
      title: conversationData.title,
      messages: Array.isArray(conversationData.messages)
        ? conversationData.messages
        : [],
      relevantInfo: pineconeResults,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to get chat messages", message: error.message },
      { status: 500 }
    );
  }
}
