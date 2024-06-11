import pool from '../db/connect.js'

export const getAllFollows = async () => {
    try {
        const [ rows ] = await pool.query("SELECT * FROM follows")
        return rows
    } catch(err){
        return err.message
    }
}

export const getFollowById = async (id) => {
    try {
        const [ rows ] = await pool.query("SELECT * FROM follows WHERE id = ?", [id]);
        return rows
    } catch(err) {
        return err.message
    }
}

export const getFollowByUserId = async (id) => {
    try {
        const [rows] = await pool.query("SELECT * FROM follows WHERE user_id = ?", [id]);
        return rows
    } catch(err) {
        return err.message
    }
}

export const getCheckFollow = async (userId, userFollowedId) => {
    try {
        const [ rows ] = await pool.query("SELECT * FROM follows WHERE user_id = ? AND user_followed_id = ?", [userId, userFollowedId]);
        return rows
    } catch(err) {
        return err.message
    }
}

export const createFollowData = async (userId, userFollowedId) => {
    try {
        const [ rows ] = await pool.query("INSERT INTO follows (user_id, user_followed_id, created_at) VALUES (?, ?, CURRENT_TIMESTAMP)", [userId, userFollowedId]);

        return rows
    } catch(err) {
        return err.message
    }
}

export const deleteFollowData = async (id) => {
    try {
        const [ rows ] = await pool.query("DELETE FROM follows WHERE id = ?", [id])

        return rows
    } catch(err) {
        return err.message
    }
}