export default async function editComment(id, description, token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`, {
        method: "PUT", 
        mode: "cors",
        headers: {
          'authorization': 'bearer ' + token,
          'Accept': 'application/json',
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            description,
        }),
    });
  
    if (!res.ok) {
      console.log(res.message)
    }
  
    return res.json()
  }