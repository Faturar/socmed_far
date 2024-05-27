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

export const getLikeByPostId = async (id) => {
    try {
        const [rows] = await pool.query("SELECT * FROM likes WHERE post_id = ?", [id]);
        return rows
    } catch(err) {
        return err.message
    }
}

export const getLikeUser = async (id) => {
    try {
        console.log(id)
        const [rows] = await pool.query("SELECT post_id FROM likes WHERE user_id = ?", [id]);
        return rows;
    } catch(err) {
        throw err;
    }
}

export const getCheckLiked = async (userId, postId) => {
    try {
        const [rows] = await pool.query("SELECT * FROM likes WHERE post_id = ? AND user_id = ?", [postId, userId]);

        return rows
    } catch(err) {
        return err.message
    }
}

export const createLikeData = async (data) => {
    try {
        const { userId, postId } = data;

        const [ rows ] = await pool.query("INSERT INTO likes (user_id, post_id, created_at) VALUES (?, ?, CURRENT_TIMESTAMP)", [userId, postId]);

        
    
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

export const deletePostLikes = async (id) => {
    try {
        const [rows] = await pool.query("DELETE FROM likes WHERE post_id = ?", [id]);
        return rows
    } catch(err) {
        return err.message
    }
}