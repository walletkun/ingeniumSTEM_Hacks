'use client'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LoadingAnimation } from "./LoadingAnimation"
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
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const logOut = async () => {
    try {
        await signOut(authInstance);
        console.log("User logged out successfully");
        router.push("/auth/login/email");
        } catch (error) {
        console.error("Error logging out:", error);
        }
    };

export const Help = () => {
    return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-mono">
        <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-black]">
            <motion.div 
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.9 }}  
            > 
            <Link href="/" className="text-2xl font-semibold" prefetch={false}>
                CICERO
            </Link>
            </motion.div>
            <div className="flex items-center gap-1">
            <motion.div 
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.9 }}  
            > 
            <Link
                href="/homePage"
                className="font-sans rounded-full bg-[#000000] px-4 py-2 text-sm font-normal text-white hover:bg-[#1a1a1a] transition-colors duration-300 ease-in-out flex items-center space-x-2"
                prefetch={false}
            >
                <SquareChartGanttIcon className="h-5 w-5 mr-2"/>
                Workspaces
            </Link>
            </motion.div>
            <motion.div 
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.9 }}  
            > 
            <Link
                href="/flashcards"
                className="font-sans rounded-full bg-[#000000] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a1a1a] transition-colors duration-300 ease-in-out flex items-center space-x-2"
                prefetch={false}
            >
                <Layers3 className="h-5 w-5 mr-2"/>
                Flashcards
            </Link>
            </motion.div>
            <motion.div 
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.9 }}  
            > 
            <Link
                href="/helpPage"
                className="font-sans rounded-full bg-[#000000] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a1a1a] transition-colors duration-300 ease-in-out flex items-center space-x-2"
                prefetch={false}
            >
                <CircleHelp className="h-5 w-5 mr-2"/>
                Help
            </Link>
            </motion.div>
            <motion.div 
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.9 }}  
            > 
            <Link
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    logOut();
                }}
                className="font-sans rounded-full bg-[#000000] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a1a1a] transition-colors duration-300 ease-in-out flex items-center space-x-2"
                prefetch={false}
            >
                <LogOut className="h-5 w-5 mr-2"/>
                Log out
            </Link>
            </motion.div>
            </div>
        </header>
        <main className="flex-1 px-4 py-8 sm:px-6 md:px-8 font-mono">
            <div className="container mx-auto max-w-3xl space-y-8 font-mono">
            <section>
                <h1 className="text-3xl font-bold">CICERO Help Center</h1>
                <p className="mt-2 text-muted-foreground">Learn how to use the CICERO AI Tutor web application.</p>
            </section>
            <section>
                <h2 className="text-2xl font-bold">Workspaces</h2>
                <ol className="mt-4 space-y-4">
                <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-full bg-primary px-2 py-1 text-sm font-semibold text-black">
                    1
                    </div>
                    <div>
                    <h3 className="text-lg font-semibold">Understanding Workspaces</h3>
                    <p className="mt-2 text-muted-foreground">
                        CICERO focuses its knowledge based on the current workspace you're in. If you create a workspace for your
                        Calculus 1 class, CICERO will focus on whatever calculus study materials you provide it.
                    </p>
                    </div>
                </li>
                <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-full bg-primary px-2 py-1 text-sm font-semibold text-black">
                    2
                    </div>
                    <div>
                    <h3 className="text-lg font-semibold">Create a Workspace</h3>
                    <p className="mt-2 text-muted-foreground">
                        To create a workspace,  navigate to the workspace page. There you can select an empty space labeled 
                        "Create a New Workspace". Give your workspace a name, a description, and an icon and click "Create".
                    </p>
                    </div>
                </li>
                <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-full bg-primary px-2 py-1 text-sm font-semibold text-black">
                    3
                    </div>
                    <div>
                    <h3 className="text-lg font-semibold">Navigating a Workspace</h3>
                    <p className="mt-2 text-muted-foreground">
                        In each workspace you will have all your saved chat sessions and saved documents for that subject. You
                        can also access your flashcards and practice tests for that subject. On the lower right you will see a dropzone
                        where you can upload your study materials to CICERO.
                    </p>
                    </div>
                </li>
                </ol>
            </section>
            <section>
                <h2 className="text-2xl font-bold">Uploading Documents</h2>
                <ol className="mt-4 space-y-4">
                <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-full bg-primary px-2 py-1 text-sm font-semibold text-black">
                    1
                    </div>
                    <div>
                    <h3 className="text-lg font-semibold">How to Upload Documents</h3>
                        <p className="mt-2 text-muted-foreground">
                            When creating a workspace from the home tab, you can drag and drop your study materials.
                            Once the file loads, click "Create New Workspace" and within moments CICERO will analyze your materials and add it to 
                            its knowledge base. As of right now, CICERO can only accept PDF documents.
                        </p>
                    </div>
                </li>
                <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-full bg-primary px-2 py-1 text-sm font-semibold text-black">
                    2
                    </div>
                    <div>
                    <h3 className="text-lg font-semibold">Engage with CICERO</h3>
                        <p className="mt-2 text-muted-foreground">
                            Once you've uploaded your study materials, CICERO will be able to reference 
                            <span className="font-bold text-white"> any section  </span>of the PDF and provide
                            accurate and credible answers. Keep in mind, inaccurate study materials = inaccurate answers. CICERO will only be
                            as good as the material you feed it.
                        </p>
                    </div>
                </li>
                <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-full bg-primary px-2 py-1 text-sm font-semibold text-black">
                    3
                    </div>
                    <div>
                    <h3 className="text-lg font-semibold">CICERO's Intelligence</h3>
                        <p className="mt-2 text-muted-foreground">
                            Although CICERO has its own general knowledge, it is designed to utilize your course materials  
                            <span className="font-bold text-white"> (i.e. textbooks) </span>to teach you. 
                            It is <span className="font-bold text-white">required </span> 
                            to upload some form of content to CICERO to allow it to function. 
                        </p>
                    </div>
                </li>
                <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-full bg-primary px-2 py-1 text-sm font-semibold text-black">
                    4
                    </div>
                    <div>
                    <h3 className="text-lg font-semibold">Credibility</h3>
                        <p className="mt-2 text-muted-foreground">
                            <span className="font-bold text-red-400">NEVER </span> upload documents that you do not trust or are not
                            fact-checked. Unfortunately, CICERO cannot discern between credible and noncredible sources. Always make sure
                            you are providing CICERO with accurate and up-to-date content.
                        </p>
                    </div>
                </li>
                </ol>
            </section>
            <section>
                <h2 className="text-2xl font-bold">Flashcards</h2>
                <ul className="mt-4 space-y-4">
                <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-full bg-primary px-2 py-1 text-sm font-semibold text-black">
                    1
                    </div>
                    <div>
                    <h3 className="text-lg font-semibold">Where to Find Flashcards</h3>
                    <p className="mt-2 text-muted-foreground">
                        From your home page, you can navigate to the <span className="font-bold text-white"> Flashcards </span> tab to 
                        open the flashcards hub. From here, you can see your saved flashcard sets and the option to generate more.
                    </p>
                    </div>
                </li>
                <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-full bg-primary px-2 py-1 text-sm font-semibold text-black">
                    2
                    </div>
                    <div>
                    <h3 className="text-lg font-semibold">Generating Flashcards</h3>
                    <p className="mt-2 text-muted-foreground">
                        When creating a new set, you can specify the content of the flashcards - (Ex: "Create a set of all the
                        the most important concepts of String Theory"). You can also adjust the difficulty and the amount of 
                        flashcards to generate.
                    </p>
                    </div>
                </li>
                </ul>
            </section>
            
            
            <div>
                <h2 className="text-2xl font-bold mb-4">FAQs</h2>
                    <div className="space-y-4">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="faq1">
                        <AccordionTrigger>What kind of documents should I upload?</AccordionTrigger>
                        <AccordionContent>
                            We recommend you upload extensive and credible sources like textbooks or course notes from your professors
                            or teachers. CICERO can analyze large chunks of content and build a knowledge base around that content.
                        </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="faq2">
                        <AccordionTrigger>Can I upload multiple file types to a workspace?</AccordionTrigger>
                        <AccordionContent>
                            No, unfortunately as of right now, CICERO can only process content from PDF files. We are working on allowing
                            CICERO to analyze images, text files, powerpoints, etc. 
                        </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="faq3">
                        <AccordionTrigger>Can CICERO give me wrong answers even with my study materials?</AccordionTrigger>
                        <AccordionContent>
                            Yes, although not often, CICERO can make mistakes and misinterpet some things. It is always good practice to
                            double check your work. If you notice any incorrect answers, it is important you let CICERO know so that it can 
                            correct itself.
                        </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="faq4">
                        <AccordionTrigger>What happens if I try to add unrelated content to a workspace?</AccordionTrigger>
                        <AccordionContent>
                            If you add unrelated content to a workspace, CICERO is unable to discern whether or not it is related.
                            You can simply delete the document from your workspace and CICERO will forget about all of its content. It is 
                            important to ensure the documents you upload are credible and related to the workspace, as CICERO has no way of
                            preventing that.
                        </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    </div>
                </div>
            </div>
        </main>
        <footer className="bg-[#222] py-6 px-6 text-[#c0c0c0] text-sm">
            <div className="mx-auto flex items-center justify-between">
                <p>&copy; 2024 CICERO. All rights reserved.</p>
                <nav className="flex items-center gap-4">
                    
                </nav>
            </div>
        </footer>
        </div>
    )
    }



    function HomeIcon(props) {
    return (
        <svg 
        {...props}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        >
        <path 
        d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 
        1 0 1.061 1.06l8.69-8.689Z" 
        />
        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 
        0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 
        5.432Z" 
        />
        </svg>
    )
}