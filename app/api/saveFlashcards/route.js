import { NextResponse } from "next/server";
import { db, auth, admin } from "@/firebaseAdmin";
import { FlashcardGenerator } from "@/app/flashcard";

export async function POST(req) {
  console.log("Received POST request to /api/saveFlashcards");

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

    const {
      workspaceId,
      flashcardsTitle,
      flashcardSize,
      flashcardDifficulty,
      flashcardTopic,
    } = await req.json();

    //Create a flashcards using the flashcard generator
    const generatedFlashcards = await FlashcardGenerator({
      flashcard_size: flashcardSize,
      flashcard_diff: flashcardDifficulty,
      flashcard_topic: flashcardTopic,
      user_id: userId,
      workspace_id: workspaceId || null,
    });

    //Create a flashcard based on workspace and workspaceid
    const flashcardRef = await db.collection("flashcards").add({
      title: flashcardsTitle,
      flashcards: generatedFlashcards,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      createdBy: userId,
      workspaces: workspaceId ? [workspaceId] : [], // Array of workspaces this flashcard set belongs to
      isPublic: false, // Flag to indicate if this set is publicly accessible
      accessibleTo: [userId], // Array of user IDs who can access this set
    });

    //Create a reference in the user's personal flashcards collection
    await db.collection("users").doc(userId).collection("flashcards").add({
      flashcardId: flashcardRef.id,
      flashcards: generatedFlashcards,
    });

    //if a worksapce is selected, create a reference there as well
    if (workspaceId) {
      await db
        .collection("workspaces")
        .doc(workspaceId)
        .collection("flashcards")
        .add({
          flashcardId: flashcardRef.id,
        });
    }

    console.log("Flashcard created successfully:", flashcardRef.id);

    return NextResponse.json(
      { flashcardId: flashcardRef.id, flashcards: generatedFlashcards },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/saveFlashcards:", error);
    return NextResponse.json(
      { error: "An error occurred while saving the flashcards" },
      { status: 500 }
    );
  }
}
