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

export const getUserUsername = async (username) => {
    try {
        const [ rows ] = await pool.query("SELECT * FROM users WHERE username = ?", [username])
        
        return rows[0]
    } catch(err) {
        return err.message
    }
}

export const createUserData = async (data) => {
    try {
        const { profileBg, profileImg, username, name, role, email, password, address } = data;

        const [ rows ] = await pool.query("INSERT INTO users (profile_bg, profile_img, username, name, role, email, password, address, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)", [profileBg, profileImg, username, name, role, email, password, address]);
        
        return rows.insertId
    } catch(err) {
        return err.message
    }
}

export const updateUserData = async (id, data) => {
    try {
        const { profileBg, profileImg, username, name, role, email, password, address, created_at } = data;

        const [ rows ] = await pool.query("UPDATE users SET profile_bg = ?, profile_img = ?, username = ?, name = ?, role = ?, email = ?, password = ?, address = ?, created_at = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", [profileBg, profileImg, username, name, role, email, password, address, created_at, id])

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