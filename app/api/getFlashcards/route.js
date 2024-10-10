import { db, auth } from "@/firebaseAdmin";
import { NextResponse } from "next/server";

export async function GET(req) {
  console.log("Received GET request to /api/getFlashcards");

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Invalid or missing Authorization header" },
        { status: 401 }
      );
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;

    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId");

    let flashcardQuery;
    if (workspaceId) {
      flashcardQuery = db
        .collection("flashcards")
        .where("createdBy", "==", userId)
        .where("workspaces", "array-contains", workspaceId);
    } else {
      flashcardQuery = db
        .collection("users")
        .doc(userId)
        .collection("flashcards")
        .where("createdBy", "==", userId);
    }
    const flashcards = await db
      .collection("users")
      .doc(userId)
      .collection("flashcards")
      .get();
    const flashcardData = flashcards.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ flashcards: flashcardData, flashcardTitle: flashcardData.title });
  } catch (error) {
    console.error("Error fetching flashcards: ", error);
    return NextResponse.json(
      { error: "An error occurred while fetching flashcards" },
      { status: 500 }
    );
  }
}
