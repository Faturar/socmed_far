export default async function editPost(id, data) {
    const fd = new FormData();

    fd.append("userId", 1);
    fd.append("image", data.image);
    fd.append("content", data.content);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
        method: "PUT", 
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