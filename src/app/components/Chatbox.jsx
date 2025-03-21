"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { supabase } from "../lib/supabaseClient";
import SendButton from "./Sendbutton";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userAvatar, setUserAvatar] = useState(null);
  const [inputMoved, setInputMoved] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error) {
        setUserAvatar(data?.user?.user_metadata?.avatar_url || null);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chat]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setInputMoved(true);
    const userMessage = {
      sender: "You",
      text: message,
      time: new Date().toLocaleTimeString(),
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
          { sender: "Tinker", text: data.response, time: new Date().toLocaleTimeString() },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-900 text-white">
      {/* Chat Messages */}
      <motion.div
        ref={chatRef}
        className="flex-1 overflow-y-auto p-4 bg-gray-900 chat-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          maxHeight: "80vh", // Limit max height to enable scrolling
          overflowY: "auto",
        }}
      >
        {chat.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: msg.sender === "You" ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Message
              sender={msg.sender}
              text={msg.text}
              userAvatarUrl={msg.sender === "You" ? userAvatar : null} // Pass dynamic avatar
            />
          </motion.div>
        ))}
        {loading && <Loader />}
      </motion.div>

      {/* Animated Chat Input */}
      <motion.div
        className={`p-4 bg-gray-800 flex items-center shadow-lg rounded-lg border-t border-gray-700 ${!inputMoved
          ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 md:w-1/2 lg:w-1/3"
          : "fixed bottom-0 w-full px-4"
          }`}
        initial={{ y: "-50%", opacity: 0 }}
        animate={{ y: inputMoved ? "0%" : "-50%", opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="relative flex-1">
          <textarea
            className="w-full p-3 rounded-lg mt-2 bg-gray-900/70 text-white truncate placeholder-gray-400 outline-none resize-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-md border border-gray-700 focus:border-blue-400"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            rows={1}
            style={{
              minHeight: "40px",
              maxHeight: "120px",
              overflowY: "auto",
            }}
          ></textarea>
        </div>
        <SendButton sendMessage={sendMessage} isLoading={loading} />
      </motion.div>
    </div>
  );
}
