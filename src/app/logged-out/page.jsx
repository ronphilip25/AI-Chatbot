"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoggedOut() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);

    const timeout = setTimeout(() => {
      router.push("/"); // Redirect to home after 3 seconds
    }, 3000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [router]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.h1
        className="text-xl md:text-4xl mb-4 font-bold"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        ❌ You are logged out!
      </motion.h1>

      <motion.p
        className="text-lg mt-2"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        Redirecting to home in{" "}
        <motion.span
          key={countdown}
          className="font-bold text-blue-400"
          initial={{ scale: 1 }}
          animate={{ scale: 1.5 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          {countdown}
        </motion.span>{" "}
        seconds...
      </motion.p>

      <motion.button
        className="mt-5 cursor-pointer bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
        onClick={() => router.push("/")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        Go Home Now
      </motion.button>
    </motion.div>
  );
}
