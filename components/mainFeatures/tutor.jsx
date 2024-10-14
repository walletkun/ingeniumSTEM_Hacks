import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  SquareChartGanttIcon,
  Layers3,
  CircleHelp,
  Send,
  Loader2,
} from "lucide-react";

import TypingIndicator from "./TypingIndicator";

import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

export const Tutor = ({ workspaceTitle }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [isCreatingConversation, setIsCreatingConversation] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [displayedResponse, setDisplayedResponse] = useState("");
  const [responseBuffer, setResponseBuffer] = useState("");
  const [aiResponse, setAiResponse] = useState({
    content: "",
    isComplete: false,
  });
  const authInstance = getAuth();
  const messagesEndRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      if (!isMounted) return;
      if (user) {
        console.log("User is logged in:", user.uid);
        setUserId(user.uid);
      } else {
        console.log("User is not logged in");
        router.push("/auth/login/email");
      }
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      unsubscribe();
      console.log("Tutor component unmounted");
    };
  }, [authInstance, router]);

  const selectConversation = useCallback(
    async (selectedConversationId) => {
      console.log("Selecting conversation:", selectedConversationId);
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

  const createNewConversation = useCallback(async () => {
    if (isCreatingConversation) {
      console.log("Already creating a conversation, skipping");
      return;
    }
    setIsCreatingConversation(true);
    console.log("Creating new conversation");
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
          workspaceTitle: workspaceTitle,
          isNewConversation: true,
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
          createdAt: new Date().toISOString(),
        };

        setConversations((prev) => [newConversation, ...prev]);
        setConversationId(newConversationId);
        await selectConversation(newConversationId);
      }
    } catch (error) {
      console.error("Error creating new conversation:", error);
    } finally {
      setIsLoading(false);
      setIsCreatingConversation(false);
    }
  }, [
    authInstance,
    workspaceTitle,
    selectConversation,
    isCreatingConversation,
  ]);

  const fetchChatHistory = useCallback(async () => {
    if (!userId || !workspaceTitle) return;

    console.log("Fetching chat history");
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
      console.log("Fetched conversations:", data.conversations);

      setConversations(data.conversations || []);

      if (data.conversations.length === 0) {
        console.log("No conversations found, creating a new one");
        await createNewConversation();
      } else if (!conversationId) {
        console.log("Selecting most recent conversation");
        const mostRecentConversation = data.conversations[0];
        selectConversation(mostRecentConversation.id);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
      setConversations([]);
    } finally {
      setIsLoading(false);
    }
  }, [
    userId,
    workspaceTitle,
    authInstance,
    conversationId,
    selectConversation,
    createNewConversation,
  ]);

  useEffect(() => {
    if (userId && workspaceTitle) {
      fetchChatHistory();
    }
  }, [userId, workspaceTitle, fetchChatHistory]);

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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, aiResponse]);

  const sendMessage = useCallback(async () => {
    if (!inputMessage.trim() || isLoading || !workspaceTitle || !conversationId)
      return;
    const userMessage = { role: "user", content: inputMessage };
    setInputMessage("");
    setIsLoading(true);
    setIsAiThinking(true);
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setAiResponse({ content: "", isComplete: false });
    setDisplayedResponse("");
    setResponseBuffer("");
    setIsTypingComplete(false);

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
        throw new Error(`Network response was not ok: ${errorData.error}`);
      }

      setIsAiThinking(false);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let fullResponse = "";
      let typingResponse = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullResponse += chunk;
        typingResponse += chunk;
        setResponseBuffer(fullResponse);
      }
      setAiResponse((prev) => ({ content: fullResponse, isComplete: true }));
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "system",
          content:
            "An error occurred while processing your request. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsAiThinking(false);
    }
  }, [inputMessage, isLoading, workspaceTitle, conversationId, authInstance]);

  useEffect(() => {
    let typingInterval;
    if (responseBuffer && !isTypingComplete) {
      typingInterval = setInterval(() => {
        if (responseBuffer.length > displayedResponse.length) {
          const nextChar = responseBuffer[displayedResponse.length];
          setDisplayedResponse((prev) => prev + nextChar);
        } else {
          setIsTypingComplete(true);
          clearInterval(typingInterval);

          //Add the complete message to the messages array
          setMessages((prevMessages) => [
            ...prevMessages,
            { role: "system", content: responseBuffer },
          ]);
        }
      }, 5);
    }
    return () => {
      if (typingInterval) clearInterval(typingInterval);
    };
  }, [responseBuffer, displayedResponse, isTypingComplete]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
      }
    };

    const inputElement = document.getElementById("inputField");
    if (inputElement) {
      inputElement.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("keydown", handleKeyPress);
      }
    };
  }, [sendMessage]);

  const renderMessage = (message, index) => (
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
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code
                  className={`${
                    inline ? "bg-[#3a3a3a] text-[#e6e6e6] px-1 rounded" : ""
                  } ${className}`}
                  {...props}
                >
                  {children}
                </code>
              );
            },
            ul({ node, ...props }) {
              return <ul className="list-disc pl-4 my-2" {...props} />;
            },
            ol({ node, ...props }) {
              return <ol className="list-decimal pl-4 my-2" {...props} />;
            },
            li({ node, ...props }) {
              return <li className="my-1" {...props} />;
            },
          }}
          className="markdown-content"
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );

  const renderMarkdownWithCursor = (content) => {
    return (
      <div className="flex items-baseline">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code
                  className={`${
                    inline ? "bg-[#3a3a3a] text-[#e6e6e6] px-1 rounded" : ""
                  } ${className}`}
                  {...props}
                >
                  {children}
                </code>
              );
            },
            ul({ node, ...props }) {
              return <ul className="list-disc pl-4 my-2" {...props} />;
            },
            ol({ node, ...props }) {
              return <ol className="list-decimal pl-4 my-2" {...props} />;
            },
            li({ node, ...props }) {
              return <li className="my-1" {...props} />;
            },
          }}
          className="markdown-content inline leading-normal"
        >
          {content}
        </ReactMarkdown>
        {!isTypingComplete && (
          <span className="inline-block animate-pulse text-lg leading-none align-baseline ml-1">|</span>
        )}
      </div>
    );
  };

  useEffect(() => {
    console.log("Response buffer updated:", responseBuffer);
    console.log("Displayed response updated:", displayedResponse);
    console.log("Is typing complete:", isTypingComplete);
  }, [responseBuffer, displayedResponse, isTypingComplete]);

  return (
    <div className="flex min-h-screen w-full bg-[#202020] text-white">
      <AnimatePresence>
        {isCreatingConversation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-secondary p-8 rounded-lg shadow-lg text-white flex flex-col items-center"
            >
              <Loader2 className="h-12 w-12 animate-spin mb-4" />
              <p className="text-xl font-semibold">
                Creating new conversation...
              </p>
              <p className="mt-2 text-sm text-gray-300">
                This may take a few moments
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="hidden w-[260px] flex-col bg-secondary p-4 md:flex shadow-[4px_0_10px_rgba(0,0,0,0.5)] relative z-50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Chat Sessions</h3>
          <Button
            onClick={createNewConversation}
            size="icon"
            variant="ghost"
            className="rounded-lg hover:bg-primary hover:text-black"
            disabled={isCreatingConversation}
          >
            {isCreatingConversation ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <PlusIcon className="h-5 w-5" />
            )}
            <span className="sr-only">Create New Chat</span>
          </Button>
        </div>
        <ScrollArea className="flex-1">
          {conversations.map((conversation) => (
            <motion.div
              key={conversation.id}
              className={`w-full mb-2 rounded-lg`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                onClick={() => selectConversation(conversation.id)}
                className={`w-full justify-start p-2 h-auto rounded-sm ${
                  conversationId === conversation.id
                    ? "bg-muted text-white"
                    : "bg-secondary hover:bg-muted"
                }`}
                variant="ghost"
              >
                <span className="truncate">{conversation.title}</span>
              </Button>
            </motion.div>
          ))}
        </ScrollArea>
      </div>

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 bg-[#202020]">
          <h3 className="text-sm font-semibold flex ml-3 items-center leading-none">
            Workspace:{" "}
            <span className="font-sans rounded-full bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-white flex items-center space-x-2 ml-2">
              {workspaceTitle}
            </span>
          </h3>
          <div className="flex items-center gap-1">
            <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.9 }}>
              <Link
                href="/homePage"
                className="mr-2 font-sans rounded-full bg-muted px-4 py-2 text-sm font-normal text-white hover:bg-[#1a1a1a] transition-colors duration-300 ease-in-out flex items-center space-x-2"
                prefetch={false}
              >
                <SquareChartGanttIcon className="h-5 w-5 mr-2" />
                Workspaces
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.9 }}>
              <Link
                href="/flashcards"
                className="mr-2 font-sans rounded-full bg-muted px-4 py-2 text-sm font-medium text-white hover:bg-[#1a1a1a] transition-colors duration-300 ease-in-out flex items-center space-x-2"
                prefetch={false}
              >
                <Layers3 className="h-5 w-5 mr-2" />
                Flashcards
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.9 }}>
              <Link
                href="/helpPage"
                className="mr-2 font-sans rounded-full bg-muted px-4 py-2 text-sm font-medium text-white hover:bg-[#1a1a1a] transition-colors duration-300 ease-in-out flex items-center space-x-2"
                prefetch={false}
              >
                <CircleHelp className="h-5 w-5 mr-2" />
                Help
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.9 }}>
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
            </motion.div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-6 bg-[#202020]">
          <ScrollArea>
            {messages.map((message, index) => renderMessage(message, index))}
            {isAiThinking && (
              <div className="flex justify-start">
                <div className="p-3 text-white rounded-3xl mt-2 mb-2 px-5 bg-muted">
                  <TypingIndicator />
                </div>
              </div>
            )}
            {!isTypingComplete && responseBuffer && (
              <div className="flex justify-start">
                <div className="p-3 text-white rounded-3xl mt-2 mb-2 px-5 bg-muted">
                  {renderMarkdownWithCursor(displayedResponse)}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </ScrollArea>
        </div>
        <div className="sticky bottom-0 bg-[#202020] px-4 py-0 md:px-6">
          <div className="relative mb-7">
            <Input
              id="inputField"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
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

export default Tutor;
