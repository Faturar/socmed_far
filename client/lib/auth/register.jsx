export default async function registerRequest(data) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: data.username,
          name: data.name,
          email: data.email,
          password: data.password
        })
      });

      console.log(res)
  
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
  
      return res.json()
    } catch (error) {
      throw error;
    }
  }