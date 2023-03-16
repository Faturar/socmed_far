export default async function createPost(data) {
    const fd = new FormData();

    fd.append("userId", 1);
    fd.append("image", data.image);
    fd.append("content", data.content);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        method: "POST", 
        mode: "cors",
        headers: {
          'Accept': 'application/json',
        },
        body: fd,
    });
  
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
  
    return res.json()
}