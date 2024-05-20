import express from 'express'
import imageUpload from '../controllers/imageUpload.controller.js'
import { register, login } from '../controllers/auth/auth.controller.js';

export default app => {
    let router = express.Router();

    router.post("/register", imageUpload.fields([{ name: 'profile_bg', maxCount: 1 }, { name: 'profile_img', maxCount: 1 }]), register);

    router.post("/login", login);
    
    app.use("/api/auth", router);
} 