// Components
import PostItem from './PostItem'

export default function Posts({posts, setPosts, userLikes,  getUserLikes, getData}) {
  return posts.map((item, index) => (
      <PostItem post={item} setPosts={setPosts} userLikes={userLikes} getUserLikes={getUserLikes} getData={getData} key={item.id} />
    )
  );
}
