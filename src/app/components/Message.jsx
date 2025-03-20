export default function Message({ sender, text }) {
  const userAvatar = "/avatars/creep_user.webp"; // User avatar
  const aiAvatar = "/avatars/ai_img.ico"; // AI avatar

  return (
    <div className={`chat ${sender === "You" ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt={`${sender} Avatar`}
            src={sender === "You" ? userAvatar : aiAvatar}
          />
        </div>
      </div>
      <div
        className={`chat-bubble break-words whitespace-pre-wrap ${
          sender === "Tinker" ? "bg-gray-700" : "bg-blue-500"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
