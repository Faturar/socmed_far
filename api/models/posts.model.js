import pool from '../db/connect.js'

export const getPosts = async () => {
    const [rows] = await pool.query("SELECT * FROM posts")
    return rows
}