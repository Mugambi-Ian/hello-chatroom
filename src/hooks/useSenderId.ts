import { useEffect, useState } from 'react';

import { getSenderId } from '@/utils/getSenderId';

export function useSenderId() {
  const [senderId, setSenderId] = useState('');

  useEffect(() => {
    setSenderId(getSenderId());
  });

  return senderId;
}
