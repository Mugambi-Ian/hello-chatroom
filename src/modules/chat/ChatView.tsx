import React, { FC } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';

import { IMessage } from '@/shared/message';

import ChatMessage from './ChatMessage';

interface IProps {
  messages: IMessage[];
  hasMoreMessages: boolean;
  loadNextPage: () => Promise<void>;
}

const ChatView: FC<IProps> = ({ hasMoreMessages, loadNextPage, messages }) => {
  const list = messages ? [...messages].reverse() : [];
  return (
    <section className="bg-light-gray-300 flex flex-col relative w-full h-5/6 flex-1 pb-14 ">
      <div className="flex h-full w-full">
        {messages && (
          <InfiniteScroll
            dataLength={messages.length} // This is important field to render the next data
            next={loadNextPage}
            hasMore={hasMoreMessages}
            loader={<span className="loader"></span>}
            refreshFunction={() => hasMoreMessages && loadNextPage()}
            pullDownToRefresh={hasMoreMessages}
            pullDownToRefreshThreshold={50}
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
              <ChatMessage message={m} key={m.id} />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </section>
  );
};
export default ChatView;
