"use client";

import Link from "next/link";
//Components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Slider } from "@radix-ui/react-slider";
import {
  ArrowRightIcon,
  SearchX,
  AppWindow,
  LogOut,
  SquareChartGanttIcon,
  Layers3,
  CircleHelp,
  Ellipsis,
  Pencil,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion"

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { Link1Icon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

export const HomePage = () => {
  //Fetching workspaces
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const authInstance = getAuth();

  //Creating workspaces
  const [workspaceTitle, setWorkspaceTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  //File processing
  const [fileProcessingStatus, setFileProcessingStatus] = useState("");

  const logOut = async () => {
    try {
        await signOut(authInstance);
        console.log("User logged out successfully");
        router.push("/auth/login/email");
        } catch (error) {
        console.error("Error logging out:", error);
        }
    };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, (currentUser) => {
      console.log(
        "Auth state changed, user: ",
        currentUser ? currentUser.uid : "not logged in"
      );
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [authInstance]);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const token = await user.getIdToken();
        const response = await fetch(`/api/getWorkspace`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch workspaces: ${response.status}`);
        }
        const data = await response.json();
        setWorkspaces(data.workspaces || []);
      } catch (e) {
        console.error("API Error:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspaces();
  }, [user]);

  const createWorkspace = async () => {
    console.log(
      "createWorkspace function called, user:",
      user ? user.uid : "not logged in"
    );
    if (!user || isCreating) {
      console.log("User not logged in or creation already in progress");

      return;
    }

    try {
      setLoading(true);
      setError(null);
      setFileProcessingStatus("Uploading file...");
      const token = await user.getIdToken();

      if (!workspaceTitle || !file) {
        throw new Error("Workspace title and content are required");
      }

      const formData = new FormData();
      formData.append("title", workspaceTitle);
      formData.append("file", file);

      console.log(formData);
      const response = await fetch("/api/saveWorkspace", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        setError(errorData.error);
        setFileProcessingStatus("File upload failed");
      } else {
        const result = await response.json();
        console.log("Workspace created successfully:", result);
        setFileProcessingStatus(
          "File processed and workspace created successfully"
        );

        setWorkspaces((prevWorkspaces) => [
          ...prevWorkspaces,
          result.workspace,
        ]);

        //Reset form fields
        setWorkspaceTitle("");
        setFile(null);
      }
    } catch (error) {
      console.error("API Error:", error);
      setError(error.message);
      setFileProcessingStatus("File upload failed");
    } finally {
      setIsCreating(false);
      setLoading(false);
    }
  };

  const handleCreateWorkspace = () => {
    console.log("Creating workspace...");
    createWorkspace();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Please log in to view your workspaces.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-[#f0f0f0] font-mono">
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

      <main className="flex-1 py-12 px-8">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold mb-8 ml-2">Your Workspaces</h2>
          <Dialog>
            <DialogTrigger asChild>
              <motion.div 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }}  
              >
              <Button className="bg-primary hover:bg-primary text-black rounded-full">
                Create New Workspace
              </Button>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="bg-[#222] text-white border border-[#171221]">
              <DialogHeader>
                <DialogTitle className="ml-3">Create New Workspace</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  value={workspaceTitle}
                  onChange={(e) => setWorkspaceTitle(e.target.value)}
                  maxLength={40}
                  placeholder="Enter workspace title"
                  className="bg-muted border-gray-600 mt-1"
                />
                <Input
                  type="file"
                  onChange={handleFileChange}
                  className="bg-muted border-gray-600 mt-1"
                />
                <motion.div
                  whileHover={{ scale: 1.03 }} 
                  whileTap={{ scale: 0.9 }}  
                >
                <Button
                  onClick={handleCreateWorkspace}
                  className="w-full bg-primary hover:bg-primary text-black"
                  disabled={isCreating}
                >
                  {isCreating ? "Creating..." : "Create Workspace"}
                </Button>
                {fileProcessingStatus && (
                  <p className="text-sm text-gray-400 mt-2">
                    {fileProcessingStatus}
                  </p>
                )}
                </motion.div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {workspaces.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-40   ">
            <SearchX className="h-10 w-10 mb-5" />
            <h1 className="text-2xl font-bold">Looks empty in here...</h1>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {workspaces.map((workspace) => {
              const chatUrl = `/chat/${encodeURIComponent(workspace.title)}`;
              console.log(
                "Creating Link for workspace with title:",
                workspace.title,
                "and URL:",
                chatUrl
              );
              return (  
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}  
                >
                  <div className="bg-[#222] rounded-lg p-6 hover:bg-primary transition-colors flex flex-col justify-between relative h-[140px]">
                  <div className="absolute top-5 right-5">
          
                        <Button className="hover:bg-[#e0857d] bg-transparent left-[-23px] absolute bottom-[-26px] rounded-lg p-2">
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      
                  </div>
                  <h3 className="text-xl font-bold break-words flex-grow" style={{ maxWidth: '250px' }}>{workspace.title}</h3>
                  <p className="text-sm text-white mt-auto">
                    Created:{" "}
                    {new Date(workspace.createdAt).toLocaleDateString()}
                  </p>
                  <Link 
                    href={chatUrl}
                    key={workspace.id}
                    prefetch={false}
                  >
                    <div className="absolute bottom-3 right-2 ">
                      <ArrowRightIcon className="w-9 h-9 hover:bg-[#e0857d] rounded-lg p-2" />  
                    </div>
                  </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>

      <footer className="bg-[#222] py-6 px-6 text-[#c0c0c0] text-sm">
        <div className="mx-auto flex items-center justify-between">
          <p>&copy; 2024 CICERO. All rights reserved.</p>
          <nav className="flex items-center gap-4">
            
          </nav>
        </div>
      </footer>
    </div>
  );
};
