// Components
import PostItem from './PostItem'

export default function Posts({posts, setPosts, userLikes,  getUserLikes, getData}) {  
  if(Array.isArray(posts) && posts.length > 0) {
    return posts.map((item, index) => (
      <PostItem post={item} setPosts={setPosts} userLikes={userLikes} getUserLikes={getUserLikes} getData={getData} key={index} />
    ));
  } else {
    return (
      <div>
        No Post Available
      </div>
    )
  }
}
