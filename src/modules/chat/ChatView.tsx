import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import { IMessage } from '@/shared/message';

import ChatMessage from './ChatMessage';

interface IProps {
  loading: boolean;
  messages: IMessage[];
  hasMoreMessages: boolean | undefined;
  loadPreviousPage: () => boolean | Promise<void>;
  refreshMessages: () => boolean | Promise<void>;
}

const ChatView: FC<IProps> = ({
  hasMoreMessages,
  loadPreviousPage,
  messages,
  refreshMessages,
  loading,
}) => {
  const [fetching, setFetching] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (listRef.current != null)
      listRef.current.onscroll = () => {
        if (
          hasMoreMessages &&
          listRef.current!.scrollTop / listRef.current!.offsetHeight >= 0.5
        ) {
          document.getElementById('reloadBtn')?.click();
          setFetching(true);
        }
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMessages = useCallback(() => {
    let timeoutID: NodeJS.Timeout | undefined;
    const debounced = () => {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(async () => {
        await loadPreviousPage();
        setFetching(false);
      }, 500);
    };
    return debounced;
  }, [loadPreviousPage]);

  return (
    <section
      ref={listRef}
      className="bg-light-gray-300 flex flex-col relative w-full h-5/6 overflow-y-auto flex-1 mt-16  lg:mt-0 pb-28 lg:pb-14 overflow-x-hidden"
    >
      <button className="hidden" onClick={fetchMessages()} id="reloadBtn" />
      {messages &&
        messages.map((m) => (
          <ChatMessage
            refreshMessages={refreshMessages}
            message={m}
            key={m.id}
          />
        ))}
      {(loading || fetching) && hasMoreMessages && (
        <div className="mx-auto">
          <span className="loader h-10 w-10 my-2" />
        </div>
      )}
    </section>
  );
};
export default ChatView;
