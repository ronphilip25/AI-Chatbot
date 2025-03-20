"use client";
import { useState, useEffect, useRef } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { supabase } from "../lib/supabaseClient";

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
  const [userAvatar, setUserAvatar] = useState(null);
  const chatRef = useRef(null);

  // Fetch authenticated user's avatar
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Auth error:", error);
        return;
      }
      setUserAvatar(data?.user?.user_metadata?.avatar_url || null);
    };

    fetchUser();

    // Listen for authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          setUserAvatar(null); // Reset avatar when user logs out
        } else if (session) {
          setUserAvatar(session.user?.user_metadata?.avatar_url || null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
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

    const userMessage = {
      sender: "You",
      text: message,
      time: new Date().toLocaleTimeString(),
      status: "Sent",
      userAvatar: userAvatar, // Pass the user's avatar dynamically
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
      <div ref={chatRef} className="flex-1 overflow-y-auto p-4 bg-gray-800">
        {chat.map((msg, index) => (
          <Message
            key={index}
            sender={msg.sender}
            text={msg.text}
            userAvatarUrl={msg.sender === "You" ? userAvatar : null} // Pass dynamic avatar
          />
        ))}
        {loading && <Loader />}
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-gray-800 flex items-center shadow-lg border-t border-gray-700">
        <div className="relative flex-1">
          <textarea
            className="w-full p-3 rounded-lg mt-2 bg-gray-900/70 text-white placeholder-gray-400 outline-none resize-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-md border border-gray-700 focus:border-blue-400"
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
            style={{ minHeight: "40px", maxHeight: "120px", overflowY: "auto" }}
          ></textarea>
        </div>
        <button
          onClick={sendMessage}
          className="ml-3 bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-lg transition-all duration-300 shadow-md flex items-center gap-2"
        >
          <span className="hidden sm:inline">Send</span>
          🚀
        </button>
      </div>
    </div>
  );
}
