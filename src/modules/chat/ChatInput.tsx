import { FC, useCallback, useContext, useRef, useState } from 'react';

import { ChatContext } from '@/context/ChatContext';
import { IMessage } from '@/shared/message';
import { getSenderId } from '@/utils';
import { uploadImage } from '@/utils/storage';
import { trpc } from '@/utils/trpc';

const ChatInput: FC = () => {
  const [message, setMessage] = useState('');
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { refreshMessages, setFetching, resetCursor } = useContext(ChatContext);
  const [img, setImg] = useState<File>();

  const sendMutation = trpc.add.useMutation();

  const send = useCallback(
    async (imgUrl: string | undefined) => {
      const msg: IMessage = {
        message,
        image: imgUrl,
        senderId: getSenderId(),
      };
      resetCursor();
      await sendMutation.mutateAsync(msg);
      setMessage('');
      setImg(undefined);
      await refreshMessages();
    },
    [message, refreshMessages, resetCursor, sendMutation]
  );

  const sendMessage = async () => {
    let imgUrl;
    setFetching(true);
    if (img) {
      imgUrl = await uploadImage(img);
    }
    await send(imgUrl);
    setFetching(false);
  };

  const { isLoading } = sendMutation;
  const newLines = message.split('\n').length;
  return (
    <div className="absolute bottom-0 pb-14 lg:pb-0 inset-x-0 flex bg-gray-200 py-2 px-3 lg:rounded-b-2xl">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        id="msg-box"
        className="flex-1 rounded px-3 py-2 mb-2 focus-visible:outline-none resize-y max-h-32 overflow-y-auto bg-white"
        rows={newLines < 4 ? newLines : 4}
      />
      <input
        type="file"
        ref={fileRef}
        className="hidden"
        accept="image/*"
        onChange={async (e) => {
          // @ts-ignore
          const file = e.target.files[0];
          if (file) setImg(file);
        }}
      />
      <button
        className="rounded-lg bg-white mx-1.5 p-2 h-min "
        onClick={() => fileRef.current?.click()}
      >
        <img src="/assets/img/ic_attachment.png" alt="" className="w-6 h-6" />
      </button>
      <button
        className="rounded-lg bg-white h-min"
        onClick={() => sendMessage()}
        disabled={sendMutation.isLoading}
      >
        {isLoading && <span className="loader m-2 mb-1.5" />}
        {!isLoading && (
          <img src="/assets/img/ic_send.png" alt="" className="w-6 h-6 m-2" />
        )}
      </button>
    </div>
  );
};
export default ChatInput;
