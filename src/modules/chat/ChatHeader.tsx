import { FC } from 'react';

export const ChatHeader: FC = () => (
  <header className="bg-black flex w-full h-min py-3 lg:rounded-t-2xl">
    <img
      src="/apple-touch-icon.png"
      alt="user profile"
      className="p-1.5 w-[45px] h-[45px] rounded-[25px] bg-white object-contain mx-3 self-center"
    />
    <div className="-mt-1 text-white flex-1">
      <h1 className="font-bold text-xl">Hello Chatroom! </h1>
      <p className="text-sm leading-5">
        <span className="text-green-700 mr-2">●</span> global chat
      </p>
    </div>
    <button className="rounded-lg self-center p-2 h-min mx-3">
      <img src="/assets/img/ic_reload.png" alt="" className="w-8 h-8" />
    </button>
  </header>
);
