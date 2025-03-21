"use client";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const defaultUserAvatar = "/avatars/creep_user.webp"; // Default avatar

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error("Auth error:", error);
      setUser(data?.user || null);
    };

    fetchUser();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session ? session.user : null);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setDropdownOpen(false);
    router.push("/logged-out");
    console.log("User logged out, session cleared");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.nav
      className="bg-gray-900 text-white py-6 px-6 flex justify-between items-center shadow-lg sticky top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Left Section: Logo & Title */}
      <div className="flex items-center space-x-4">
        <motion.img
          src="/avatars/ai_img.ico"
          alt="logo"
          className="w-12 h-12 rounded-full shadow-md border border-gray-700"
          whileHover={{ scale: 1.1 }}
        />
        <div>
          <h1 className="text-md font-bold tracking-wide md:text-2xl">
            Tinker | AI Chatbot
          </h1>
          <p className="text-xs text-gray-400">v1.0.0 • by Ron Philip • © 2025</p>
        </div>
      </div>

      {/* Right Section: GitHub Link & User Dropdown */}
      <div className="flex items-center space-x-6 relative">
        {/* GitHub Icon */}
        <motion.a
          href="https://github.com/ronphilip25/AI-Chatbot.git"
          target="_blank"
          rel="noopener noreferrer"
          className="lg:flex md:flex items-center space-x-3 hidden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaGithub className="text-4xl text-gray-400 hover:text-white transition-colors duration-300" title="GitHub"/>
        </motion.a>

        {/* User Avatar & Dropdown */}
        <div className="relative flex items-center space-x-3" ref={dropdownRef}>
          {/* Show user name & email if logged in */}
          {user && (
            <div className="hidden md:flex flex-col text-right">
              <span className="text-sm font-medium">{user?.user_metadata?.full_name || "User"}</span>
              <span className="text-xs text-gray-400">{user?.email}</span>
            </div>
          )}

          {/* User Avatar Button */}
          <motion.button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center space-x-2 relative"
          >
            <img
              src={user?.user_metadata?.avatar_url || defaultUserAvatar}
              alt="User Profile"
              className="w-10 h-10 cursor-pointer rounded-full border-2 border-gray-400 hover:border-white transition"
            />
          </motion.button>

          {/* Dropdown Menu */}
          <motion.div
            className="absolute right-0 mt-22 w-auto bg-gray-800 shadow-lg rounded-md overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={dropdownOpen ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{ display: dropdownOpen ? "block" : "none" }}
          >
            {user ? (
              <>
                {/* Logout Button */}
                <button
                  onClick={handleSignOut}
                  className="block w-auto cursor-pointer text-left px-4 py-2 text-white hover:bg-red-500 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <a href="/login" className="block px-4 py-2 cursor-pointer text-white hover:bg-blue-500 transition">
                Login
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
