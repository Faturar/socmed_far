import { getAllNotifications, getNotificationById, createNotificationData, deleteNotificationData, updateNotificationData } from '../models/notifications.model.js'

// Get notifications
export const getNotifications = async (req, res) => {
    try {
        const notifications = await getAllNotifications();

        return res.status(200).json({
            message: "Success get all notifications data!",
            data: notifications
        })
    } catch(err) {
        return res.status(500).send({message: "Cannot get all notifications data.", err: err.message})
    }
}

export const getNotification = async (req, res) => {
    try {
        const id = req.params.id;

        const [ notification ] = await getNotificationById(id);

        return res.status(200).json({
            message: "Success get notification data!",
            data: notification
        })
    } catch(err) {
        return res.status(500).json({message: "Cannot get notification data.", err: err.message})
    }
}

export const create = async (req, res) => {
    try {
        const { userId, description, type } = req.body;

        const data = { userId, description, type }

        const notificationId = await createNotificationData(data)

        const [ notification ] = await getNotificationById(notificationId);

        return res.status(201).json({
            message: "Success creating notification data!",
            data: notification
        })
    } catch(err) {
        return res.status(500).json({message: "Cannot create notification data.", err: err.message})
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const { description, type, status } = req.body;

        const [ notification ] = await getNotificationById(id)

        const data = { 
            userId: notification.user_id, 
            description: description ? description : notification.description,
            type: type ? type : notification.type,
            status: status ? status : notification.status
        }

        const update = await updateNotificationData(id, data)

        if(update.affectedRows != 0) {
            return res.status(200).json({
                message: "Success updating notification data!",
                data: notification
            });
        } else {
            return res.status(404).json({
                message: "No notification data to delete!",
            });
        }
    } catch(err) {
        return res.status(500).json({message: "Cannot update notification data.", err: err.message})
    }
}

export const deleteNotification = async (req, res) => {
    try {
        const id = req.params.id

        const [ notification ] = await getNotificationById(id)

        const deleteData = await deleteNotificationData(id)

        if(deleteData.affectedRows != 0) {
            return res.status(200).json({
                message: "Success deleting notification data!",
                data: notification
            });
        } else {
            return res.status(404).json({
                message: "No notification data to delete!",
            });
        }
    }  catch(err) {
        return res.status(500).json({message: "Cannot delete notification data.", err: err.message})
    }
}