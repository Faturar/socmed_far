import pool from '../db/connect.js'

export const getAllPosts = async () => {
    try {
        const [ rows ] = await pool.query("SELECT * FROM posts")
        return rows
    } catch(err){
        return err.message
    }
}

export const getPostById = async (id) => {
    try {
        const [ rows ] = await pool.query("SELECT * FROM posts WHERE id = ?", [id]);
        return rows
    } catch(err) {
        return err.message
    }
}

export const createPostData = async (data) => {
    try {
        const { userId, image, content } = data;

        const [ rows ] = await pool.query("INSERT INTO posts (user_id, image, content) VALUES (?, ?, ?)", [userId, image, content]);
        
        return rows.insertId
    } catch(err) {
        return err.message
    }
}

export const updatePostData = async (id, data) => {
    try {
        const {userId, image, content} = data;

        const [ rows ] = await pool.query("UPDATE posts SET user_id = ?, image = ?, content = ? WHERE id = ?", [userId, image, content, id])

        return rows
    } catch(err) {
        return err.message
    }
}

export const deletePostData = async (id) => {
    try {
        const [ rows ] = await pool.query("DELETE FROM posts WHERE id = ?", [id])

        return rows
    } catch(err) {
        return err.message
    }
}