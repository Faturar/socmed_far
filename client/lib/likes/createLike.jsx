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
    
    console.log(res)

    return res.json()
}