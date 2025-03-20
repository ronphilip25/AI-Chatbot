"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      console.log("User data:", data);
      setUser(data?.user || null);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/login");
  };

  return (
    <div>
      <nav className="p-4 bg-gray-800 text-white flex justify-between">
        <h1 className="text-lg font-semibold">Tinker | AI Chatbot</h1>
        {user ? (
          <button
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        ) : (
          <a
            href="/login"
            className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-md"
          >
            Login
          </a>
        )}
      </nav>
      <main>{children}</main>
    </div>
  );
}
