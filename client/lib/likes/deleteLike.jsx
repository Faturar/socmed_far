export default async function deleteLike(id, token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/likes/${id}`, {
        method: "DELETE", 
        mode: "cors",
        headers: {
          'authorization': 'bearer ' + token,
          'Accept': 'application/json',
          "Content-Type": "application/json"
        },
    });

    if (!res.ok) {
        console.log(res.message)
    } 
  
    return res.json()
}