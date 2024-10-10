"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "../ui/dropdown-menu";
import {
  AppWindow,
  LogOut,
  SquareChartGanttIcon,
  Layers3,
  CircleHelp,
  Send,
} from "lucide-react";

//Firebase used for client operation
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

export const Tutor = ({ workspaceTitle }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const authInstance = getAuth();
  const messagesEndRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      if (user) {
        console.log("User is logged in:", user.uid);
        setUserId(user.uid);
      } else {
        console.log("User is not logged in");
        router.push("/auth/login/email");
      }
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [authInstance, router]);

  useEffect(() => {
    console.log(
      "Tutor component rendered with workspaceTitle:",
      workspaceTitle
    );
  }, [workspaceTitle]);

  const fetchChatHistory = useCallback(async () => {
    if (!userId || !workspaceTitle) return;

    try {
      setIsLoading(true);
      const token = await authInstance.currentUser.getIdToken();
      const response = await fetch(
        `/api/chats?workspaceTitle=${encodeURIComponent(workspaceTitle)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch conversations");

      const data = await response.json();
      setConversations(data.conversations);

      // If no conversation is selected and we have conversations, select the most recent one
      if (!conversationId && data.conversations.length > 0) {
        const mostRecentConversation = data.conversations.reduce(
          (prev, current) =>
            prev.createdAt > current.createdAt ? prev : current
        );
        selectConversation(mostRecentConversation.id);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      setIsLoading(false);
    }
  }, [userId, workspaceTitle, authInstance, conversationId]);

  const selectConversation = useCallback(
    async (selectedConversationId) => {
      setConversationId(selectedConversationId);
      try {
        const token = await authInstance.currentUser.getIdToken();
        const response = await fetch(
          `/api/chats?title=${encodeURIComponent(
            workspaceTitle
          )}&conversationId=${selectedConversationId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok)
          throw new Error("Failed to fetch conversation messages");

        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        console.error("Error fetching conversation messages:", error);
      }
    },
    [authInstance, workspaceTitle]
  );

  //Creating new conversation
  
  const createNewConversation = async () => {
    try {
      setIsLoading(true);
      const token = await authInstance.currentUser.getIdToken();
      const response = await fetch("/api/chats/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: `This is ${workspaceTitle}`,
          workspaceTitle: workspaceTitle,
          isNewConversation: true // Add this flag
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Network response was not ok: ${errorData.error}`);
      }

      const newConversationId = response.headers.get("X-Conversation-Id");
      const newConversationTitle = response.headers.get("X-Conversation-Title");
      if (newConversationId) {
        const newConversation = {
          id: newConversationId,
          title: newConversationTitle || `New Chat ${Date.now()}`,
          createdAt: new Date().toISOString(), // Fix: Use new Date().toISOString()
        };

        setConversations((prevConversations) => [
          newConversation,
          ...prevConversations,
        ]);
        setConversationId(newConversationId);

        // Fetch messages for the new conversation
        await selectConversation(newConversationId);
      }
    } catch (error) {
      console.error("Error creating new conversation:", error);
      // Consider adding user-facing error handling here
    } finally {
      setIsLoading(false);
    }
  };


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
    if (userId && workspaceTitle) {
      fetchChatHistory();
    }
  }, [userId, workspaceTitle, fetchChatHistory]);

  // automatically scroll to the most recent message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // sends message to openai on click
  const sendMessage = async () => {
    if (!message.trim() || isLoading || !workspaceTitle || !conversationId) return;
    const userMessage = { role: "user", content: message };
    setMessage("");
    setIsLoading(true);
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const token = await authInstance.currentUser.getIdToken();
      const response = await fetch("/api/chats/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: userMessage.content,
          workspaceTitle: workspaceTitle,
          conversationId: conversationId,
        }),
      });

      // Extract the conversation ID from the response headers
      const newConversationId = response.headers.get("X-Conversation-Id");
      if (newConversationId) {
        setConversationId(newConversationId);
        console.log("New or existing conversation ID:", newConversationId);
      }

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(`Network response was not ok: ${errorData.error}`);
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "system", content: result },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setIsLoading(false);
  };

  // update chat history based on the user id and their workspace title
  useEffect(() => {
    fetchChatHistory();
  }, [userId, workspaceTitle]);


  // handle "enter" key click
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Check if the key is "Enter" and no modifiers (like Shift) are pressed
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault(); // Prevent default Enter key behavior
        sendMessage();
      }
    };
  
    // Add the event listener to the input or text area specifically
    const inputElement = document.getElementById('inputField'); // Or the id of your input
    if (inputElement) {
      inputElement.addEventListener('keydown', handleKeyPress);
    }
  
    // Clean up the event listener on unmount
    return () => {
      if (inputElement) {
        inputElement.removeEventListener('keydown', handleKeyPress);
      }
    };
  }, [sendMessage]); 


  return (
    <div className="flex min-h-screen w-full bg-[#202020] text-white">
      {/*Saved Chats Sidebar */}
      <div className="hidden w-[260px] flex-col bg-secondary p-4 md:flex shadow-[4px_0_10px_rgba(0,0,0,0.5)] relative z-50">
        <div className="flex items-center justify-center mb-4">
          <h3 className="text-lg font-semibold">Chat Sessions</h3>
          <Button
            onClick={createNewConversation}
            size="icon"
            variant="ghost"
            className="rounded-full hover:bg-primary ml-3"
          >
            <PlusIcon className="h-5 w-5" />
            <span className="sr-only">Create New Chat</span>
          </Button>
        </div>
        <ScrollArea className="flex-1">
          {conversations.map((conversation) => (
            <Button
              key={conversation.id}
              onClick={() => selectConversation(conversation.id)}
              className={`w-full text-left mb-2 ${
                conversationId === conversation.id
                  ? "bg-primary text-black"
                  : ""
              }`}
            >
              {conversation.title}
            </Button>
          ))}
        </ScrollArea>
      </div>
      <div className="flex flex-1 flex-col">
        {/*Chat Screen Navbar */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 bg-[#202020]">
          <h3 className="text-sm font-semibold flex ml-3 items-center leading-none">
            Workspace:{" "}
            <span className="font-sans rounded-full bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-white flex items-center space-x-2 ml-2">
              {workspaceTitle}
            </span>
          </h3>
          <div className="flex items-center gap-1">
            <Link
              href="/homePage"
              className="mr-2 font-sans rounded-full bg-muted px-4 py-2 text-sm font-normal text-white hover:bg-[#1a1a1a] transition-colors duration-300 ease-in-out flex items-center space-x-2"
              prefetch={false}
            >
              <SquareChartGanttIcon className="h-5 w-5 mr-2" />
              Workspaces
            </Link>
            <Link
              href="/flashcards"
              className="mr-2 font-sans rounded-full bg-muted px-4 py-2 text-sm font-medium text-white hover:bg-[#1a1a1a] transition-colors duration-300 ease-in-out flex items-center space-x-2"
              prefetch={false}
            >
              <Layers3 className="h-5 w-5 mr-2" />
              Flashcards
            </Link>
            <Link
              href="/helpPage"
              className="mr-2 font-sans rounded-full bg-muted px-4 py-2 text-sm font-medium text-white hover:bg-[#1a1a1a] transition-colors duration-300 ease-in-out flex items-center space-x-2"
              prefetch={false}
            >
              <CircleHelp className="h-5 w-5 mr-2" />
              Help
            </Link>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                logOut();
              }}
              className="mr-2 font-sans rounded-full bg-muted px-4 py-2 text-sm font-medium text-white hover:bg-[#1a1a1a] transition-colors duration-300 ease-in-out flex items-center space-x-2"
              prefetch={false}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Log out
            </Link>
          </div>
        </header>

        {/*Main Chat Screen */}
        <div className="flex-1 overflow-auto p-4 md:p-6 bg-[#202020]">
          <ScrollArea>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "system" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`p-3 text-white rounded-3xl mt-2 mb-2 px-5 ${
                    message.role === "system" ? "bg-muted" : "bg-secondary"
                  }`}
                >
                  {message.role === "system" ? (
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code({node, inline, className, children, ...props}) {
                          const match = /language-(\w+)/.exec(className || '')
                          return !inline && match ? (
                            <SyntaxHighlighter
                              style={vscDarkPlus}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          ) : (
                            <code 
                              className={`${inline ? 'bg-[#3a3a3a] text-[#e6e6e6] px-1 rounded' : ''} ${className}`} 
                              {...props}
                            >
                              {children}
                            </code>
                          )
                        },
                        ul({node, ...props}) {
                          return <ul className="list-disc pl-4 my-2" {...props} />
                        },
                        ol({node, ...props}) {
                          return <ol className="list-decimal pl-4 my-2" {...props} />
                        },
                        li({node, ...props}) {
                          return <li className="my-1" {...props} />
                        }
                      }}
                      className="markdown-content"
                    >
                      {message.content}
                    </ReactMarkdown>
                  ) : (
                    <p>{message.content || "Start conversation..."}</p>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </ScrollArea>
        </div>

        {/*Textfield */}
        <div className="sticky bottom-0 bg-[#202020] px-4 py-0 md:px-6">
          <div className="relative mb-7">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isLoading) {
                  sendMessage();
                }
              }}
              placeholder="Type your message..."
              disabled={isLoading}
              className="min-h-[48px] rounded-full resize-none p-4 shadow-sm pr-16 bg-muted"
            />
            <Button
              onClick={sendMessage}
              disabled={isLoading}
              type="button"
              size="icon"
              className="absolute w-10 h-10 top-1 right-3 bg-muted hover:bg-slate-900 rounded-3xl"
            >
              <Send className="mr-2 ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

{
  /*Icon Functions */
}
function MenuIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"
      />
    </svg>
  );
}

function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function SendIcon(props) {
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
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

export default Tutor;
