export default async function getAllPosts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, { 
      cache: 'no-store' 
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
  
    return res.json()
}