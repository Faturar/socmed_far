import { createFollowData, deleteFollowData, getAllFollows, getCheckFollow, getFollowById, getFollowByUserId } from "../models/follow.model.js";
import { getUserById, updateUserData } from "../models/users.model.js";

// Get follows
export const getFollows = async (req, res) => {
    try {
        const follows = await getAllFollows();

        return res.status(200).json({
            message: "Success get all follows data!",
            data: follows
        })
    } catch(err) {
        return res.status(500).send({message: "Cannot get all follows data.", err: err.message})
    }
}

export const getFollow = async (req, res) => {
    try {
        const id = req.params.id;

        const follow = await getFollowById(id);

        return res.status(200).json({
            message: "Success get follow data!",
            data: follow
        })
    } catch(err) {
        return res.status(500).json({message: "Cannot get follow data.", err: err.message})
    }
}

export const getFollowByUser = async (req, res) => {
    try {
        const id = req.params.id;

        const follow = await getFollowByUserId(id);

        return res.status(200).json({
            message: "Success get user follows data!",
            data: follow
        })
    } catch(err) {
        return res.status(500).json({message: "Cannot get follow data.", err: err.message})
    }
}

export const create = async (req, res) => {
    try {
        const { userId, userFollowedId } = req.body;

        if(userId === userFollowedId) {
            return res.status(400).json({
                message: "You cannot follow yourself!",
            });
        }

        const [ user ] = await getUserById(userFollowedId);

        const checkFollow = await getCheckFollow(userId, userFollowedId);

        if(user) {
            if (checkFollow.length > 0) {
                await deleteFollowData(checkFollow[0].id);
                user.followers = user.followers != null ? user.followers-1 : 0;
            } else {
                await createFollowData(userId, userFollowedId);
                user.followers = user.followers != null ? user.followers+1 : 1;
            }
        } else {
            return res.status(404).json({
                message: "User not found!",
            });
        }

        await updateUserData(userFollowedId, user);

        return res.status(200).json({
            status: Boolean(checkFollow),
            message: checkFollow.length > 0 ? "You already follow this user!" : "Success creating follow data!",
        });
    } catch(err) {
        return res.status(500).json({message: "Cannot create follow data.", err: err.message})
    }
}

export const deleteFollow = async (req, res) => {
    try {
        const id = req.params.id

        const [ follow ] = await getFollowById(id)

        const deleteData = await deleteFollowData(id)

        if(deleteData.affectedRows != 0) {
            // updating user followers
            const [ user ] = await getUserById(follow.user_followed_id);

            user.followers = user.followers != null ? user.followers-1 : 0;

            await updateUserData(follow.user_followed_id, user);

            return res.status(200).json({
                message: "Success deleting follow data!",
                data: follow
            });
        } else {
            return res.status(404).json({
                message: "No follow data to delete!",
            });
        }
    }  catch(err) {
        return res.status(500).json({message: "Cannot delete follow data.", err: err.message})
    }
}