export default async function getAllUserRecomendations(token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/recomendations`, { 
      method: "GET", 
      mode: "cors",
      headers: {
        'authorization': 'bearer ' + token,
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
  
    return res.json()
}