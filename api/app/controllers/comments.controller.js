import { getAllComments, getCommentById, createCommentData, updateCommentData, deleteCommentData, getPostComments } from '../models/comments.model.js'
import { getPostById, updatePostData } from '../models/posts.model.js';

// Get comments
export const getComments = async (req, res) => {
    try {
        const comments = await getAllComments();

        return res.status(200).json({
            message: "Success get all comments data!",
            data: comments
        })
    } catch(err) {
        return res.status(500).send({message: "Cannot get all comments data.", err: err.message})
    }
}

export const getComment = async (req, res) => {
    try {
        const id = req.params.id;

        const [ comment ] = await getCommentById(id);

        return res.status(200).json({
            message: "Success get comment data!",
            data: comment
        })
    } catch(err) {
        return res.status(500).json({message: "Cannot get comment data.", err: err.message})
    }
}

export const getCommentPost = async (req, res) => {
    try {
        const id = req.params.id;
        const {limit, offset} = req.query;

        const comments = await getPostComments(id, parseInt(limit), parseInt(offset));

        return res.status(200).json({
            message: "Success get comment data!",
            data: comments
        })
    } catch(err) {
        return res.status(500).json({message: "Cannot get comment data.", err: err.message})
    }
}

export const create = async (req, res) => {
    try {
        const { userId, postId, description } = req.body;

        const data = { userId, postId, description }

        const commentId = await createCommentData(data)

        const [ comment ] = await getCommentById(commentId);

        const [post] = await getPostById(postId);

        post.userId = post.user_id;
        post.comments = post.comments+1;

        await updatePostData(post.id, post);

        return res.status(201).json({
            message: "Success creating comment data!",
            data: comment
        })
    } catch(err) {
        return res.status(500).json({message: "Cannot create comment data.", err: err.message})
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id
        const { description } = req.body;

        // updated comment data
        const [ comment ] = await getCommentById(id)

        const data = { userId: comment.user_id, postId: comment.post_id, description }

        const update = await updateCommentData(id, data)
        
        if(update.affectedRows != 0) {
            return res.status(200).json({
                message: "Success updating comment data!",
                data: comment
            });
        } else {
            return res.status(404).json({
                message: "No comment data to delete!",
            });
        }
    } catch(err) {
        return res.status(500).json({message: "Cannot update comment data.", err: err.message})
    }
}

export const deleteComment = async (req, res) => {
    try {
        const id = req.params.id

        const [ comment ] = await getCommentById(id)
        const [post] = await getPostById(comment.post_id);

        const deleteData = await deleteCommentData(id)

        post.userId = post.user_id;

        if(post.comments >= 1) {
            post.comments--;
        }

        await updatePostData(post.id, post);

        if(deleteData.affectedRows != 0) {
            return res.status(200).json({
                message: "Success deleting comment data!",
                data: comment
            });
        } else {
            return res.status(404).json({
                message: "No comment data to delete!",
            });
        }
    }  catch(err) {
        return res.status(500).json({message: "Cannot delete comment data.", err: err.message})
    }
}