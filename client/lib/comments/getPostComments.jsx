export default async function getPostComments(id, token, limit, offset) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/post/${id}/?limit=${limit}&offset=${offset}`, {
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