import { hasCookie, getCookie, setCookie } from 'cookies-next';

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
  if (hasCookie('senderId')) {
    return `${getCookie('senderId')}`;
  }
  const senderId = makeId(256);
  setCookie('senderId', senderId);
  return senderId;
}
