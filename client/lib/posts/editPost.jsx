export default async function editPost(id, data, token) {
    const fd = new FormData();

    fd.append("userId", data.userId);
    fd.append("image", data.image);
    fd.append("content", data.content);
    fd.append("likes", data.likes);
    fd.append("comments", data.comments ? data.comments : null);
    fd.append("shares", data.shares ? data.shares : null);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
        method: "PUT", 
        mode: "cors",
        headers: {
          'authorization': 'bearer ' + token,
          'Accept': 'application/json',
        },
        body: fd,
    });

    if (!res.ok) {
      console.log(res.message)
    }
  
    return res.json()
}