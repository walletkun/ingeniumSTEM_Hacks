import { NextResponse } from "next/server";
import { db, auth, admin } from '@/firebaseAdmin';

const validateData = (data) => {
  if (!data.messages || !Array.isArray(data.messages) || data.messages.length === 0) {
    throw new Error("Invalid messages data");
  }
  if (!data.title) {
    throw new Error("Workspace title is required");
  }
};

export async function POST(req) {
  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      return NextResponse.json(
        { error: "You need to be logged in to save chats" },
        { status: 401 }
      );
    }

    // Verify the token
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;

    const { data } = await req.json();
    validateData(data);

    const { title, messages, fileContent } = data;
    //Get existed users collection
    const usersRef = db.collection('users').doc(userId);
    //and add a new workspace document



    // Create workspace document
    const workspaceRef = await usersRef.collection('workspaces').add({
      userId,
      title,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Create conversations subcollection document
    await workspaceRef.collection('conversations').add({
      messages,
      createAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    if (fileContent && fileContent.length > 0) {
      await workspaceRef.update({
        fileUrls: fileContent
      });
    }

    return NextResponse.json(
      {
        workspaceId: workspaceRef.id,
        workspaceTitle: title,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to save workspace", message: error.message },
      { status: 500 }
    );
  }
}