"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-6 bg-gray-900 text-white text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="max-w-lg w-full"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-xl md:text-4xl font-bold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          🎉 Welcome, {user?.email}!
        </motion.h1>

        <motion.p
          className="text-gray-400 mt-2 text-sm md:text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          You are now logged in.
        </motion.p>

        <motion.button
          onClick={() => router.push("/")}
          className="mt-6 bg-blue-600 cursor-pointer hover:bg-blue-500 text-white px-6 py-3 rounded-lg transition-all duration-300 transform w-full sm:w-auto"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Go to Dashboard
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
