import fs from 'fs'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import bcrypt from 'bcrypt'

import { getAllUsers, getUserById, getUserUsername, createUserData, updateUserData, deleteUserData } from '../models/users.model.js'

// Get users
export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();

        return res.status(200).json(users)
    } catch(err) {
        return res.status(500).send({message: "Cannot get all users data.", err: err.message})
    }
}

export const getUser = async (req, res) => {
    try {
        const id = req.params.id;

        const [ user ] = await getUserById(id);

        return res.status(200).json(user);
    } catch(err) {
        return res.status(500).json({message: "Cannot get user data.", err: err.message})
    }
}

export const getUserByUsername = async (req, res) => {
    try {
        const username = req.params.username;

        const [ user ] = await getUserUsername(username);

        return res.status(200).json(user);
    } catch(err) {
        return res.status(500).json({message: "Cannot get user data.", err: err.message})
    }
}

export const create = async (req, res) => {
    try {
        const { username, name, role, email, password, address } = req.body;

        const usernameCheck = await getUserUsername(username);

        if(!usernameCheck) {
            // get image data
            const profileBg = req.files.profile_bg ? req.files.profile_bg[0].filename : null
            const profileImg = req.files.profile_img ? req.files.profile_img[0].filename : null

            const salt = await bcrypt.genSaltSync(10);
            const hashPassword = await bcrypt.hashSync(password, salt);

            const data = {
                profileBg, profileImg,
                username, name,
                role, email,
                password: hashPassword,
                address
            }

            const userId = await createUserData(data)

            const [ user ] = await getUserById(userId);

            return res.status(201).json({
                message: "Success creating user data!",
                data: user
            })
        } else {
            return res.status(404).json({
                message: "Username exist, please change!",
            })
        }
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

        const usernameCheck = await getUserUsername(username);

        if(!usernameCheck){
            if(oldUser) {
                // get image data
                const profileBg = req.files.profile_bg ? req.files.profile_bg[0].filename : oldUser.profile_bg
                const profileImg = req.files.profile_img ? req.files.profile_img[0].filename : oldUser.profile_img

                const data = {
                    profileBg, profileImg,
                    username, name,
                    role, email,
                    password, address, 
                    created_at: oldUser.created_at
                }

                // Delete profileBg on storge
                if(req.files.profile_bg && fs.existsSync(path.join(__dirname, '../public/') + oldUser.profile_bg)) {
                    fs.unlinkSync(path.join(__dirname, '../public/') + oldUser.profile_bg)
                }

                if(req.files.profile_img && fs.existsSync(path.join(__dirname, '../public/') + oldUser.profile_img)) {
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
                        message: "No user data to update!",
                    });
                }
            } else {
                return res.status(404).json({
                    message: "User don't exist!",
                });
            }
        } else {
            return res.status(400).json({
                message: "Username exist!",
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