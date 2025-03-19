export default function Message({ sender, text, time }) {
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
        <div className="chat-bubble">{text}</div>
        {/* <div className="chat-footer text-xs opacity-50">{time}</div> */}
      </div>
    );
  }
  