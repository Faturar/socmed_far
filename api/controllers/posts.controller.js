import { getPosts } from '../models/posts.model.js'

// Get posts
export const getAllPosts = async (req, res) => {
    const posts = await getPosts();

    return res.json(posts)
}