import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { getUserById, getUserUsername, getUserEmail, createUserData } from '../../models/users.model.js'

export const register = async (req, res) => {
    const { username, name, role, email, password, address } = req.body;

    try {
        const usernameExists = await getUserUsername(username);
        const emailExists = await getUserEmail(email);

        if (usernameExists || emailExists) {
            return res.status(409).json({
                status: false,
                message: usernameExists ? "Username has been registered!" : "Email has been registered!",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const data = {
            profileBg: req.files.profile_bg ? req.files.profile_bg[0].filename : null,
            profileImg: req.files.profile_img ? req.files.profile_img[0].filename : null,
            username, name, role, email, password: hashPassword, address
        };

        const userId = await createUserData(data);
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
            token
        });
    } catch(err) {
        return res.status(500).json({message: "Cannot create user data.", err: err.message});
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await getUserUsername(username);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({
            data: {
                username: user.username,
                name: user.name,
                role: user.role,
            },
        }, process.env.JWT_SECRET, { expiresIn: "12h" });

        return res.status(200).json({
            status: true,
            message: "Login success!",
            token,
        });
    } catch (err) {
        return res.status(500).json({ message: "Error logging in", err: err.message });
    }
}
