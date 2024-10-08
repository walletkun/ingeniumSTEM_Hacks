"use client";
import { useState, useEffect, useRef, useCallback } from "react";
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
} from "lucide-react";

//Firebase used for client operation
import { getAuth } from "firebase/auth";
import { auth } from "@/firebase";

export const Tutor = ({ workspaceTitle }) => {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: `Welcome to CICERO Chatbot! We are here to help you with your queries ${workspaceTitle}`,
    },
  ]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [conversationTitle, setConversationTitle] = useState(null);
  const [error, setError] = useState(null);
  const authInstance = getAuth();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = authInstance.currentUser;
      if (user) {
        console.log("User is logged in:", user.uid);
        setUserId(user.uid);
      } else {
        console.log("User is not logged in");
      }
    };

    fetchUserData();
  }, [authInstance]);

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
      let url = `/api/chats?title=${encodeURIComponent(workspaceTitle)}`;
      if(conversationId){
        url += `&conversationId=${conversationId}`;
      }
      console.log('Fetching chat history with URL: ', url);
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (!response.ok) throw new Error("Failed to fetch chat history");

      const chatHistory = await response.json();
      console.log("Chat history received in Tutor component:", chatHistory);

      if (Array.isArray(chatHistory.messages)) {
        setMessages(chatHistory.messages);
        setConversationId(chatHistory.conversationId);
        setConversationTitle(chatHistory.title);
      } else {
        console.error("Unexpected chat history format:", chatHistory);
        setMessages([]);
        setConversationId(null);
        setConversationTitle(null);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
      setError("Failed to load chat history");
    } finally {
      setIsLoading(false);
    }
  }, [userId, workspaceTitle, conversationId, authInstance]);

  useEffect(() => {
    if (userId && workspaceTitle) {
      console.log("Fetching chat history for:", workspaceTitle);
      fetchChatHistory();
    }
  }, [userId, workspaceTitle, fetchChatHistory]);

  // automatically scroll to the most recent message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // sends message to openai on click
  const sendMessage = async () => {
    if (!message.trim() || isLoading || !workspaceTitle) return;
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

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(`Network response was not ok: ${errorData.error}`);
      }

      const newConversationId = response.headers.get("X-Conversation-Id");
      const newConversationTitle = response.headers.get("X-Conversation-Title");
      if (newConversationId) {
        setConversationId(newConversationId);
        console.log("New conversation ID:", newConversationId);
      }
      if (newConversationTitle) {
        setConversationTitle(newConversationTitle);
        console.log("New conversation title:", newConversationTitle);
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

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/*Saved Chats Sidebar */}
      <div className="hidden w-[260px] flex-col bg-black p-4 md:flex border-r border-r-primary">
        <div className="flex items-center justify-center">
          <h3 className="text-lg font-semibold mb-[52px] ml-4">
            Chat Sessions
          </h3>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full hover:bg-primary mb-[50px] ml-3"
          >
            <PlusIcon className="h-5 w-5" />
            <span className="sr-only">Create New Chat</span>
          </Button>
        </div>
      </div>

      {/*Chat Screen Navbar */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between bg-#000000 px-4 py-3 md:px-6 border-b border-b-primary">
          <div className="flex items-center gap-2">
            <div>
              <h3 className="text-sm font-semibold text-center ml-3">
                Workspace:{" "}
                <span className="bg-muted rounded-xl inline-block px-2 py-1 ml-2">
                  {workspaceTitle}
                </span>
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon className="h-5 w-5" />
                  <span className="sr-only">Help</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-black">
                <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href="/homePage">
                    <DropdownMenuItem className="flex items-center justify-between mb-1 mt-1 text-sm hover:bg-muted active:bg-muted/80 py-2 rounded focus:outline-none">
                      <SquareChartGanttIcon className="mr-2 ml-2 h-4 w-4" />
                      <span>Workspaces</span>
                      <DropdownMenuShortcut className="mr-2">
                        ⇧⌘W
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/flashcards">
                    <DropdownMenuItem className="flex items-center justify-between mb-1 mt-1 text-sm hover:bg-muted active:bg-muted/80 py-2 rounded focus:outline-none">
                      <Layers3 className="mr-2 ml-2 h-4 w-4" />
                      <span>Flashcards</span>
                      <DropdownMenuShortcut className="mr-2">
                        ⌘F
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/helpPage">
                    <DropdownMenuItem className="flex items-center justify-between mb-1 mt-1 text-sm hover:bg-muted active:bg-muted/80 py-2 rounded focus:outline-none">
                      <CircleHelp className="mr-2 ml-2 h-4 w-4" />
                      <span>Help</span>
                      <DropdownMenuShortcut className="mr-2">
                        ⌘H
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/">
                    <DropdownMenuItem className="flex items-center justify-between mb-1 mt-1 text-sm hover:bg-muted active:bg-muted/80 py-2 rounded focus:outline-none">
                      <AppWindow className="mr-2 ml-2 h-4 w-4" />
                      <span>CICERO Page</span>
                      <DropdownMenuShortcut className="mr-2">
                        ⌘C
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center justify-between mb-1 mt-1 text-sm hover:bg-muted active:bg-muted/80 py-2 rounded focus:outline-none">
                  <LogOut className="mr-2 ml-2 h-4 w-4" />
                  <span>Log out</span>
                  <DropdownMenuShortcut className="mr-2">
                    ⇧⌘Q
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/*Main Chat Screen */}
        <div className="flex-1 overflow-auto p-4 md:p-6 bg-secondary">
          <ScrollArea>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "system" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`p-3 text-white rounded-3xl ${
                    message.role === "system" ? "bg-muted" : "bg-secondary"
                  }`}
                >
                  <p>{message.content || "Start conversation..."}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </ScrollArea>
        </div>

        {/*Textfield */}
        <div className="sticky bottom-0 bg-secondary px-4 py-0 md:px-6">
          <div className="relative mb-7">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="min-h-[48px] rounded-full resize-none p-4 shadow-sm pr-16 bg-muted"
            />
            <Button
              onClick={sendMessage}
              disabled={isLoading}
              type="button"
              size="icon"
              className="absolute w-8 h-8 top-3 right-3 bg-muted"
            >
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </div>
        </div>
      </div>

      {/*Saved Documents Sidebar */}
      <div className="hidden w-[260px] flex-col bg-background p-4 md:flex border-l border-l-primary">
        <div className="flex items-center justify-center">
          <h3 className="text-lg font-semibold ml-3 text-center mr-3">
            Saved Documents
          </h3>
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
