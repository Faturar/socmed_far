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
        const { userId, postId } = data;

        const [ rows ] = await pool.query("INSERT INTO likes (user_id, post_id) VALUES (?, ?)", [userId, postId]);
        
        return rows.insertId
    } catch(err) {
        return err.message
    }
}

export const updateLikeData = async (id, data) => {
    try {
        const { userId, postId } = data;

        const [ rows ] = await pool.query("UPDATE likes SET user_id = ?, post_id = ? WHERE id = ?", [userId, postId, id])

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