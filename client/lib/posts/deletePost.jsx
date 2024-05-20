export default async function deletePost(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
        method: "DELETE", 
        mode: "cors",
        headers: {
          'authorization': 'bearer ' + data.token,
        },
    });
  
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
  
    return res.json()
}