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
        const [ rows ] = await pool.query("SELECT * FROM comments WHERE id = ?", [id]);
        return rows
    } catch(err) {
        return err.message
    }
}

export const createCommentData = async (data) => {
    try {
        const { userId, postId, description } = data;

        const [ rows ] = await pool.query("INSERT INTO comments (user_id, post_id, description) VALUES (?, ?, ?)", [userId, postId, description]);

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