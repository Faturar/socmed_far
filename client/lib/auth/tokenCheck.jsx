export default async function tokenCheck(token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/tokenCheck/`, {
      method: "GET", 
      mode: "cors",
      headers: {
        'authorization': 'bearer ' + token,
        'Accept': 'application/json',
      },
    });

    if(res.status == 403) {
      return {
        status: false,
        message: 'Invalid Token'
      }
    }
  
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
  
    return res.json()
}