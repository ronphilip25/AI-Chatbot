"use client";
import { supabase } from "../lib/supabaseClient";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";

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
        router.push("/dashboard");
      }
    };

    checkUserSession();

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
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gray-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="bg-gray-900 bg-opacity-80 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-gray-800 w-96 text-center"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-semibold text-white">Welcome Back</h1>
        <p className="text-gray-400 text-sm mt-2 mb-6">
          Sign in to continue using <span className="text-blue-400">Tinker AI</span>
        </p>

        {/* Google Sign-in Button */}
        <motion.button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-2 cursor-pointer bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-lg shadow-md transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FcGoogle size={20} /> Sign in with Google
        </motion.button>

        {/* Back to Home Button */}
        <motion.button
          onClick={() => router.push("/")}
          className="mt-4 w-full bg-gray-800 hover:bg-gray-700 cursor-pointer text-white px-5 py-3 rounded-lg transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ⬅ Back to Home
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
