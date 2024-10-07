'use client';

import React, { useState, useEffect, useRef } from "react";
import { getAuth } from "firebase/auth";

const Chatbox = ({ userName, workspaceTitle }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (workspaceTitle) {
      fetchChatHistory();
    }
  }, [workspaceTitle]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const fetchChatHistory = async () => {
    if (!workspaceTitle) return;

    try {
      setIsLoading(true);
      const token = await auth.currentUser.getIdToken();
      const response = await fetch(`/api/chats?title=${encodeURIComponent(workspaceTitle)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch chat history');
      }

      const data = await response.json();
      setChatHistory(data);
    } catch (e) {
      console.error("API Error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !workspaceTitle) return;

    setIsLoading(true);

    try {
      const token = await auth.currentUser.getIdToken();
      setChatHistory(prev => [...prev, { role: 'user', content: message }]);

      const response = await fetch("/api/chats/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message, workspaceTitle }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aiResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        aiResponse += chunk;
        setChatHistory(prev => {
          const newHistory = [...prev];
          if (newHistory[newHistory.length - 1].role === 'assistant') {
            newHistory[newHistory.length - 1].content += chunk;
          } else {
            newHistory.push({ role: 'assistant', content: chunk });
          }
          return newHistory;
        });
      }

      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbox">
      <div className="chat-messages">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <strong>{msg.role === 'user' ? userName : 'Cicero'}:</strong> {msg.content}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button onClick={sendMessage} disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default Chatbox;