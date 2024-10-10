'use client'
import Link from "next/link"
import { Input } from "../ui/input"
import { useState, useEffect } from "react"
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
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
import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import FlashcardGenerator from "@/app/flashcard"

//firebase imports
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from '@/firebase'

export const Flashcards = () => {
    const authInstance = getAuth();
    const [difficulty, setDifficulty] = useState(3)
    const [cardAmount, setCardAmount] = useState(20)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [flashcardsTitle, setFlashcardsTitle] = useState("")
    const [flashcardTopic, setFlashcardTopic] = useState("")
    const [flashcardSets, setFlashcardSets] = useState([])
    const [error, setError] = useState(null)

    const searchParams = useSearchParams()
    const workspaceId = searchParams.get('workspaceId')

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
            const url = workspaceId ? `/api/getFlashcards?workspaceId=${workspaceId}` : '/api/getFlashcards';
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${idToken}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch flashcards');
            }
            const data = await response.json();
            setFlashcardSets(data.flashcards);
        } catch (error) {
            console.error('Error fetching flashcards: ', error);
            setError('Failed to load flashcards. Please try again later.');
        } finally {
            setLoading(false);
        }
    }

    const createFlashcardSet = async () => {
        if (!user) {
            console.error('User not logged in');
            return;
        }
        try {
            const idToken = await user.getIdToken();
            const response = await fetch('/api/saveFlashcards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({
                    workspaceId: workspaceId || null,
                    flashcardsTitle,
                    flashcardSize: cardAmount,
                    flashcardDifficulty: difficulty,
                    flashcardTopic
                })
            });
            if (!response.ok) {
                throw new Error('Failed to save flashcards');
            }
            const data = await response.json();
            console.log('Flashcards saved: ', data);
            await fetchFlashcards(user);
            setFlashcardsTitle('');
            setFlashcardTopic('');
            setCardAmount(20);
            setDifficulty(3);
        } catch (error) {
            console.error('Error saving flashcards: ', error);
            setError('Failed to create flashcard set. Please try again.');
        }
    }

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-black text-gray-100 font-mono">
            {/* Header remains the same */}
            <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-black]">
                <Link href="/" className="text-2xl font-semibold" prefetch={false}>
                CICERO
                </Link>
                <div className="flex items-center gap-1">
                <Link
                    href="/homePage"
                    className="font-sans rounded-full bg-[#000000] px-4 py-2 text-sm font-normal text-white hover:bg-[#1a1a1a] transition-colors duration-300 ease-in-out flex items-center space-x-2"
                    prefetch={false}
                >
                    <SquareChartGanttIcon className="h-5 w-5 mr-2"/>
                    Workspaces
                </Link>
                <Link
                    href="/flashcards"
                    className="font-sans rounded-full bg-[#000000] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a1a1a] transition-colors duration-300 ease-in-out flex items-center space-x-2"
                    prefetch={false}
                >
                    <Layers3 className="h-5 w-5 mr-2"/>
                    Flashcards
                </Link>
                <Link
                    href="/helpPage"
                    className="font-sans rounded-full bg-[#000000] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a1a1a] transition-colors duration-300 ease-in-out flex items-center space-x-2"
                    prefetch={false}
                >
                    <CircleHelp className="h-5 w-5 mr-2"/>
                    Help
                </Link>
                <Link
                    href="#"
                    className="font-sans rounded-full bg-[#000000] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a1a1a] transition-colors duration-300 ease-in-out flex items-center space-x-2"
                    prefetch={false}
                >
                    <LogOut className="h-5 w-5 mr-2"/>
                    Log out
                </Link>
                </div>
            </header>
            <main className="flex-grow">
                <div className="flex items-center justify-between p-8 mt-5">
                    <h1 className="text-3xl font-bold ml-4">
                        {workspaceId ? "Workspace Flashcards" : "Flashcard Hub"}
                    </h1>
                    <Dialog>
                    <DialogTrigger asChild>
                    <motion.div 
                        whileHover={{ scale: 1.1 }} 
                        whileTap={{ scale: 0.9 }}  
                    >
                        <Button className="bg-primary hover:bg-primary text-black">Create New Set</Button>
                    </motion.div>
                    </DialogTrigger>
                    <DialogContent className="bg-[#222] text-white">
                    <DialogHeader>
                        <DialogTitle className="ml-3">Create New Flashcard Set</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                        <Textarea
                            id="content"
                            placeholder="Enter a title"
                            className="bg-[#222] border-gray-600 mt-1"
                            maxLength={40}
                        />
                        <Textarea
                            id="content"
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
                        <motion.div 
                            whileHover={{ scale: 1.07 }} 
                            whileTap={{ scale: 0.9 }}  
                        >
                            <Button className="w-full bg-primary hover:bg-primary text-black">Generate</Button>
                        </motion.div>
                    </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 p-8 rounded-lg">
                {flashcardSets.map((set) => (
                <motion.div 
                    whileHover={{ scale: 1.07 }} 
                    whileTap={{ scale: 0.9 }}  
                >
                    <Card key={set.id} className="bg-[#222] hover:bg-primary">
                        <CardHeader>
                        <CardTitle>{set.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                        <p>Cards: {set.cardCount}</p>
                        <p>Difficulty: {set.difficulty}/5</p>
                        </CardContent>
                    </Card>
                </motion.div>
                ))}
            </div>
        </main>
        
        <footer className="bg-[#222] py-6 px-6 text-[#c0c0c0] text-sm">
            <div className="mx-auto flex items-center justify-between">
                <p>&copy; 2024 CICERO. All rights reserved.</p>
                <nav className="flex items-center gap-4">
                    <Link href="#" className="hover:text-[#f0f0f0] transition-colors duration-300 ease-in-out" prefetch={false}>
                    About Us
                    </Link>
                </nav>
            </div>
        </footer>
    </div>
    )
}

function CircleHelpIcon(props) {
    return (
        (<svg
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
        )
    )
}
