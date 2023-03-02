import express from 'express'
import imageUpload from '../controllers/imageUpload.controller.js'
import { getUsers, getUser, create, update, deleteUser } from '../controllers/users.controller.js';

export default app => {
    let router = express.Router();

    router.get("/", getUsers);

    router.get("/:id", getUser);

    router.post("/", imageUpload.fields([{ name: 'profile_bg', maxCount: 1 }, { name: 'profile_img', maxCount: 1 }]), create);

    router.put("/:id", imageUpload.fields([{ name: 'profile_bg', maxCount: 1 }, { name: 'profile_img', maxCount: 1 }]), update);

    router.delete("/:id", deleteUser);

    app.use("/api/users", router);
} 