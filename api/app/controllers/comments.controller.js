import { getAllComments, getCommentById, createCommentData, updateCommentData, deleteCommentData } from '../models/comments.model.js'

// Get comments
export const getComments = async (req, res) => {
    try {
        const comments = await getAllComments();

        return res.status(200).json(comments)
    } catch(err) {
        return res.status(500).send({message: "Cannot get all comments data.", err: err.message})
    }
}

export const getComment = async (req, res) => {
    try {
        const id = req.params.id;

        const [ comment ] = await getCommentById(id);

        return res.status(200).json(comment);
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
        const { userId, postId, description } = req.body;

        const data = { userId, postId, description }

        const update = await updateCommentData(id, data)

        // updated comment data
        const [ comment ] = await getCommentById(id)

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

        const deleteData = await deleteCommentData(id)

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