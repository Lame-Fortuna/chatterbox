import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Siderbar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const Home = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-[url('/background.png')] bg-cover bg-center">
      <div className="flex items-center justify-center pt-20 px-2">
        <div className="bg-white/90 text-blue-950 backdrop-blur-sm rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-6rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home