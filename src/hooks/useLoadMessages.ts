import { useCallback, useEffect, useState } from 'react';

import { IMessage } from '@/shared/message';
import { trpc } from '@/utils/trpc';

export function useLoadMessages() {
  const [page, setPage] = useState(0);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const result = trpc.list.useQuery({ page });

  const loadMessages = () => {
    return messages.length === 0
      ? (result.data?.messages as IMessage[])
      : messages;
  };

  const refreshMessages = useCallback(async () => {
    setPage(0);
    await result.refetch();
  }, [result]);

  useEffect(() => {
    if (page === 0 && result.data?.messages) {
      setMessages(result.data?.messages as IMessage[]);
      setPage(page + 1);
    }
  }, [page, result.data?.messages]);

  return {
    refreshMessages,
    messages: loadMessages(),
    error: result.isError,
    loading: result.isLoading,
    success: result.isSuccess,
    hasMoreMessages:
      typeof result.data?.hasMore === 'undefined' || result.data?.hasMore,
    loadNextPage: async () => {
      setPage(page + 1);
      await result.refetch();
      setMessages([...messages, ...(result.data?.messages as IMessage[])]);
    },
  };
}
