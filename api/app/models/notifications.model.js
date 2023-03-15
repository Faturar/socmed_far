import pool from '../db/connect.js'

export const getAllNotifications = async () => {
    try {
        const [ rows ] = await pool.query("SELECT * FROM notifications")
        return rows
    } catch(err){
        return err.message
    }
}

export const getNotificationById = async (id) => {
    try {
        const [ rows ] = await pool.query("SELECT * FROM notifications WHERE id = ?", [id]);
        return rows
    } catch(err) {
        return err.message
    }
}

export const createNotificationData = async (data) => {
    try {
        const { userId, description, created_at, updated_at } = data;

        const [ rows ] = await pool.query("INSERT INTO notifications (user_id, description, created_at, updated_at) VALUES (?, ?)", [userId, description, created_at, updated_at]);
        
        return rows.insertId
    } catch(err) {
        return err.message
    }
}

export const deleteNotificationData = async (id) => {
    try {
        const [ rows ] = await pool.query("DELETE FROM notifications WHERE id = ?", [id])

        return rows
    } catch(err) {
        return err.message
    }
}