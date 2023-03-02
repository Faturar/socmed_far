import fs from 'fs'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { getAllUsers, getUserById, createUserData, updateUserData, deleteUserData } from '../models/users.model.js'

// Get users
export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();

        return res.status(200).json({
            message: "Success find all user data!",
            data: users
        })
    } catch(err) {
        return res.status(500).send({message: "Cannot get all users data.", err: err.message})
    }
}

export const getUser = async (req, res) => {
    try {
        const id = req.params.id;

        const [ user ] = await getUserById(id);

        return res.status(200).json({
            message: "Success find user data!",
            data: user
        });
    } catch(err) {
        return res.status(500).json({message: "Cannot get user data.", err: err.message})
    }
}

export const create = async (req, res) => {
    try {
        const { username, name, role, email, password, address } = req.body;

        // get image data
        const profileBg = req.files.profileBg ? req.files.profileBg[0].filename : null
        const profileImg = req.files.profileImg ? req.files.profileImg[0].filename : null

        const data = {
            profileBg, profileImg,
            username, name,
            role, email,
            password, address
        }

        const userId = await createUserData(data)

        const [ user ] = await getUserById(userId);

        return res.status(201).json({
            message: "Success creating user data!",
            data: user
        })
    } catch(err) {
        return res.status(500).json({message: "Cannot create user data.", err: err.message})
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id
        const { username, name, role, email, password, address } = req.body;

        // get old data to delete profileBg & profileImg
        const [ oldUser ] = await getUserById(id)

        // get image data
        const profileBg = req.files.profileBg ? req.files.profileBg[0].filename : oldUser.profile_bg
        const profileImg = req.files.profileImg ? req.files.profileImg[0].filename : oldUser.profile_img

        const data = {
            profileBg, profileImg,
            username, name,
            role, email,
            password, address
        }

        // Delete profileBg on storge
        if(req.files.profile_bg != null && fs.existsSync(path.join(__dirname, '../public/') + oldUser.profile_bg)) {
            fs.unlinkSync(path.join(__dirname, '../public/') + oldUser.profile_bg)
        }

        if(req.files.profile_img != null && fs.existsSync(path.join(__dirname, '../public/') + oldUser.profile_img)) {
            fs.unlinkSync(path.join(__dirname, '../public/') + oldUser.profile_img)
        }

        const update = await updateUserData(id, data)

        // updated user data
        const [ user ] = await getUserById(id)

        if(update.affectedRows != 0) {
            return res.status(200).json({
                message: "Success updating user data!",
                data: user
            });
        } else {
            return res.status(404).json({
                message: "No user data to delete!",
            });
        }
    } catch(err) {
        return res.status(500).json({message: "Cannot update user data.", err: err.message})
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id

        const [ user ] = await getUserById(id)

        const deleteData = await deleteUserData(id)

        if(deleteData.affectedRows != 0) {
            return res.status(200).json({
                message: "Success deleting user data!",
                data: user
            });
        } else {
            return res.status(404).json({
                message: "No user data to delete!",
            });
        }
    }  catch(err) {
        return res.status(500).json({message: "Cannot delete user data.", err: err.message})
    }
}