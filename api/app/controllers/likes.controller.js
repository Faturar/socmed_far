import { getAllLikes, getLikeById, getLikeByPostId, createLikeData, deleteLikeData, getCheckLiked, getLikeUser } from '../models/likes.model.js'

// Get likes
export const getLikes = async (req, res) => {
    try {
        const likes = await getAllLikes();

        return res.status(200).json({
            message: "Success get all likes data!",
            data: likes
        })
    } catch(err) {
        return res.status(500).send({message: "Cannot get all likes data.", err: err.message})
    }
}

export const getLikeByPost = async (req, res) => {
    try {
        const id = req.params.id;

        const like = await getLikeByPostId(id);

        return res.status(200).json({
            message: "Success get post likes data!",
            data: like
        })
    } catch(err) {
        return res.status(500).json({message: "Cannot get like data.", err: err.message})
    }
}

export const getUserLike = async (req, res) => {
    try {
        const id = req.params.id;

        const like = await getLikeUser(id);

        return res.status(200).json({
            message: "Success get user likes data!",
            data: like
        })
    } catch(err) {
        return res.status(500).json({message: "Cannot get like data.", err: err.message})
    }
}

export const create = async (req, res) => {
    try {
        const { userId, postId } = req.body;

        const data = { userId, postId }

        const checkLike = await getCheckLiked(userId, postId)

        if(checkLike.length > 0) {
            return res.status(200).json({
                status: false,
                message: "You already like the post!",
                like: checkLike[0]
            })
        } else {
            const likeId = await createLikeData(data)
            
            const [ like ] = await getLikeById(likeId);

            return res.status(201).json({
                status: true,
                message: "Success creating like data!",
                data: like
            })
        }
    } catch(err) {
        return res.status(500).json({message: "Cannot create like data.", err: err.message})
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