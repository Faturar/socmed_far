import { getAllPosts, getPostById, createPostData, updatePostData, deletePostData } from '../models/posts.model.js'

// Get posts
export const getPosts = async (req, res) => {
    try {
        const posts = await getAllPosts();

        return res.status(200).json({
            message: "Success find all post data!",
            data: posts
        })
    } catch(err) {
        return res.status(500).send({message: "Cannot get all posts data, cause server error.", err: err})
    }
}

export const getPost = async (req, res) => {
    try {
        const id = req.params.id;

        const [ post ] = await getPostById(id);

        return res.status(200).json({
            message: "Success find post data!",
            data: post
        });
    } catch(err) {
        return res.status(500).json({message: "Cannot get post data, cause server error.", err: err})
    }
}

export const create = async (req, res) => {
    try {
        const data = req.body;

        const postId = await createPostData(data)

        const [ post ] = await getPostById(postId);

        return res.status(201).json({
            message: "Success creating post data!",
            data: post
        })
    } catch(err) {
        return res.status(500).json({message: "Cannot create post data, cause server error.", err: err})
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body

        const update = await updatePostData(id, data)

        const [ post ] = await getPostById(id)

        if(update.affectedRows != 0) {
            return res.status(200).json({
                message: "Success updating post data!",
                data: post
            });
        } else {
            return res.status(404).json({
                message: "No post data to delete!",
            });
        }
    } catch(err) {
        return res.status(500).json({message: "Cannot update post data.", err: err})
    }
}

export const deletePost = async (req, res) => {
    try {
        const id = req.params.id

        const [ post ] = await getPostById(id)

        const deleteData = await deletePostData(id)

        if(deleteData.affectedRows != 0) {
            return res.status(200).json({
                message: "Success deleting post data!",
                data: post
            });
        } else {
            return res.status(404).json({
                message: "No post data to delete!",
            });
        }
    }  catch(err) {
        return res.status(500).json({message: "Cannot delete post data, cause server error.", err: err})
    }
}