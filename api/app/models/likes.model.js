import pool from '../db/connect.js'

export const getAllLikes = async () => {
    try {
        const [ rows ] = await pool.query("SELECT * FROM likes")
        return rows
    } catch(err){
        return err.message
    }
}

export const getLikeById = async (id) => {
    try {
        const [ rows ] = await pool.query("SELECT * FROM likes WHERE id = ?", [id]);
        return rows
    } catch(err) {
        return err.message
    }
}

export const createLikeData = async (data) => {
    try {
        const { userId, postId, created_at } = data;

        const [ rows ] = await pool.query("INSERT INTO likes (user_id, post_id, created_at) VALUES (?, ?, ?)", [userId, postId, created_at]);
        
        return rows.insertId
    } catch(err) {
        return err.message
    }
}

export const updateLikeData = async (id, data) => {
    try {
        const { userId, postId, created_at } = data;

        const [ rows ] = await pool.query("UPDATE likes SET user_id = ?, post_id = ?, created_at = ? WHERE id = ?", [userId, postId, id, created_at])

        return rows
    } catch(err) {
        return err.message
    }
}

export const deleteLikeData = async (id) => {
    try {
        const [ rows ] = await pool.query("DELETE FROM likes WHERE id = ?", [id])

        return rows
    } catch(err) {
        return err.message
    }
}