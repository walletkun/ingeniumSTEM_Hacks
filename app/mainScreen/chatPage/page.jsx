"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect, useRef } from "react";
import { saveChat, getChats } from "@/lib/chatUtils";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: `Welcome to the College Tutor Chatbot! How can I help you today?`,
    },
  ]);

  const [message, setMessage] = useState(""); // Change to a string
  const [isLoading, setIsLoading] = useState(false);
  const [savedChats, setSavedChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const messagesEndRef = useRef(null);
  const auth = getAuth();
  const [userId, setUserId] = useState(null);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe(); // Cleanup subscription
  }, [auth]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch saved chats from Firebase
  useEffect(() => {
    const fetchChats = async () => {
      if (userId) {
        try {
          const data = await getChats(userId); // Use the actual user ID
          setSavedChats(data);
        } catch (error) {
          console.error("Error fetching chats:", error);
        }
      }
    };

    fetchChats();
  }, [userId]); // Run effect when userId changes

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return; // Don't send empty messages
    const userMessage = { role: "user", content: message };
    
    setMessage(""); // Clear the input
    setIsLoading(true);

    setMessages((prevMessages) => [
      ...prevMessages,
      userMessage,
      { role: "system", content: "" },
    ]);

    try {
      const response = await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([...messages, userMessage]),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        result += decoder.decode(value, { stream: true });
        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          const otherMessages = prevMessages.slice(0, -1);
          return [...otherMessages, { ...lastMessage, content: result }];
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setIsLoading(false);
  };

  const handleSaveChat = async () => {
    if (messages.length > 0 && userId) {
      const existingChatIndex = savedChats.findIndex((chat) => chat.id === selectedChat?.id);
      
      if (existingChatIndex !== -1) {
        // Update existing chat
        const updatedChats = [...savedChats];
        updatedChats[existingChatIndex] = {
          ...updatedChats[existingChatIndex],
          messages: [...messages],
        };
        setSavedChats(updatedChats);
      } else {
        // Create new chat
        const newChat = {
          id: Date.now(),
          messages: [...messages],
          title: `Chat ${savedChats.length + 1}`,
        };
        setSavedChats((prevChats) => [...prevChats, newChat]);
      }
      
      try {
        await saveChat(userId, messages, selectedChat);
      } catch (error) {
        console.error("Error saving chat:", error);
      }
    } else if (!userId) {
      console.error("User is not authenticated.");
    }
  };


  const loadChat = (chat) => {
    console.log("Loaded chat", chat);
    if (chat && chat.message && Array.isArray(chat.message)) {
      setMessages(chat.message); 
      setSelectedChat(chat);
      console.log("Messages after load:", chat.message); 
    } else {
      console.error("Loaded chat messages are empty or not an array.");
    }
  };

  return (
    <Card>
      <ScrollArea>
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((message, index) => (
            <div key={index}>
              <p>{message.content}</p> {/* Ensure the content is accessible */}
            </div>
          ))
        ) : (
          <p>No messages yet.</p> // Optional: Display a message when there are no chats
        )}
        <div ref={messagesEndRef} />
      </ScrollArea>
      <Input
        value={message} // Keep as string
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
      />
      <Button onClick={sendMessage} disabled={isLoading}>Send</Button>
      <Button onClick={handleSaveChat}>Save Chat</Button>
      {Array.isArray(savedChats) &&
        savedChats.map((chat) => (
          <Button key={chat.id} onClick={() => loadChat(chat)}>
            {chat.id}
          </Button>
        ))}
    </Card>
  );
}
