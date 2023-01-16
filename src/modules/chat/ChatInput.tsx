import { FC, useCallback, useEffect, useRef, useState } from 'react';

import { IMessage } from '@/shared/message';
import { getSenderId } from '@/utils/getSenderId';
import { uploadImage } from '@/utils/storage';
import { trpc } from '@/utils/trpc';

interface IProps {
  refreshMessages: () => Promise<void>;
}
const ChatInput: FC<IProps> = ({ refreshMessages }) => {
  const [idle, setIdle] = useState(true);
  const [message, setMessage] = useState('');
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [img, setImg] = useState<{ ext?: string; blob?: Blob }>({});

  const sendMutation = trpc.add.useMutation();

  useEffect(() => {
    const msgBox = document.getElementById('msg-box');
    msgBox?.addEventListener('input', (e) => {
      // @ts-ignore
      setMessage(e.target.outerText);
    });
  });
  const resetFields = useCallback(async () => {
    document.getElementById('msg-box')!.innerText = '';
    fileRef.current!.value = '';
    setImg({});
    await refreshMessages();
  }, [refreshMessages]);

  const send = useCallback(
    async (imgUrl: string | undefined) => {
      const msg: IMessage = {
        message,
        image: imgUrl,
        senderId: getSenderId(),
      };
      await sendMutation.mutateAsync(msg);
      await resetFields();
      await refreshMessages();
      setIdle(true);
    },
    [message, refreshMessages, resetFields, sendMutation]
  );

  const sendMessage = async () => {
    setIdle(false);
    if (img.blob) {
      await uploadImage(img.blob, img.ext, (url) => send(url));
    } else await send(undefined);
  };

  return (
    <div className="absolute bottom-0 inset-x-0 flex bg-gray-300 py-2 px-3 items-center lg:rounded-b-2xl">
      <div
        id="msg-box"
        contentEditable={true}
        className="flex-1 rounded px-3 py-2 focus-visible:outline-none resize-y max-h-32 overflow-y-auto bg-white"
      />
      <input
        type="file"
        ref={fileRef}
        className="hidden"
        accept="image/*"
        onChange={async (e) => {
          // @ts-ignore
          const file = e.target.files[0];
          if (file) {
            const ext = file.name.split('.').pop();
            const url = URL.createObjectURL(file);
            const blob = await (await fetch(url)).blob();
            setImg({ ext, blob });
          }
        }}
      />
      <button
        className="rounded-lg bg-white mx-1.5 p-2 h-min"
        onClick={() => fileRef.current?.click()}
      >
        <img src="/assets/img/ic_attachment.png" alt="" className="w-6 h-6" />
      </button>
      <button
        className="rounded-lg bg-white h-min"
        onClick={() => sendMessage()}
        disabled={sendMutation.isLoading}
      >
        {(sendMutation.isLoading || !idle) && (
          <span className="loader m-2 mb-1.5" />
        )}
        {!sendMutation.isLoading && idle && (
          <img src="/assets/img/ic_send.png" alt="" className="w-6 h-6 m-2" />
        )}
      </button>
    </div>
  );
};
export default ChatInput;
