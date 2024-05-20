// Lib
import getAllPosts from '@/lib/posts/getAllPosts'

// Components
import PostItem from './PostItem'

export default async function Posts() {
  const posts = await getAllPosts();

  return posts.map((item, index) => (
      <PostItem post={item} key={index} />
    )
  );
}
