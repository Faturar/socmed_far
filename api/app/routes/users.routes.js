import express from 'express'
import imageUpload from '../controllers/imageUpload.controller.js'
import { getUsers, getUser, create, update, deleteUser } from '../controllers/users.controller.js';
import verifyToken from '../controllers/auth/verifyToken.js'

export default app => {
    let router = express.Router();

    router.get("/", verifyToken, getUsers);

    router.get("/:id", verifyToken, getUser);

    router.post("/", imageUpload.fields([{ name: 'profile_bg', maxCount: 1 }, { name: 'profile_img', maxCount: 1 }]), create);

    router.put("/:id", verifyToken, imageUpload.fields([{ name: 'profile_bg', maxCount: 1 }, { name: 'profile_img', maxCount: 1 }]), update);

    router.delete("/:id", verifyToken, deleteUser);

    app.use("/api/users", router);
} 