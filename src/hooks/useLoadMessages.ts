import { useCallback, useEffect, useState } from 'react';

import { IChatContext } from '@/context/ChatContext';
import { IMessage } from '@/shared/message';
import { PAGE_SIZE } from '@/utils';
import { trpc } from '@/utils/trpc';

export function useLoadMessages(): IChatContext {
  const [fetching, setFetching] = useState(false);
  const [cursorCurrent, setCursor] = useState('');
  const [hasMoreMessages, setHasMore] = useState<boolean>(true);
  const [messages, setMessages] = useState<IMessage[]>([]);

  const { refetch, isError } = trpc.list.useQuery(
    { _id: cursorCurrent ?? '' },
    { enabled: false }
  );

  const resetCursor = () => setCursor('');

  const refreshMessages = useCallback(async () => {
    if (!fetching) {
      setFetching(true);
      const { data } = await refetch({});
      const fetched = data as IMessage[];
      if (fetched.length !== 0) {
        setMessages(fetched);
      }
      if (fetched.length === PAGE_SIZE) {
        const cursor = fetched[fetched.length - 1]?._id?.toString() as string;
        setCursor(cursor);
        setHasMore(true);
      } else {
        setHasMore(false);
        setCursor('');
      }
      setFetching(false);
    }
  }, [fetching, refetch]);

  const loadPreviousPage = useCallback(async () => {
    if (!fetching && hasMoreMessages) {
      setFetching(true);
      const { data } = await refetch();
      const fetched = data as IMessage[];
      if (fetched) {
        setMessages([...messages, ...fetched]);
        const cursor = fetched[fetched.length - 1]?._id?.toString() as string;
        if (fetched.length === PAGE_SIZE) {
          setCursor(cursor);
          setHasMore(true);
        } else setHasMore(false);
      } else setHasMore(false);
      setFetching(false);
    }
  }, [fetching, hasMoreMessages, messages, refetch]);

  useEffect(() => {
    refreshMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    messages,
    fetching,
    setFetching,
    resetCursor,
    error: isError,
    hasMoreMessages,
    refreshMessages,
    loadPreviousPage,
  };
}
