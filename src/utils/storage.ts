export async function uploadImage(file: File) {
  const { name, type } = file;
  const response = await fetch('/api/s3/getSignedUrl', {
    method: 'POST',
    body: JSON.stringify({ name, type }),
    headers: { 'content-type': 'application/json' },
  });
  // Fetching out an URL
  const data = await response.json();
  await fetch(data.url, {
    headers: {
      'Content-type': file.type,
      'Access-Control-Allow-Origin': '*',
    },
    method: 'PUT',
    body: file,
  });
  return `https://hello-chatroom.s3.amazonaws.com/${file.name}`;
}
