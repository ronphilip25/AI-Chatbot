"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Auth error:", error.message);
        router.push("/login"); // Redirect to login if no user
        return;
      }

      setUser(data?.user);
    };

    fetchUser();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">🎉 Welcome, {user?.email}!</h1>
      <p className="text-gray-400 mt-2">You are now logged in.</p>
      <button
        onClick={() => router.push("/")}
        className="mt-6 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
