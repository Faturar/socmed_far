export default async function createFollow(data, token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/follows`, {
        method: "POST", 
        mode: "cors",
        headers: {
          'authorization': 'bearer ' + token,
          'Accept': 'application/json',
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: data.userId,
            userFollowedId: data.userFollowedId
        })
    });

    return res.json()
}