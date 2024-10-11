"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowRight,
  ArrowLeft,
  LogOut,
  SquareChartGanttIcon,
  Layers3,
  CircleHelp,
  Ellipsis,
  Pencil,
  Trash2,
} from "lucide-react";

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

  const logOut = async () => {
    try {
        await signOut(authInstance);
        console.log("User logged out successfully");
        router.push("/auth/login/email");
        } catch (error) {
        console.error("Error logging out:", error);
        }
    };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-black">
        <motion.div
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link href="/" className="text-2xl font-semibold" prefetch={false}>
            CICERO
          </Link>
        </motion.div>
        <div className="flex items-center gap-1">
          <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.9 }}>
            <Link href="/homePage" className="font-sans rounded-full bg-[#000000] px-4 py-2 text-sm font-normal text-white hover:bg-[#1a1a1a] transition-colors duration-300 ease-in-out flex items-center space-x-2" prefetch={false}>
              <SquareChartGanttIcon className="h-5 w-5 mr-2"/>
              Workspaces
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.9 }}>
            <Link href="/flashcards" className="font-sans rounded-full bg-[#000000] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a1a1a] transition-colors duration-300 ease-in-out flex items-center space-x-2" prefetch={false}>
              <Layers3 className="h-5 w-5 mr-2"/>
              Flashcards
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.9 }}>
            <Link href="/helpPage" className="font-sans rounded-full bg-[#000000] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a1a1a] transition-colors duration-300 ease-in-out flex items-center space-x-2" prefetch={false}>
              <CircleHelp className="h-5 w-5 mr-2"/>
              Help
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.9 }}>
            <Link href="#" onClick={(e) => { e.preventDefault(); logOut(); }} className="font-sans rounded-full bg-[#000000] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a1a1a] transition-colors duration-300 ease-in-out flex items-center space-x-2" prefetch={false}>
              <LogOut className="h-5 w-5 mr-2"/>
              Log out
            </Link>
          </motion.div>
        </div>
      </header>
      
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <Card className="w-full max-w-xl bg-secondary text-white h-[300px]">
          <CardContent className="p-6 flex flex-col h-full">
            <h2 className="text-xl font-semibold mb-4">
              {showAnswer ? "Answer" : "Question"}
            </h2>
            <div className="flex-grow flex items-center justify-center">
              <p className="text-xl text-center mb-7 font-medium">
                {showAnswer
                  ? currentCard.back || "No answer available"
                  : currentCard.front || "No question available"}
              </p>
            </div>
            <div className="mt-auto flex justify-between">
            <motion.div
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.9 }}
            > 
              <Button 
                className="bg-muted hover:bg-primary hover:text-black rounded-lg" 
                onClick={prevCard}
              >
                <ArrowLeft className="h-5 w-5"/>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button 
                className="bg-muted hover:bg-primary hover:text-black rounded-lg" 
                onClick={() => setShowAnswer(!showAnswer)}>
                {showAnswer ? "Show Question" : "Show Answer"}
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button 
                className="bg-muted hover:bg-primary hover:text-black rounded-lg" 
                onClick={nextCard}
              >
                <ArrowRight className="h-5 w-5"/>
              </Button>
            </motion.div>
            </div>
          </CardContent>
        </Card>
        <div className="mt-4">
          Card {currentCardIndex + 1} of {flashcards.length}
        </div>
      </main>

      <footer className="bg-[#222] py-6 px-6 text-[#c0c0c0] text-sm font-mono">
        <div className="mx-auto flex items-center justify-between">
          <p>&copy; 2024 CICERO. All rights reserved.</p>
          <nav className="flex items-center gap-4">
          </nav>
        </div>
      </footer>
    </div>
  );
}
