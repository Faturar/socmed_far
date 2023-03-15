import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { getUserById, getUserUsername, createUserData } from '../../models/users.model.js'

export const register = async (req, res) => {
    try {
        const { username, name, role, email, password, address } = req.body;

        const usernameCheck = await getUserUsername(username);

        if(!usernameCheck) {
            // get image data
            const profileBg = req.files.profile_bg ? req.files.profile_bg[0].filename : null
            const profileImg = req.files.profile_img ? req.files.profile_img[0].filename : null

            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);

            const data = {
                profileBg, profileImg,
                username, name,
                role, email,
                password: hashPassword, 
                address
            }

            const userId = await createUserData(data)

            const [ user ] = await getUserById(userId);

            const token = jwt.sign({
                data: {
                    username: user.username,
                    name: user.name,
                    role: user.role
                }
              }, process.env.JWT_SECRET, { expiresIn: '12h' });

            return res.status(201).json({
                status: true,
                message: "Success creating user data!",
                token: token
            })
        } else {
            return res.status(201).json({
                status: false,
                message: "Username has been registered!",
            })
        }
    } catch(err) {
        return res.status(500).json({message: "Cannot create user data.", err: err.message})
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await getUserUsername(username);

        if(user && user.length != 0) {
            const passwordCheck = bcrypt.compareSync(password, user.password);
            
            if(passwordCheck) {
                const token = jwt.sign({
                    data: {
                        username: user.username,
                        name: user.name,
                        role: user.role
                    }
                }, process.env.JWT_SECRET, { expiresIn: '12h' });

                return res.status(200).json({
                    status: true,
                    message: "Login success!",
                    token: token
                })
            } else {
                return res.status(403).json({
                    status: false,
                    message: "Wrong password!",
                })
            }
        } else {
            return res.status(404).json({
                status: false,
                message: "User not found!",
            })
        }
    } catch(err) {
        return res.status(500).json({message: "Cannot login.", err: err.message})
    }
}