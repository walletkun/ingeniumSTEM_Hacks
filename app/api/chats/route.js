import { NextResponse } from "next/server";
import { db, auth } from "@/firebaseAdmin";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const workspaceTitle = searchParams.get('title') || searchParams.get("workspaceTitle");
    const conversationId = searchParams.get("conversationId");

    console.log("Received request for workspace:", workspaceTitle, "conversation:", conversationId);

    const authHeader = req.headers.get("Authorization");
    const token = authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      console.log("No token provided");
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    // Verify the token
    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(token);
    } catch (error) {
      console.error("Token verification failed:", error);
      return NextResponse.json({ error: "Invalid authentication token" }, { status: 401 });
    }

    const userId = decodedToken.uid;
    console.log("User ID:", userId);

    // Get the workspace
    const workspaceSnapshot = await db
      .collection("users")
      .doc(userId)
      .collection("workspaces")
      .where("title", "==", workspaceTitle)
      .limit(1)
      .get();

    if (workspaceSnapshot.empty) {
      console.log("Workspace not found for title:", workspaceTitle);
      return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
    }

    const workspaceDoc = workspaceSnapshot.docs[0];
    console.log("Workspace found:", workspaceDoc.id);

    if (conversationId) {
      // Get a specific conversation
      const conversationDoc = await workspaceDoc.ref
        .collection("conversations")
        .doc(conversationId)
        .get();

      if (!conversationDoc.exists) {
        console.log("Conversation not found:", conversationId);
        return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
      }

      const conversationData = conversationDoc.data();
      console.log("Conversation data retrieved for ID:", conversationId);

      return NextResponse.json({
        conversationId: conversationDoc.id,
        title: conversationData.title,
        messages: conversationData.messages || []
      });
    } else {
      // Get all conversations for the workspace
      const conversationsSnapshot = await workspaceDoc.ref
        .collection("conversations")
        .orderBy("createdAt", "desc")
        .get();

      const conversations = conversationsSnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title,
        createdAt: doc.data().createdAt
      }));

      console.log("Retrieved", conversations.length, "conversations for workspace:", workspaceTitle);
      // Log the IDs of the first few conversations (up to 5) for debugging
      conversations.slice(0, 5).forEach((conv, index) => {
        console.log(`Conversation ${index + 1} ID:`, conv.id);
      });

      return NextResponse.json({ conversations });
    }
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to get chat messages", message: error.message },
      { status: 500 }
    );
  }
}