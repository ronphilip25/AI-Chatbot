import ChatBox from "./components/Chatbox";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 overflow-hidden">
        <ChatBox />
      </div>
    </main>
  );
}
