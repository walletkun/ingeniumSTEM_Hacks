"use client";
import Link from "next/link";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowRightIcon,
  SearchX,
  AppWindow,
  LogOut,
  SquareChartGanttIcon,
  Layers3,
  CircleHelp,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import FlashcardGenerator from "@/app/flashcard";

//firebase imports
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

export const Flashcards = () => {
  const [difficulty, setDifficulty] = useState(3);
  const [cardAmount, setCardAmount] = useState(20);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flashcardsTitle, setFlashcardsTitle] = useState("");
  const [flashcardTopic, setFlashcardTopic] = useState("");
  const [userFlashcardSets, setUserFlashcardSets] = useState([]);
  const [workspaceFlashcardSets, setWorkspaceFlashcardSets] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  const authInstance = getAuth();
  const searchParams = useSearchParams();
  const workspaceId = searchParams.get("workspaceId");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, (currentUser) => {
      console.log(
        "Auth state changed, user: ",
        currentUser ? currentUser.uid : "not logged in"
      );
      setUser(currentUser);
      if (currentUser) {
        fetchFlashcards(currentUser);
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [workspaceId]);

  const fetchFlashcards = async (currentUser) => {
    setLoading(true);
    setError(null);
    try {
      const idToken = await currentUser.getIdToken();

      // Fetch user's personal flashcard sets
      const userResponse = await fetch("/api/getFlashcards", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user flashcards");
      }
      const userData = await userResponse.json();
      setUserFlashcardSets(userData.flashcards);

      // Fetch workspace flashcard sets if workspaceId is present
      if (workspaceId) {
        const workspaceResponse = await fetch(
          `/api/getFlashcards?workspaceId=${workspaceId}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );

        if (!workspaceResponse.ok) {
          throw new Error("Failed to fetch workspace flashcards");
        }
        const workspaceData = await workspaceResponse.json();
        setWorkspaceFlashcardSets(workspaceData.flashcards);
      } else {
        setWorkspaceFlashcardSets([]);
      }
    } catch (error) {
      console.error("Error fetching flashcards: ", error);
      setError("Failed to load flashcards. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const navigateToFlashcardSet = (setId, isWorkspaceSet) => {
    if (isWorkspaceSet && workspaceId) {
      router.push(`/flashcards/${workspaceId}/${setId}`);
    } else {
      router.push(`/flashcards/${setId}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  const createFlashcardSet = async () => {
    if (!user) {
      console.error("User not logged in");
      return;
    }
    try {
      const idToken = await user.getIdToken();
      const response = await fetch("/api/saveFlashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          workspaceId: workspaceId || null,
          flashcardsTitle,
          flashcardSize: cardAmount,
          flashcardDifficulty: difficulty,
          flashcardTopic,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to save flashcards");
      }
      const data = await response.json();
      console.log("Flashcards saved: ", data);
      await fetchFlashcards(user);
      setFlashcardsTitle("");
      setFlashcardTopic("");
      setCardAmount(20);
      setDifficulty(3);
    } catch (error) {
      console.error("Error saving flashcards: ", error);
      setError("Failed to create flashcard set. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-gray-100 font-mono">
      <main className="flex-grow">
        <div className="flex items-center justify-between p-8 mt-5">
          <h1 className="text-3xl font-bold ml-4">
            {workspaceId ? "Workspace Flashcards" : "Flashcard Hub"}
          </h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#ffd1dc] hover:bg-pink-400 text-black">
                Create New Set
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#222] text-white">
              <DialogHeader>
                <DialogTitle className="ml-3">
                  Create New Flashcard Set
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Textarea
                    value={flashcardsTitle}
                    onChange={(e) => setFlashcardsTitle(e.target.value)}
                    placeholder="Enter a title"
                    className="bg-[#222] border-gray-600 mt-1"
                  />
                  <Textarea
                    value={flashcardTopic}
                    onChange={(e) => setFlashcardTopic(e.target.value)}
                    placeholder="Give CICERO the topic or content for your flashcards..."
                    className="bg-[#222] border-gray-600 mt-1"
                  />
                </div>
                <div>
                  <Label>Difficulty: {difficulty}</Label>
                  <Slider
                    min={1}
                    max={5}
                    step={1}
                    value={[difficulty]}
                    onValueChange={(value) => setDifficulty(value[0])}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Number of Cards: {cardAmount}</Label>
                  <Slider
                    min={1}
                    max={40}
                    step={1}
                    value={[cardAmount]}
                    onValueChange={(value) => setCardAmount(value[0])}
                    className="mt-1"
                  />
                </div>
                <Button
                  className="w-full bg-primary hover:bg-pink-400 text-black"
                  onClick={createFlashcardSet}
                >
                  Generate
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        {/*User's personal flashcard sets */}
        <div className="text-2xl font-bold ml-12 mb-4 mt-5">
          User's Flashcard
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 p-8 rounded-lg">
          {/* <h2 className="text-2xl font-bold ml-8 mb-4 inline-flex aboslu">Personal Flashcard Sets</h2> */}
          {userFlashcardSets.length > 0 ? (
            userFlashcardSets.map((set) => (
              <Card
                key={set.id}
                className="bg-[#222] hover:bg-[#333]"
                onClick={() => navigateToFlashcardSet(set.id)}
              >
                <CardHeader>
                  <CardTitle>{set.title || "Untitled Set"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Cards: {set.flashcards ? set.flashcards.length : "N/A"}</p>
                  <p>Difficulty: {set.flashcardDifficulty || "N/A"}/5</p>
                  <div className="absolute bottom-4 right-4">
                    <ArrowRightIcon className="w-5 h-5" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center">
              No flashcard sets found. Create a new set to get started!
            </div>
          )}
        </div>

        {/*Workspace flashcard sets */}
        {workspaceId && (
          <div>
            <h2 className="text-2xl font-bold ml-8 mb-4">
              Workspace Flashcard Sets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 p-8 rounded-lg">
              {workspaceFlashcardSets.length > 0 ? (
                workspaceFlashcardSets.map((set) => (
                  <Card
                    key={set.id}
                    className="bg-[#222] hover:bg-[#333]"
                    onClick={() => navigateToFlashcardSet(set.id, true)}
                  >
                    <CardHeader>
                      <CardTitle>{set.title || "Untitled Set"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Cards: {set.flashcards ? set.flashcards.length : "N/A"}
                      </p>
                      <p>Difficulty: {set.flashcardDifficulty || "N/A"}/5</p>
                    </CardContent>
                    <div className="absolute bottom-4 right-4">
                      <ArrowRightIcon className="w-5 h-5" />
                    </div>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 text-center">
                  No workspace flashcard sets found. Create a new set in this
                  workspace to get started!
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-[#222] py-6 px-6 text-[#c0c0c0] text-sm">
        <div className="mx-auto flex items-center justify-between">
          <p>&copy; 2024 CICERO. All rights reserved.</p>
          <nav className="flex items-center gap-4">
            <Link
              href="#"
              className="hover:text-[#f0f0f0] transition-colors duration-300 ease-in-out"
              prefetch={false}
            >
              About Us
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

function CircleHelpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}
