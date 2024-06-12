import express from 'express'
import { getNotifications, getNotification, create, deleteNotification } from '../controllers/notifications.controller.js';
import verifyToken from '../controllers/auth/verifyToken.js'

export default app => {
    let router = express.Router();

    router.get("/", verifyToken, getNotifications);

    router.get("/:id", verifyToken, getNotification);

    router.post("/", verifyToken, create);

    router.delete("/:id", verifyToken, deleteNotification);

    app.use("/api/notifications", router);
} 