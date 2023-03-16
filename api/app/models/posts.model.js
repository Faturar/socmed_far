import pool from '../db/connect.js'

export const getAllPosts = async () => {
    try {
        const [ rows ] = await pool.query(`
        SELECT a.id, a.user_id, a.image, a.content, a.created_at, a.updated_at, b.username as user_username, b.name as user_name, b.role as user_role, b.profile_bg as user_profile_bg, b.profile_img as user_profile_img 
        FROM posts as a 
        LEFT JOIN users as b 
        ON a.user_id = b.id ORDER BY a.created_at DESC`);

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

        const [ rows ] = await pool.query("INSERT INTO posts (user_id, image, content, created_at, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)", [userId, image, content]);
        
        return rows.insertId
    } catch(err) {
        return err.message
    }
}

export const updatePostData = async (id, data) => {
    try {
        const {userId, image, content, created_at} = data;

        const [ rows ] = await pool.query("UPDATE posts SET user_id = ?, image = ?, content = ?, created_at = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", [userId, image, content, created_at, id])

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