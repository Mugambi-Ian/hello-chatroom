import React, { FC, useState } from 'react';

import clsx from 'clsx';

import { useSenderId } from '@/hooks/useSenderId';
import { IMessage } from '@/shared/message';
import { trpc } from '@/utils/trpc';

interface IProps {
  message: IMessage;
  refreshMessages: () => Promise<void>;
}

function timeSince(date: Date) {
  // @ts-ignore
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return `${Math.floor(interval)} years`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return `${Math.floor(interval)} months`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)} days`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)} hours`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)} minutes`;
  }
  return `${Math.floor(seconds)} seconds`;
}
const ChatMessage: FC<IProps> = ({ message: m, refreshMessages }) => {
  const senderId = useSenderId();
  const isSender = m.senderId === senderId;
  const emptyMessage = m.message.length === 0;
  const [isDeleteVisible, showDelete] = useState(false);

  const deleteMutation = trpc.delete.useMutation();
  const deleteMsg = async () => {
    await deleteMutation.mutateAsync({ id: m.id! });
    await refreshMessages();
    await refreshMessages();
  };

  const deleteBtn = (
    <img
      src="/assets/img/ic_bin.png"
      alt=""
      className="w-8 h-8 lg:w-16 lg:h-16  mx-2 cursor-pointer"
      onClick={deleteMsg}
    />
  );
  return (
    <span
      onMouseEnter={() => showDelete(true)}
      onMouseLeave={() => showDelete(false)}
    >
      {m.message.length !== 0 && (
        <button
          onClick={deleteMsg}
          className={clsx(
            'flex py-2 px-3 rounded-t-2xl max-w-[75%] w-max',
            isSender && 'bg-primary ml-auto mr-5 text-white rounded-bl-2xl',
            !isSender && 'bg-white mr-auto ml-6 text-gray-600 rounded-br-2xl',
            m.image && 'mt-3',
            !m.image && 'mt-3'
          )}
        >
          <div className="flex flex-col">
            {m.message.split('\n').map((message, id) => (
              <p className="w-full text-start" key={id}>
                {message}
              </p>
            ))}
          </div>
          {isDeleteVisible && (
            <img
              src="/assets/img/ic_bin.png"
              alt=""
              className="w-5 h-5  mx-2"
            />
          )}
        </button>
      )}
      {m.image && (
        <span
          className={clsx(
            'flex max-w-[75%]  lg:max-w-[50%] mt-3',
            isSender && 'ml-auto mr-6 text-white rounded-bl-2xl',
            !isSender && 'mr-auto ml-6 text-gray-600',
            isSender && emptyMessage && isDeleteVisible && 'mr-16 lg:mr-[102px]'
          )}
        >
          {isDeleteVisible && emptyMessage && isSender && deleteBtn}
          <img
            onClick={() => window.open(m.image, '_blank')}
            src={m.image}
            alt=""
            className="rounded-2xl cursor-pointer w-min"
          />
          {isDeleteVisible && emptyMessage && !isSender && deleteBtn}
        </span>
      )}
      <p
        className={clsx(
          'text-xs text-gray-700 mb-3 mt-1 max-w-[75%]  lg:max-w-[50%]',
          isSender && 'ml-auto mr-5 text-end',
          !isSender && 'mr-auto ml-6 '
        )}
      >
        {timeSince(new Date(m.timeStamp!))} ago
      </p>
    </span>
  );
};

export default ChatMessage;
