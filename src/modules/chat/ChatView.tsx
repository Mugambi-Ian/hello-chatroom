import { FC } from 'react';

import { IMessage } from '@/shared/message';

interface IProps {
  senderId: string;
  messages: IMessage[];
}

export const ChatView: FC<IProps> = ({ messages, senderId }) => {
  const Message = (m: IMessage) => (
    <>
      <div
        className={`py-2 px-3 rounded-t-2xl max-w-[75%] 
        ${
          m.senderId === senderId &&
          'bg-primary self-end mr-5 text-white rounded-bl-2xl'
        }
       ${
         m.senderId !== senderId &&
         'bg-white self-start ml-6 text-gray-600 rounded-br-2xl'
       } 
        ${m.image && 'mt-3'}
        ${!m.image && 'my-3'}
        `}
      >
        <p className="">{m.message}</p>
      </div>
      {m.image && (
        <img
          onClick={() => window.open(m.image, '_blank')}
          src={m.image}
          alt=""
          className={`mb-3 max-w-[75%]  lg:max-w-[50%] rounded-b-2xl cursor-pointer ${
            m.senderId === senderId && 'self-end mr-5 text-white rounded-bl-2xl'
          }
       ${m.senderId !== senderId && 'self-start ml-6 text-gray-600'} `}
        />
      )}
    </>
  );
  return (
    <section className="bg-light-gray-300 flex flex-col relative w-full h-full overflow-y-auto max-h-full flex-1 pb-14 ">
      {messages.map((m) => (
        <Message key={m.id} {...m} />
      ))}
    </section>
  );
};
