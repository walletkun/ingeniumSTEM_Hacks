'use client'
import Link from "next/link"
import { useState } from "react"
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

export const Flashcards = () => {
    const [difficulty, setDifficulty] = useState(3)
    const [cardAmount, setCardAmount] = useState(20)

    const flashcardSets = [
        { id: 1, title: "Ancient Rome", cardCount: 15, difficulty: 3 },
        { id: 2, title: "Quantum Physics", cardCount: 25, difficulty: 5 },
        { id: 3, title: "Spanish Vocabulary", cardCount: 30, difficulty: 2 },
        { id: 4, title: "Javascript", cardCount: 21, difficulty: 3 },
        { id: 5, title: "Biology Final", cardCount: 40, difficulty: 5 },
        { id: 6, title: "Web Apps Final", cardCount: 34, difficulty: 5 },
    ]

    return (
    <div className="flex flex-col min-h-screen bg-black text-gray-100 font-mono">
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
                <h1 className="text-3xl font-bold ml-4">Flashcard Hub</h1>
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
                        />
                        <Textarea
                            id="content"
                            placeholder="Give CICERO the topic or content for your flashcards..."
                            className="bg-[#222] border-gray-600 mt-5"
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
                            whileHover={{ scale: 1.03 }} 
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
                    whileHover={{ scale: 1.09 }} 
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
            </svg>)
        )
    }