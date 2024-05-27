export default async function getAllUserLikes(id, token) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/likes/user/${id}`, {
    method: "GET", 
    mode: "cors",
    headers: {
      'authorization': 'bearer ' + token,
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json()
}