export default async function createPost(data) {
  const fd = new FormData();

  fd.append("userId", data.userId);
  fd.append("image", data.image);
  fd.append("content", data.content);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      method: "POST", 
      mode: "cors",
      headers: {
        'authorization': 'bearer ' + data.token,
        'Accept': 'application/json',
      },
      body: fd,
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json()
}