import pool from '../db/connect.js'

export const getAllUsers = async () => {
    try {
        const [ rows ] = await pool.query("SELECT * FROM users")
        return rows
    } catch(err){
        return err.message
    }
}

export const getUserById = async (id) => {
    try {
        const [ rows ] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
        return rows
    } catch(err) {
        return err.message
    }
}

export const createUserData = async (data) => {
    try {
        const { profileBg, profileImg, username, name, role, email, password, address } = data;

        const [ rows ] = await pool.query("INSERT INTO users (profile_bg, profile_img, username, name, role, email, password, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [profileBg, profileImg, username, name, role, email, password, address]);
        
        return rows.insertId
    } catch(err) {
        return err.message
    }
}

export const updateUserData = async (id, data) => {
    try {
        const { profileBg, profileImg, username, name, role, email, password, address } = data;

        const [ rows ] = await pool.query("UPDATE users SET profile_bg = ?, profile_img = ?, username = ?, name = ?, role = ?, email = ?, password = ?, address = ? WHERE id = ?", [profileBg, profileImg, username, name, role, email, password, address, id])

        return rows
    } catch(err) {post
        return err.message
    }
}

export const deleteUserData = async (id) => {
    try {
        const [ rows ] = await pool.query("DELETE FROM users WHERE id = ?", [id])

        return rows
    } catch(err) {
        return err.message
    }
}