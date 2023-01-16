import { NextPage } from 'next';

import { useLoadMessages } from '@/hooks/useLoadMessages';
import { ChatHeader } from '@/modules/chat/ChatHeader';
import ChatInput from '@/modules/chat/ChatInput';
import ChatView from '@/modules/chat/ChatView';

const IndexPage: NextPage = () => {
  const { messages, hasMoreMessages, loadNextPage, refreshMessages } =
    useLoadMessages();
  return (
    <section className="flex w-screen h-screen justify-center flex-col">
      <span className="absolute bg-[url(/assets/img/bg_chat.jpg)] h-full w-full" />
      <span className="bg-[url(/assets/img/bg_chat.jpg)] h-full w-full hidden md:flex  max-h-[15%]" />
      <section className="flex flex-col relative w-full h-full max-w-5xl self-center max-h-[900px] flex-1">
        <ChatHeader refreshMessages={refreshMessages} />
        <ChatView
          messages={messages}
          loadNextPage={loadNextPage}
          hasMoreMessages={hasMoreMessages}
          refreshMessages={refreshMessages}
        />
        <ChatInput refreshMessages={refreshMessages} />
      </section>
      <span className="bg-[url(/assets/img/bg_chat.jpg)] h-full w-full z-50 hidden md:flex max-h-[15%]" />
    </section>
  );
};
export default IndexPage;
