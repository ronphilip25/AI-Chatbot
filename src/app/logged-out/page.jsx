"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoggedOut() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/"); // Redirect to home after 3 seconds
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">❌ You are logged out!</h1>
      <p className="text-lg mt-2">Redirecting to home...</p>
      <button
        className="mt-5 cursor-pointer bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
        onClick={() => router.push("/")}
      >
        Go Home Now
      </button>
    </div>
  );
}
