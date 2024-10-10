import { NextResponse } from "next/server";
import { db, auth, admin } from "@/firebaseAdmin";
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import uploadFile from '@/app/uploadFile';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  console.log("Received POST request to /api/saveWorkspace");

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Invalid or missing Authorization header" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;

    const formData = await req.formData();
    const title = formData.get("title");
    const file = formData.get("file");

    if (!title || !file) {
      return NextResponse.json({ error: "Title and file are required" }, { status: 400 });
    }

    // Ensure the uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    // Save the file to the uploads directory
    const buffer = await file.arrayBuffer();
    const filename = `${Date.now()}-${file.name}`;
    const filepath = path.join(uploadsDir, filename);
    await writeFile(filepath, Buffer.from(buffer));

    // Create workspace document
    const workspaceRef = await db.collection("users").doc(userId).collection("workspaces").add({
      userId,
      title,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Process the uploaded file
    const { parsedText, llamaOutput, pineconeOutput } = await uploadFile(filename, userId, workspaceRef.id);

    const enhancedSystemMessage = `Welcome to your new workspace: ${title}! I've processed your uploaded document. 
    Here's a summary: ${llamaOutput.summary}. How may I assist you?`;
    // Create initial conversation
    await workspaceRef.collection("conversations").doc("chat").set({
      messages: [
        {
          role: "system",
          content: enhancedSystemMessage,
          timestamp: Date.now(),
        },
      ],
    });
    const workspaceSnapshot = await workspaceRef.get();
    const workspaceData = workspaceSnapshot.data();

    return NextResponse.json(
      { 
        message: "Workspace created successfully", 
        workspace: {
          id: workspaceRef.id,
          title: workspaceData.title,
          createdAt: workspaceData.createdAt.toDate().toISOString(),
          userId: workspaceData.userId,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/saveWorkspace:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}