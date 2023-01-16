import React, { FC } from 'react';

import clsx from 'clsx';

import { useSenderId } from '@/hooks/useSenderId';
import { IMessage } from '@/shared/message';

interface IProps {
  message: IMessage;
}
const ChatMessage: FC<IProps> = ({ message: m }) => {
  const senderId = useSenderId();
  const isSender = m.senderId === senderId;
  return (
    <>
      {m.message.length !== 0 && (
        <div
          className={clsx(
            'py-2 px-3 rounded-t-2xl max-w-[75%] w-max',
            isSender && 'bg-primary ml-auto mr-5 text-white rounded-bl-2xl',
            !isSender && 'bg-white mr-auto ml-6 text-gray-600 rounded-br-2xl',
            m.image && 'mt-3',
            !m.image && 'my-3'
          )}
        >
          <p className="">{m.message}</p>
        </div>
      )}
      {m.image && (
        <img
          onClick={() => window.open(m.image, '_blank')}
          src={m.image}
          alt=""
          className={clsx(
            'mb-3 max-w-[75%]  lg:max-w-[50%] rounded-b-2xl cursor-pointer',
            m.senderId === senderId && 'ml-auto mr-5 text-white rounded-bl-2xl',
            m.senderId !== senderId && 'mr-auto ml-6 text-gray-600',
            m.message.length === 0 && 'mt-3'
          )}
        />
      )}
    </>
  );
};

export default ChatMessage;
