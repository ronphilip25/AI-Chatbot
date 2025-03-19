"use client";
import { useState, useEffect, useRef } from "react";
import Loader from "./Loader";
import Message from "./Message";
import { Inter, Roboto_Mono } from "next/font/google";

// Import Google Fonts
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  // Auto-scroll to latest message
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
    <div
      className={`${inter.variable} ${robotoMono.variable} w-full h-screen flex flex-col bg-gray-900 text-white`}
    >
      {/* Chat Messages */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto p-4 bg-gray-800 max-h-[calc(100vh-140px)] shadow-inner"
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
          className="border border-gray-600 p-3 flex-1 rounded-md bg-gray-800 text-white outline-none font-mono"
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
