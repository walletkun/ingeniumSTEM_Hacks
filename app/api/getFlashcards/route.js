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
    const flashcardId = searchParams.get("flashcardId");

    if (flashcardId) {
      // Fetch a specific flashcard set
      let flashcardDoc;
      if (workspaceId) {
        const workspaceFlashcardRef = await db
          .collection("workspaces")
          .doc(workspaceId)
          .collection("flashcards")
          .where("flashcardId", "==", flashcardId)
          .limit(1)
          .get();

        if (workspaceFlashcardRef.empty) {
          return NextResponse.json({ error: "Flashcard set not found in workspace" }, { status: 404 });
        }

        flashcardDoc = await db
          .collection("users")
          .doc(userId)
          .collection("flashcards")
          .doc(flashcardId)
          .get();
      } else {
        flashcardDoc = await db
          .collection("users")
          .doc(userId)
          .collection("flashcards")
          .doc(flashcardId)
          .get();
      }

      if (!flashcardDoc.exists) {
        return NextResponse.json({ error: "Flashcard set not found" }, { status: 404 });
      }

      const flashcardData = flashcardDoc.data();
      return NextResponse.json({
        id: flashcardDoc.id,
        title: flashcardData.title,
        flashcards: flashcardData.flashcards,
        difficulty: flashcardData.flashcardDifficulty
      });
    } else {
      // Fetch all flashcard sets
      let flashcardQuery;
      if (workspaceId) {
        const workspaceFlashcardRefs = await db
          .collection("workspaces")
          .doc(workspaceId)
          .collection("flashcards")
          .get();

        const flashcardIds = workspaceFlashcardRefs.docs.map(doc => doc.data().flashcardId);

        flashcardQuery = db
          .collection("users")
          .doc(userId)
          .collection("flashcards")
          .where(admin.firestore.FieldPath.documentId(), "in", flashcardIds);
      } else {
        flashcardQuery = db
          .collection("users")
          .doc(userId)
          .collection("flashcards");
      }

      const flashcards = await flashcardQuery.get();
      const flashcardData = flashcards.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return NextResponse.json({ flashcards: flashcardData });
    }
  } catch (error) {
    console.error("Error fetching flashcards: ", error);
    return NextResponse.json(
      { error: "An error occurred while fetching flashcards" },
      { status: 500 }
    );
  }
}