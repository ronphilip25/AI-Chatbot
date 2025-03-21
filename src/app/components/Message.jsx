export default function Message({ sender, text, userAvatarUrl }) {
  const defaultUserAvatar = "/avatars/creep_user.webp"; // Default user avatar
  const aiAvatar = "/avatars/ai_img.ico"; // AI avatar

  return (
    <div className={`chat ${sender === "You" ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt={`${sender} Avatar`}
            src={sender === "You" ? userAvatarUrl || defaultUserAvatar : aiAvatar}
            className="object-cover w-10 h-10 rounded-full"
          />
        </div>
      </div>
      <div
        className={`chat-bubble break-words whitespace-pre-wrap ${sender === "Tinker" ? "bg-blue-500 text-white" : "bg-green-500 text-white"
          }`}
      >
        {text}
      </div>
    </div>
  );
}
