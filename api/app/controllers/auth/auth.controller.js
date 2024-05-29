import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { getUserById, getUserUsername, getUserEmail, createUserData } from '../../models/users.model.js'

export const tokenCheck = async (req, res) => {
    return res.status(200).json({
        status: true,
        message: 'Token verified'
    })
}

export const register = async (req, res) => {
    const { username, name, email, password } = req.body;

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
            profileBg: 'default_bg.png',
            profileImg: 'default.png',
            username, name, 
            email, password: hashPassword, 
            role: '',
            address: ''
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
            user,
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

        const userData = {
            id: user.id,
            profileBg: user.profile_bg,
            profileImg: user.profile_img,
            username: user.username,
            name: user.name,
            role: user.role,
            email: user.email,
        }

        return res.status(200).json({
            status: true,
            message: "Login success!",
            user: userData,
            token
        });
    } catch (err) {
        return res.status(500).json({ message: "Error logging in", err: err.message });
    }
}

export const forgotPasswod = async (req, res) => {
    try {
        const { email } = req.body;
    
        // Check if the user exists
        const user = await getUserEmail(email);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Generate a reset token
        const resetToken = user.generateResetToken();
    
        // Send the reset email
        await sendPasswordResetEmail(email, resetToken);
    
        res.status(200).json({ message: 'Reset email sent' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}