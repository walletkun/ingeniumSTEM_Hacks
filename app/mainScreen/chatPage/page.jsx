"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {auth} from '@/firebase'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "Welcome to the College Tutor Chatbot! How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [workspaceTitle, setWorkspaceTitle] = useState("");
  const [files, setFiles] = useState([]); // New state for file uploads <- stores in an array of files
  const authInstance = getAuth();
  const messagesEndRef = useRef(null);
  const storage = getStorage();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
      else setUserId(null);
    });
    return () => unsubscribe();
  }, []);

  const uploadFile = async (file) => {
    const fileRef = ref(storage, `uploads/${file.name}`); // Create a reference to the file location

    try {
      // Upload the file
      await uploadBytes(fileRef, file);

      // Get the download URL
      const downloadURL = await getDownloadURL(fileRef);
      return downloadURL; // Return the download URL
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error("File upload failed");
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    const userMessage = { role: "user", content: message };
    setMessage("");
    setIsLoading(true);
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([...messages, userMessage]),
      });

      if (!response.ok) throw new Error("Network response was not ok");

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
      console.error("Error fetching data:", error);
    }

    setIsLoading(false);
  };

  const handleSaveWorkspace = async () => {
    if (!userId) {
      console.error("User is not authenticated.");
      return;
    }
  
    try {
      const token = await authInstance.currentUser.getIdToken();
      const fileUrls = await Promise.all(files.map((file) => uploadFile(file)));
  
      if (!workspaceTitle || messages.length === 0) {
        throw new Error("Invalid workspace data");
      }
  
      const workspaceData = {
        title: workspaceTitle || `Workspace ${Date.now()}`,
        messages: messages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
        fileContent: fileUrls,
      };
  
      const response = await fetch("/api/saveWorkspace", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ data: workspaceData }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error saving workspace:", errorData);
        throw new Error(`Failed to save workspace: ${JSON.stringify(errorData)}`);
      }
  
      const result = await response.json();
      console.log("Workspace saved successfully", result);
    } catch (error) {
      console.error("Error saving workspace:", error);
    }
  };

  // Function to handle file selection
  const handleFileChange = (event) => {
    const allowedFileTypes = ["application/pdf"];
    const maxSize = 10 * 1024 * 1024; // 10 MB

    const selectedFiles = Array.from(event.target.files);

    selectedFiles.forEach((file) => {
      if (!allowedFileTypes.includes(file.type) || file.size > maxSize) {
        console.error(
          `File type ${file.type} or size ${file.size} is not allowed.`
        );
      }
    });
    setFiles(selectedFiles);
  };

  return (
    <Card>
      <ScrollArea>
        {messages.map((message, index) => (
          <div key={index}>
            <p>{message.content || "Start conversation..."}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </ScrollArea>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
      />
      <Button onClick={sendMessage} disabled={isLoading}>
        Send
      </Button>
      <Input
        value={workspaceTitle}
        onChange={(e) => setWorkspaceTitle(e.target.value)}
        placeholder="Enter workspace title"
      />
      <Input
        type="file" // Change input type to file for uploading files
        onChange={handleFileChange}
        multiple // Allow multiple file uploads
      />
      <Button onClick={handleSaveWorkspace}>Save Workspace</Button>
    </Card>
  );
}
