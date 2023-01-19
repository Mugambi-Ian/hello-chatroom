import React, { FC, useCallback, useContext, useEffect, useRef } from 'react';

import { ChatContext } from '@/context/ChatContext';

import ChatMessage from './ChatMessage';

const ChatView: FC = () => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const { messages, hasMoreMessages, loadPreviousPage, fetching } =
    useContext(ChatContext);

  useEffect(() => {
    if (listRef.current != null && !fetching)
      listRef.current.onscroll = () => {
        const percentScrolled =
          (listRef.current!.scrollTop /
            (listRef.current!.scrollHeight - listRef.current!.offsetHeight)) *
          100;
        if (percentScrolled >= 85) {
          document.getElementById('reloadBtn')?.click();
        }
      };
    else if (listRef.current && fetching) listRef.current.onscroll = null;
  }, [fetching]);

  const fetchMessages = useCallback(() => {
    if (!fetching) {
      let timeoutID: NodeJS.Timeout | undefined;
      const debounced = () => {
        clearTimeout(timeoutID);
        timeoutID = setTimeout(async () => {
          await loadPreviousPage();
        }, 750);
      };
      return debounced();
    }
    return null;
  }, [fetching, loadPreviousPage]);

  return (
    <section
      ref={listRef}
      className="bg-light-gray-300 flex flex-col relative w-full h-5/6 overflow-y-auto flex-1 mt-16 pt-5  lg:mt-0 pb-28 lg:pb-14 overflow-x-hidden"
    >
      {messages &&
        messages.map((m) => (
          <ChatMessage message={m} key={m._id?.toString()} />
        ))}
      {fetching && hasMoreMessages && (
        <div className="mx-auto my-3">
          <span className="loader h-10 w-10 " />
        </div>
      )}
      {!fetching && hasMoreMessages && (
        <button
          className="my-2"
          onClick={() => fetchMessages()}
          id="reloadBtn"
          disabled={fetching}
        >
          Load Previous Messages
        </button>
      )}
    </section>
  );
};
export default ChatView;
