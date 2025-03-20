"use client";

import { FaGithub } from "react-icons/fa";
import { useState } from "react";

export default function Navbar() {
  const [isTouched, setIsTouched] = useState(false);

  return (
    <nav className="bg-gray-900 text-white py-6 px-6 flex justify-between items-center shadow-lg sticky top-0 z-50">
      {/* Left Section: Logo & Title */}
      <div className="flex items-center space-x-4">
        <img
          alt="logo"
          src="/avatars/ai_img.ico"
          className="w-12 h-12 rounded-full shadow-md border border-gray-700"
        />
        <div>
          <h1 className="text-xl font-semibold tracking-wide">
            Tinker | AI Chatbot
          </h1>
          <p className="text-xs text-gray-400">
            v1.0.0 • by Ron Philip • © 2025
          </p>
        </div>
      </div>

      {/* Right Section: GitHub Link with Animation */}
      <a
        href="https://github.com/ronphilip25/AI-Chatbot.git"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-3 group relative"
        onMouseEnter={() => setIsTouched(true)}
        onTouchStart={() => setIsTouched(true)}
        onMouseLeave={() => setIsTouched(false)}
        onTouchEnd={() => setTimeout(() => setIsTouched(false), 2000)}
      >
        <FaGithub
          className={`text-3xl text-gray-400 transition-transform duration-300 ${
            isTouched ? "translate-x-0 text-white" : "translate-x-10"
          }`}
        />
        <span
          className={`text-sm font-medium text-gray-300 transition-opacity duration-300 ${
            isTouched ? "opacity-100" : "opacity-0"
          }`}
        >
          GitHub
        </span>
      </a>
    </nav>
  );
}
