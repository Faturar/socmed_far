import pool from '../db/connect.js'

export const getAllComments = async () => {
    try {
        const [ rows ] = await pool.query("SELECT * FROM comments")
        return rows
    } catch(err){
        return err.message
    }
}

export const getCommentById = async (id) => {
    try {
        const [ rows ] = await pool.query(`SELECT comments.*, users.username, users.name 
        FROM comments 
        JOIN users ON comments.user_id = users.id 
        WHERE comments.id = ?`, [id]);
        return rows
    } catch(err) {
        return err.message
    }
}

export const getPostComments = async (id, limit, offset) => {
    try {
        const [ rows ] = await pool.query(`
            SELECT c.id, c.user_id, c.post_id, c.description, u.username, u.name, u.role, u.profile_bg, u.profile_img 
            FROM comments c
            LEFT JOIN users u ON c.user_id = u.id
            WHERE c.post_id = ? 
            ORDER BY c.created_at DESC
            LIMIT ? 
            OFFSET ?
        `, [id, limit, offset]);

        return rows
    } catch(err) {
        return err.message
    }
}

export const createCommentData = async (data) => {
    try {
        const { userId, postId, description } = data;

        const [ rows ] = await pool.query("INSERT INTO comments (user_id, post_id, description, created_at) VALUES (?, ?, ?, NOW())", [userId, postId, description]);

        return rows.insertId
    } catch(err) {
        return err.message
    }
}

export const updateCommentData = async (id, data) => {
    try {
        const { userId, postId, description } = data;

        const [ rows ] = await pool.query("UPDATE comments SET user_id = ?, post_id = ?, description = ? WHERE id = ?", [userId, postId, description, id])

        return rows
    } catch(err) {
        return err.message
    }
}

export const deleteCommentData = async (id) => {
    try {
        const [ rows ] = await pool.query("DELETE FROM comments WHERE id = ?", [id])

        return rows
    } catch(err) {
        return err.message
    }
}