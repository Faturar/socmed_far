export default async function createComment(data, token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
        method: "POST", 
        mode: "cors",
        headers: {
          'authorization': 'bearer ' + token,
          'Accept': 'application/json',
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: data.userId,
            postId: data.postId,
            description: data.description
        }),
    });
    
  
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
  
    return res.json()
}