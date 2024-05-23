import editPost from "../posts/editPost";

export default async function createLike(data, token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/likes`, {
        method: "POST", 
        mode: "cors",
        headers: {
          'authorization': 'bearer ' + token,
          'Accept': 'application/json',
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: data.userId,
            postId: data.postId
        })
    });

    let like = data.likes == null ? 0 : data.likes;

    if (!res.ok) {
      console.log(res.message)
    } 

    if(res.ok && res.status == 201) {
      const editData = {
          userId: data.userId,
          likes: like+1,
      }

      await editPost(data.postId, editData, token);
    }

    if(res.ok && res.status == 200) {
      const editData = {
        userId: data.userId,
        likes: like > 0 ? like-1 : 0,
      }

      await editPost(data.postId, editData, token);
    }

    return res.json()
}