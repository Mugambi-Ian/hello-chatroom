import React, { FC } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';

import { IMessage } from '@/shared/message';

import ChatMessage from './ChatMessage';

interface IProps {
  messages: IMessage[];
  hasMoreMessages: boolean;
  loadNextPage: () => Promise<void>;
  refreshMessages: () => Promise<void>;
}

const ChatView: FC<IProps> = ({
  hasMoreMessages,
  loadNextPage,
  messages,
  refreshMessages,
}) => {
  const list = messages ? [...messages].reverse() : [];
  return (
    <section className="bg-light-gray-300 flex flex-col relative w-full h-5/6 flex-1 pb-14 overflow-x-hidden">
      <div className="flex h-full w-full">
        {messages && (
          <InfiniteScroll
            dataLength={messages.length}
            next={loadNextPage}
            hasMore={hasMoreMessages}
            loader={<span className="loader"></span>}
            refreshFunction={() => hasMoreMessages && loadNextPage()}
            pullDownToRefresh={hasMoreMessages}
            pullDownToRefreshThreshold={hasMoreMessages ? 150 : 1000}
            pullDownToRefreshContent={
              hasMoreMessages && (
                <h3 style={{ textAlign: 'center' }}>
                  &#8595; Pull down to refresh
                </h3>
              )
            }
            releaseToRefreshContent={
              hasMoreMessages && (
                <h3 style={{ textAlign: 'center' }}>
                  &#8593; Release to refresh
                </h3>
              )
            }
          >
            {list.map((m) => (
              <ChatMessage
                refreshMessages={refreshMessages}
                message={m}
                key={m.id}
              />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </section>
  );
};
export default ChatView;
