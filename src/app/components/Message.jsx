import { motion } from "framer-motion";

export default function Message({ sender, text, userAvatarUrl }) {
  const defaultUserAvatar = "/avatars/creep_user.webp"; // Default user avatar
  const aiAvatar = "/avatars/ai_img.ico"; // AI avatar

  return (
    <motion.div
      initial={{ opacity: 0, x: sender === "You" ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`chat ${sender === "You" ? "chat-end" : "chat-start"}`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            alt={`${sender} Avatar`}
            src={sender === "You" ? userAvatarUrl || defaultUserAvatar : aiAvatar}
            className="object-cover w-10 h-10 rounded-full"
          />
        </div>
      </div>
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={`chat-bubble break-words whitespace-pre-wrap ${sender === "Tinker"
          ? "bg-blue-500 text-white"
          : "bg-green-500 text-white"
          }`}
      >
        {text}
      </motion.div>
    </motion.div>
  );
}
