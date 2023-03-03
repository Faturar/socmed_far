import express from 'express'
import { getNotifications, getNotification, create, deleteNotification } from '../controllers/notifications.controller.js';

export default app => {
    let router = express.Router();

    router.get("/", getNotifications);

    router.get("/:id", getNotification);

    router.post("/", create);

    router.delete("/:id", deleteNotification);

    app.use("/api/notifications", router);
} 