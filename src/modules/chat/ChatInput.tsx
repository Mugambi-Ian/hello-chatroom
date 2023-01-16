import { FC, useRef } from 'react';

export const ChatInput: FC = () => {
  const fileRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="absolute bottom-0 inset-x-0 flex bg-gray-300 py-2 px-3 items-center lg:rounded-b-2xl">
      <div
        contentEditable={true}
        className="flex-1 rounded px-3 py-2 focus-visible:outline-none resize-y max-h-32 overflow-y-auto bg-white"
      />
      <input type="file" ref={fileRef} className="hidden" />
      <button
        className="rounded-lg bg-white mx-1.5 p-2 h-min"
        onClick={() => fileRef.current?.click()}
      >
        <img src="/assets/img/ic_attachment.png" alt="" className="w-6 h-6" />
      </button>
      <button className="rounded-lg bg-white  p-2 h-min">
        <img src="/assets/img/ic_send.png" alt="" className="w-6 h-6" />
      </button>
    </div>
  );
};
