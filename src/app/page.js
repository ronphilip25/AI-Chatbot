import ChatBox from "./components/Chatbox";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="h-screen flex flex-col">
      <Navbar />
      <ChatBox className="flex-1" />
    </main>
  );
}
