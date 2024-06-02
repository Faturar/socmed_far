import editPost from "../posts/editPost";

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

    let comment = data.comments == null ? 0 : data.comments;

    console.log(comment)

    if (!res.ok) {
      console.log(res.message)
    } 

    if(res.ok && res.status == 201) {
      const editData = {
          userId: data.userId,
          comments: comment+1,
      }

      await editPost(data.postId, editData, token);
    }

    if(res.ok && res.status == 200) {
      const editData = {
        userId: data.userId,
        comments: comment > 0 ? comment-1 : 0,
      }

      await editPost(data.postId, editData, token);
    }
    
  
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
  
    return res.json()
}