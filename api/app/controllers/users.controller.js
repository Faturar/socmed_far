import fs from 'fs'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import bcrypt from 'bcrypt'

import { getAllUsers, getUserById, getUserUsername, getUserEmail, createUserData, updateUserData, deleteUserData, getUserRecomendation } from '../models/users.model.js'

// Get users
export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();

        return res.status(200).json({
            message: "Success get all users data!",
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
            message: "Success get user data!",
            data: user
        })
    } catch(err) {
        return res.status(500).json({message: "Cannot get user data.", err: err.message})
    }
}

// export const getUserByUsername = async (req, res) => {
//     try {
//         const username = req.params.username;

//         const [ user ] = await getUserUsername(username);

//         return res.status(200).json({
//             message: "Success get all user data!",
//             data: user
//         })
//     } catch(err) {
//         return res.status(500).json({message: "Cannot get user data.", err: err.message})
//     }
// }

export const getUserRecomendations = async (req, res) => {
    try {
        const users = await getUserRecomendation();

        return res.status(200).json({
            message: "Success get all user recomendation data!",
            data: users
        })
    } catch(err) {
        return res.status(500).json({message: "Cannot get user data.", err: err.message})
    }
}


export const create = async (req, res) => {    
    try {
        const { username, name, role, email, password, address } = req.body;

        const usernameExists = await getUserUsername(username);
        const emailExists = await getUserEmail(email);

        if (usernameExists || emailExists) {
            return res.status(409).json({
                status: false,
                message: usernameExists ? "Username exist, please change!" : "Email has been exist, please change!",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const data = {
            profileBg: req.files.profile_bg ? req.files.profile_bg[0].filename : 'default_bg.png',
            profileImg: req.files.profile_img ? req.files.profile_img[0].filename : 'default.png',
            username, name, role, email, password: hashPassword, address
        };


        const userId = await createUserData(data)
        const [ createdUser ] = await getUserById(userId);

        return res.status(201).json({
            message: "Success creating user data!",
            data: createdUser
        })
    } catch(err) {
        return res.status(500).json({message: "Cannot create user data.", err: err.message})
    }
}

export const update = async (req, res) => {
    const { username, name, role, email, password, address } = req.body;
    const id = req.params.id

    try {
        const [oldUser] = await getUserById(id);
        const usernameExists = await getUserUsername(username);
        const emailExists = await getUserEmail(email);
        
        if (usernameExists && usernameExists.id != id  || emailExists && emailExists.id != id) {
            return res.status(409).json({
                status: false,
                message: usernameExists ? "Username exist, please change!" : "Email has been exist, please change!",
            });
        }

        const salt = await bcrypt.genSalt(10);

        const data = {
            profileBg: req.files.profile_bg ? req.files.profile_bg[0].filename : oldUser.profile_bg,
            profileImg: req.files.profile_img ? req.files.profile_img[0].filename : oldUser.profile_img,
            username: username ? username : oldUser.username, 
            name: name ? name : oldUser.name, 
            role: role ? role : oldUser.role, 
            email: email ? email : oldUser.email,
            password: password ? await bcrypt.hash(password, salt) : oldUser.password, 
            address: address ? address : oldUser.address,
            created_at: oldUser.created_at
        };

        // Delete image on storge
        if(req.files.profile_bg != null && fs.existsSync(path.join(__dirname, '../../public/') + oldUser.profile_bg)) {
            fs.unlinkSync(path.join(__dirname, '../../public/') + oldUser.profile_bg)
        }

        if(req.files.profile_img != null && fs.existsSync(path.join(__dirname, '../../public/') + oldUser.profile_img)) {
            fs.unlinkSync(path.join(__dirname, '../../public/') + oldUser.profile_img)
        }

        const update = await updateUserData(id, data);

        if (update.changedRows !== 0) {
            const [updatedUser] = await getUserById(id);
            return res.status(200).json({ 
                message: "Success updating user data!", 
                data: updatedUser 
            });
        }
    } catch (err) {
        return res.status(500).json({ message: "Cannot update user data.", err: err.message });
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