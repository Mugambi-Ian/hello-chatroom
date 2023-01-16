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
