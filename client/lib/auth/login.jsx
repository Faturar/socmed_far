export default async function loginRequest(data) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password
      })
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json()
  } catch (error) {
    throw error;
  }
}