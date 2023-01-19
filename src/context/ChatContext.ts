import { createContext } from 'react';

import { IMessage } from '@/shared/message';

export interface IChatContext {
  error: boolean;
  messages: IMessage[];
  refreshMessages: () => boolean | Promise<void>;
  hasMoreMessages: boolean | undefined;
  loadPreviousPage: () => boolean | Promise<void>;
  fetching: boolean;
  setFetching: (b: boolean) => void;
  resetCursor: () => void;
}

export const ChatContext = createContext<IChatContext>({
  error: false,
  messages: [],
  fetching: false,
  hasMoreMessages: false,
  refreshMessages: () => false,
  loadPreviousPage: () => false,
  resetCursor: () => false,
  setFetching: (b: boolean) => b,
});
