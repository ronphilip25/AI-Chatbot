"use client";
import { FaGithub, FaUserCircle } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const [isTouched, setIsTouched] = useState(false);

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
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);


  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null); // Reset user state
    setDropdownOpen(false);
    router.push("/logged-out"); // Redirect to "logged out" page
    console.log("User logged out, session are cleared");
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

      {/* Right Section: GitHub Link & User Dropdown */}
      <div className="flex items-center space-x-6 relative">
        <a
          href="https://github.com/ronphilip25/AI-Chatbot.git"
          target="_blank"
          rel="noopener noreferrer"
          className="lg:flex md:flex items-center space-x-3 group relative hidden"
          onMouseEnter={() => setIsTouched(true)}
          onTouchStart={() => setIsTouched(true)}
          onMouseLeave={() => setIsTouched(false)}
          onTouchEnd={() => setTimeout(() => setIsTouched(false), 2000)}
        >
          <FaGithub
            className={`text-4xl text-gray-400 transition-transform duration-300 ${isTouched ? "translate-x-0 text-white" : "translate-x-16"
              }`}
          />
          <span
            className={`text-sm font-medium text-gray-300 transition-opacity duration-300 ${isTouched ? "opacity-100" : "opacity-0"
              }`}
          >
            GitHub
          </span>
        </a>

        {/* User Icon Dropdown */}
        <div className="relative flex" ref={dropdownRef}>
          <button onClick={() => setDropdownOpen(!dropdownOpen)}>
            <img
              src={user?.user_metadata?.avatar_url || defaultUserAvatar}
              alt="User Profile"
              className="w-10 h-10 cursor-pointer rounded-full border-2 border-gray-400 hover:border-white transition"
            />
          </button>

          {/* Dropdown Menu with Animation */}
          <div
            className={`absolute right-0 mt-11 w-36 bg-gray-800 shadow-lg rounded-md overflow-hidden transform transition-all duration-300 ${dropdownOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
          >
            {user ? (
              <>
                <button
                  onClick={handleSignOut}
                  className="block w-full cursor-pointer text-left px-4 py-2 text-white hover:bg-red-500 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <a
                href="/login"
                className="block px-4 py-2 text-white hover:bg-blue-500 transition"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
