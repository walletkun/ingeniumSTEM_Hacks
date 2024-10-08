import { NextResponse } from "next/server";
import { db, auth, admin } from "@/firebaseAdmin";
import { generateEmbedding } from "@/app/pinecone_operations/pinecone_retrieve";
import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

const pinecone = new Pinecone({
   apiKey: process.env.PINECONE_APIKEY,
});

const indexName = "ai-tutor-index";

const upload = multer().fields([
  { name: "file", maxCount: 1 },
  { name: "title", maxCount: 1 },
]);

export const runtime = 'nodejs';

const validateData = (title, file) => {
  const errors = [];
  if (!title || title.trim().length === 0) {
    errors.push("Workspace title is required");
  }
  if (!file) {
    errors.push("File is required");
  }
  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};

const processFile = async (file) => {
  if (!file) {
    throw new Error("No file provided");
  }
  try {
    const content = await file.text();
    return content;
  } catch (error) {
    console.error("Error reading file:", error);
    throw new Error("Failed to read file content");
  }
};

export async function POST(req) {
  console.log("Received POST request to /api/saveWorkspace");
  try {
    return await new Promise((resolve, reject) => {
      upload(req, {}, async (err) => {
        if (err) {
          console.error(err);
          resolve(
            NextResponse.json(
              { error: "Error uploading file" },
              { status: 400 }
            )
          );
        }

        const authHeader = req.headers.get("Authorization");
        console.log(
          "Authorization header:",
          authHeader ? "Present" : "Missing"
        );

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
          resolve(
            NextResponse.json(
              { error: "Invalid or missing Authorization header" },
              { status: 401 }
            )
          );
        }

        const token = authHeader.split("Bearer ")[1];
        console.log("Token extracted");

        let decodedToken;
        try {
          decodedToken = await auth.verifyIdToken(token);
          console.log("Token verified successfully");
        } catch (verifyError) {
          console.error("Token verification failed:", verifyError);
          resolve(
            NextResponse.json(
              { error: "Invalid authentication token" },
              { status: 401 }
            )
          );
        }

        const userId = decodedToken.uid;
        console.log("User ID:", userId);

        const formData = await req.formData();
        const title = formData.get("title");
        const file = formData.get("file");

        try {
          validateData(title, file);
        } catch (validationError) {
          console.error("Data validation error:", validationError);
          resolve(
            NextResponse.json(
              { error: validationError.message },
              { status: 400 }
            )
          );
        }

        let fileContent;
        try {
          fileContent = await processFile(file);
        } catch (fileError) {
          console.error("File processing error:", fileError);
          resolve(
            NextResponse.json({ error: fileError.message }, { status: 400 })
          );
        }

        console.log("Creating workspace document");
        let workspaceRef;
        try {
          workspaceRef = await db
            .collection("users")
            .doc(userId)
            .collection("workspaces")
            .add({
              userId,
              title,
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
            });
          console.log("Workspace created with ID:", workspaceRef.id);

          await workspaceRef
            .collection("conversations")
            .doc("chat")
            .set({
              messages: [
                {
                  role: "system",
                  content: `Welcome to your new workspace: ${title}! How many I help you today?`,
                  timestamp: Date.now(),
                },
              ],
            });
          console.log(
            "Default conversation created for workspace:",
            workspaceRef.id
          );
        } catch (dbError) {
          console.error("Error creating workspace in Firestore:", dbError);
          resolve(
            NextResponse.json(
              { error: "Failed to create workspace in database" },
              { status: 500 }
            )
          );
        }

        if (fileContent) {
          console.log("Processing file content for Pinecone");
          try {
            const maxTokens = 8192;
            const text = fileContent.substring(0, maxTokens);
            const embedding = await generateEmbedding(text);
            if (!embedding) {
              throw new Error("Failed to generate embedding");
            }
            const index = pinecone.Index(indexName);
            await index.upsert([
              {
                id: workspaceRef.id,
                values: embedding,
                metadata: {
                  user_id: userId,
                  workspace_id: workspaceRef.id,
                  title: title,
                  text: fileContent,
                },
              },
            ]);
            console.log("File content uploaded to Pinecone");
          } catch (pineconeError) {
            console.error("Error uploading to Pinecone:", pineconeError);
            resolve(
              NextResponse.json(
                { error: "Failed to process file for AI integration" },
                { status: 500 }
              )
            );
          }
        }

        resolve(
          NextResponse.json(
            { message: "Workspace created successfully" },
            { status: 201 }
          )
        );
      });
    });
  } catch (error) {
    console.error("Error in POST /api/saveWorkspace:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      }
  })
  }
}
