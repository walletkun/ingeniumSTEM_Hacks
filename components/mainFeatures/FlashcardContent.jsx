"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getAuth } from "firebase/auth";
import { auth } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function FlashcardSet() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");

  const params = useParams();
  const { flashcardId, workspaceId } = params;

  useEffect(() => {
    const fetchFlashcardSet = async () => {
      setLoading(true);
      setError(null);
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");

        const idToken = await user.getIdToken();
        const url = workspaceId
          ? `/api/getFlashcards?flashcardId=${flashcardId}&workspaceId=${workspaceId}`
          : `/api/getFlashcards?flashcardId=${flashcardId}`;

        console.log("Fetching flashcard set from:", url);

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Failed to fetch flashcard set: ${
              errorData.error || response.statusText
            }`
          );
        }

        const data = await response.json();
        console.log("Received flashcard data:", JSON.stringify(data, null, 2));

        let processedFlashcards = [];
        if (Array.isArray(data.flashcards)) {
          processedFlashcards = data.flashcards;
        } else if (typeof data.flashcards === "object") {
          processedFlashcards = Object.values(data.flashcards);
        }

        if (processedFlashcards.length === 0) {
          throw new Error("No flashcards found in this set");
        }

        console.log(
          "Processed flashcards:",
          JSON.stringify(processedFlashcards, null, 2)
        );

        setFlashcards(processedFlashcards);
        setTitle(data.title || "Untitled Flashcard Set");
      } catch (err) {
        console.error("Error fetching flashcard set:", err);
        setError(
          err.message || "Failed to load flashcard set. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcardSet();
  }, [flashcardId, workspaceId]);

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
    setShowAnswer(false);
  };

  const prevCard = () => {
    setCurrentCardIndex(
      (prev) => (prev - 1 + flashcards.length) % flashcards.length
    );
    setShowAnswer(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (flashcards.length === 0)
    return <div>No flashcards found in this set.</div>;

  const currentCard = flashcards[currentCardIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <Card className="w-full max-w-md bg-gray-800 text-white">
        <CardContent className="p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">
              {showAnswer ? "Answer" : "Question"}
            </h2>
            <p className="mt-2">
              {showAnswer
                ? currentCard.answer ||
                  currentCard.front ||
                  "No answer available"
                : currentCard.back ||
                  currentCard.back ||
                  "No question available"}
            </p>
          </div>
          <div className="flex justify-between">
            <Button onClick={prevCard}>Previous</Button>
            <Button onClick={() => setShowAnswer(!showAnswer)}>
              {showAnswer ? "Show Question" : "Show Answer"}
            </Button>
            <Button onClick={nextCard}>Next</Button>
          </div>
        </CardContent>
      </Card>
      <div className="mt-4">
        Card {currentCardIndex + 1} of {flashcards.length}
      </div>
    </div>
  );
}
