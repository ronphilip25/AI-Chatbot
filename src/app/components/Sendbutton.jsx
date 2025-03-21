import { motion } from "framer-motion";

export default function SendButton({ sendMessage, isLoading }) {
    return (
        <motion.button
            onClick={sendMessage}
            disabled={isLoading}
            className={`relative ml-3 bg-blue-600 cursor-pointer hover:bg-blue-500 text-white px-5 py-3 rounded-lg transition-all duration-300 shadow-md flex items-center gap-2 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            whileHover={{ scale: isLoading ? 1 : 1.1 }}
            whileTap={{ scale: isLoading ? 1 : 0.9 }}
        >
            <span className="hidden sm:inline">Send</span>

            {/* 🚀 Animated Blue Rocket */}
            <motion.span
                animate={
                    isLoading
                        ? {
                            y: [-2, 2, -2, 2, -2], // Shaking effect before launch
                            rotate: [0, 5, -5, 5, -5, 0], // Slight rotation while shaking
                            textShadow: [
                                "0px 0px 5px rgba(173, 216, 230, 0.8)", // Light Blue Glow
                                "0px 0px 10px rgba(0, 191, 255, 0.8)", // Deep Sky Blue Glow
                            ],
                            transition: { duration: 0.5, repeat: Infinity, ease: "easeInOut" },
                        }
                        : { y: 0, rotate: 0, opacity: 1, textShadow: "none" }
                }
                style={{ color: "#3b82f6" }} // Blue color for rocket
            >
                🚀
            </motion.span>

            {/* 🚀 Rocket Launch Animation */}
            {isLoading && (
                <motion.span
                    className="absolute"
                    initial={{ y: 0, opacity: 1, scale: 1 }}
                    animate={{ y: -60, opacity: 0, scale: 1.3, rotate: 45 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ color: "#3b82f6" }} // Keeping it blue
                >
                    🚀
                </motion.span>
            )}

            {/* 💨 Blue Smoke Trail */}
            {isLoading && (
                <motion.div
                    className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-300 rounded-full opacity-50"
                    initial={{ opacity: 0.5, scale: 1 }}
                    animate={{
                        opacity: [0.5, 0.3, 0.1, 0],
                        scale: [1, 1.5, 2, 2.5],
                        y: [0, 5, 10, 15],
                    }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                />
            )}
        </motion.button>
    );
}
