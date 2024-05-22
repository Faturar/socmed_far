import { getAllLikes, getLikeById, getLikeByPostId, createLikeData, updateLikeData, deleteLikeData } from '../models/likes.model.js'

// Get likes
export const getLikes = async (req, res) => {
    try {
        const likes = await getAllLikes();

        return res.status(200).json(likes)
    } catch(err) {
        return res.status(500).send({message: "Cannot get all likes data.", err: err.message})
    }
}



export const getLikeByPost = async (req, res) => {
    try {
        const id = req.params.id;

        const [ like ] = await getLikeByPostId(id);

        return res.status(200).json(like);
    } catch(err) {
        return res.status(500).json({message: "Cannot get like data.", err: err.message})
    }
}

export const create = async (req, res) => {
    try {
        const { userId, postId } = req.body;

        const data = { userId, postId }

        const likeId = await createLikeData(data)

        const [ like ] = await getLikeById(likeId);

        return res.status(201).json({
            message: "Success creating like data!",
            data: like
        })
    } catch(err) {
        return res.status(500).json({message: "Cannot create like data.", err: err.message})
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id
        const { userId, postId } = req.body;

        const data = { userId, postId }

        const update = await updateLikeData(id, data)

        // updated like data
        const [ like ] = await getLikeById(id)

        if(update.affectedRows != 0) {
            return res.status(200).json({
                message: "Success updating like data!",
                data: like
            });
        } else {
            return res.status(404).json({
                message: "No like data to delete!",
            });
        }
    } catch(err) {
        return res.status(500).json({message: "Cannot update like data.", err: err.message})
    }
}

export const deleteLike = async (req, res) => {
    try {
        const id = req.params.id

        const [ like ] = await getLikeById(id)

        const deleteData = await deleteLikeData(id)

        if(deleteData.affectedRows != 0) {
            return res.status(200).json({
                message: "Success deleting like data!",
                data: like
            });
        } else {
            return res.status(404).json({
                message: "No like data to delete!",
            });
        }
    }  catch(err) {
        return res.status(500).json({message: "Cannot delete like data.", err: err.message})
    }
}