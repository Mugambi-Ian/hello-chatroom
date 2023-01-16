import { ChatHeader } from '@/modules/chat/ChatHeader';
import { ChatInput } from '@/modules/chat/ChatInput';
import { ChatView } from '@/modules/chat/ChatView';
import { IMessage } from '@/shared/message';
import { getSenderId } from '@/utils/getSenderId';

export default function IndexPage() {
  const senderId = getSenderId();
  const messages: IMessage[] = [
    {
      id: '1',
      senderId,
      message:
        'Build a simple non-authenticated chat room in a very modern stack.  It should look like the one below.  It takes ~100 lines of code (not counting CSS) because you’ll be relying on a template for boilerplate.',
    },
    {
      id: '2',
      senderId: '',
      message:
        'If you make a submission, we will provide feedback to help improve it as a portfolio project, regardless of whether we decide to move forward with your candidacy or not. ',
      image: '/assets/img/bg_chat.jpg',
    },
  ];
  return (
    <section className="flex w-screen h-screen justify-center">
      <span className="absolute bg-[url(/assets/img/bg_chat.jpg)] h-full w-full" />
      <section className="flex flex-col relative w-full h-full max-w-5xl lg:max-h-[900px] self-center">
        <ChatHeader />
        <ChatView messages={messages} senderId={senderId} />
        <ChatInput />
      </section>
    </section>
  );
}
