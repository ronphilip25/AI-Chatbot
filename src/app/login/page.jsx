"use client";
import { supabase } from "../lib/supabaseClient";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
      },
    });

    if (error) {
      console.error("Login error:", error.message);
    }
  };

  useEffect(() => {
    const checkUserSession = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.session) {
        router.push("/dashboard"); // ✅ Redirect if already logged in
      }
    };

    checkUserSession();

    // Listen for changes in auth state
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          router.push("/dashboard");
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-700 w-96 text-center">
        <h1 className="text-3xl font-semibold text-black mb-4">Welcome Back</h1>
        <p className="text-gray-400 text-sm mb-6">
          Sign in to continue using Tinker AI Chatbot
        </p>

        {/* Sign in Button */}
        <button
          onClick={handleLogin}
          className="w-full flex cursor-pointer items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          <FaGoogle size={20} /> Sign in with Google
        </button>

        {/* Back to Home Button */}
        <button
          onClick={() => router.push("/")}
          className="mt-4 w-full bg-gray-700 cursor-pointer hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          ⬅ Back to Home
        </button>
      </div>
    </div>
  );
}
