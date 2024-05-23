"use client"

// Lib
import getAllPosts from '@/lib/posts/getAllPosts'

// Components
import PostItem from './PostItem'
import { useContext, useEffect } from 'react';
import { TokenContext } from '../TokenContext';

export default function Posts() {
  const {posts, setPosts, setLoading} = useContext(TokenContext)

  const getData = async () => {
    const res = await getAllPosts();

    setPosts(res)

    setLoading(false);
  }

  useEffect(() => {
    setLoading(true)

    getData()
  }, [])

  return posts.map((item, index) => (
      <PostItem post={item} key={index} />
    )
  );
}
