import fs from 'fs'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url';
import { getAllPosts, getPostById, createPostData, updatePostData, deletePostData } from '../models/posts.model.js'
import { deletePostLikes, getLikeByPostId } from '../models/likes.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get posts
export const getPosts = async (req, res) => {
    try {
        const posts = await getAllPosts();

        return res.status(200).json({
            message: "Success get all posts data!",
            data: posts
        })
    } catch(err) {
        return res.status(500).send({
            message: "Cannot get all posts data.", 
            err: err.message
        })
    }
}

export const getPost = async (req, res) => {
    try {
        const id = req.params.id;

        const [ post ] = await getPostById(id);

        return res.status(200).json({
            message: "Success get post data!",
            data: post
        })
    } catch(err) {
        return res.status(500).json({
            message: "Cannot get post data.", err: err.message
        })
    }
}

export const create = async (req, res) => {
    try {
        const { userId, content } = req.body;

        const image = req.file ? req.file.filename : null;
        
        const data = {
            userId,
            image,
            content,
        }

        const postId = await createPostData(data)
        const [ post ] = await getPostById(postId);

        return res.status(201).json({
            message: "Success creating post data!",
            data: post,
        })
    } catch(err) {
        return res.status(500).json({
            message: "Cannot create post data.", 
            err: err.message
        })
    }
}

export const update = async (req, res) => {
    try {
        // get id from params
        const id = req.params.id

        // get body data
        const { userId, content, likes, comments, shares } = req.body;

        // get old data to delete image
        const [ oldPost ] = await getPostById(id)

        // get image data
        const image = req.file ? req.file.filename : oldPost.image

        // Delete image on storge
        if(req.file != null && fs.existsSync(path.join(__dirname, '../../public/') + oldPost.image)) {
            fs.unlinkSync(path.join(__dirname, '../../public/') + oldPost.image)
        }
        
        const oldLikes = oldPost.likes != null ? oldPost.likes : 0;
        const oldComments = oldPost.comments != null ? oldPost.comments : 0;
        const oldShares = oldPost.shares != null ? oldPost.shares : 0;

        // init data to update
        const data = { 
            userId, 
            image,
            content: content && content != 'null' ? content : oldPost.content,
            likes: likes && likes != 'null' ? likes : oldLikes,
            comments: comments && comments != 'null' ? comments : oldComments,
            shares: shares &&shares != 'null' ? shares : oldShares,
            created_at: oldPost.created_at,
        }

        // update post data
        const update = await updatePostData(id, data)

        // get updated post data
        const [ post ] = await getPostById(id)

        // success updating data
        if(update.affectedRows != 0) {
            return res.status(200).json({
                message: "Success updating post data!",
                data: post
            });
        // no post data
        } else {
            return res.status(404).json({
                message: "No post data to update!",
            });
        }
    } catch(err) {
        return res.status(500).json({
            message: "Cannot update post data.", 
            err: err.message
        })
    }
}

export const deletePost = async (req, res) => {
    try {
        const id = req.params.id

        const [ post ] = await getPostById(id)

        const deleteData = await deletePostData(id)

        if(fs.existsSync(path.join(__dirname, '../../public/') + post.image)) {
            fs.unlinkSync(path.join(__dirname, '../../public/') + post.image)
        }

        if(deleteData.affectedRows != 0) {
            await deletePostLikes(id)

            return res.status(200).json({
                message: "Success deleting post data!",
                data: post,
            });
        } else {
            return res.status(404).json({
                message: "No post data to delete!",
            });
        }
    }  catch(err) {
        return res.status(500).json({
            message: "Cannot delete post data.", 
            err: err.message
        })
    }
}