import { NextPage } from 'next';

import { ChatContext } from '@/context/ChatContext';
import { useLoadMessages } from '@/hooks/useLoadMessages';
import { ChatHeader } from '@/modules/chat/ChatHeader';
import ChatInput from '@/modules/chat/ChatInput';
import ChatView from '@/modules/chat/ChatView';

const IndexPage: NextPage = () => {
  const context = useLoadMessages();
  return (
    <ChatContext.Provider value={context}>
      <section className="flex w-screen h-screen justify-center flex-col">
        <span className="absolute bg-[url(/assets/img/bg_chat.jpg)] h-full w-full" />
        <main className="flex flex-col relative w-full h-full max-w-5xl self-center max-h-[900px] flex-1">
          <ChatHeader />
          <ChatView />
          <ChatInput />
        </main>
      </section>
    </ChatContext.Provider>
  );
};
export default IndexPage;
