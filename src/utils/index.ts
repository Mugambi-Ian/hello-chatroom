export const PAGE_SIZE = 10;

export function timeSince(date: Date) {
  // @ts-ignore
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return `${Math.floor(interval)} years`;

  interval = seconds / 2592000;
  if (interval > 1) return `${Math.floor(interval)} months`;

  interval = seconds / 86400;
  if (interval > 1) return `${Math.floor(interval)} days`;

  interval = seconds / 3600;
  if (interval > 1) return `${Math.floor(interval)} hours`;

  interval = seconds / 60;
  if (interval > 1) return `${Math.floor(interval)} minutes`;

  return `${Math.floor(seconds)} seconds`;
}

function makeId(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function getSenderId() {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('senderId')) {
      return `${localStorage.getItem('senderId')}`;
    }
    const senderId = makeId(128);
    localStorage.setItem('senderId', senderId);
    return senderId;
  }
  return '';
}
