"use client";
import { useState, useEffect, useRef } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    {
      sender: "Tinker",
      text: "Hello, I am Tinker! How can I assist you today?",
      time: new Date().toLocaleTimeString(),
      status: "Delivered",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "You",
      text: message,
      time: new Date().toLocaleTimeString(),
      status: "Sent",
    };

    setChat((prevChat) => [...prevChat, userMessage]);
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      if (data.response) {
        setChat((prevChat) => [
          ...prevChat,
          {
            sender: "Tinker",
            text: data.response,
            time: new Date().toLocaleTimeString(),
            status: "Delivered",
          },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setChat((prevChat) => [
        ...prevChat,
        {
          sender: "Tinker",
          text: "Oops! Something went wrong. Try again later.",
          time: new Date().toLocaleTimeString(),
          status: "Error",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-900 text-white">
      {/* Chat Messages */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto p-4 bg-gray-800"
      >
        {chat.map((msg, index) => (
          <Message
            key={index}
            sender={msg.sender}
            text={msg.text}
            time={msg.time}
          />
        ))}
        {loading && <Loader />}
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-gray-700 flex items-center shadow-md">
        <input
          type="text"
          className="border border-gray-600 p-3 flex-1 rounded-md bg-gray-800 text-white outline-none"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="ml-3 bg-blue-500 hover:bg-blue-400 text-white px-5 py-3 rounded-md transition-all duration-300"
          disabled={loading}
        >
          {loading ? <Loader /> : "Send"}
        </button>
      </div>
    </div>
  );
}
