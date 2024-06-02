export default async function deleteComments(id, token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`, {
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