export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white py-4 flex justify-between items-center px-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            alt="logo"
            src="/avatars/ai_img.avif"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-2xl font-semibold">Tinker | AI Chatbot</span>
      </div>
    </nav>
  );
}
