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
        const { userId, description } = data;

        const [ rows ] = await pool.query("INSERT INTO notifications (user_id, description, type, status, created_at) VALUES (?, ?, 0, CURRENT_TIMESTAMP)", [userId, description]);
        
        return rows.insertId
    } catch(err) {
        return err.message
    }
}

export const updateNotificationData = async (id, data) => {
    try {
        const { userId, description, status } = data;

        const [ rows ] = await pool.query("UPDATE notifications SET user_id = ?, description = ?, type = ?, status = ? WHERE id = ?", [userId, description, status, id]);

        return rows
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