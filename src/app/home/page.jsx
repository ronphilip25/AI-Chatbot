export default function Intro() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to Tinker</h1>
        <p className="text-lg mb-6">Your AI assistant. How can I help you today?</p>
        <a
          href="/chat"
          className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-md transition-all duration-300"
        >
          Start Chat
        </a>
      </div>
    );
  }
  