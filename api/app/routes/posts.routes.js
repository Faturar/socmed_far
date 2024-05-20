import express from 'express'
import imageUpload from '../controllers/imageUpload.controller.js'
import { getPosts, getPost, create, update, deletePost } from '../controllers/posts.controller.js';
import verifyToken from '../controllers/auth/verifyToken.js'

export default app => {
    let router = express.Router();

    router.get("/", getPosts);

    router.get("/:id", getPost);

    router.post("/", verifyToken, imageUpload.single("image"), create);

    router.put("/:id", verifyToken, imageUpload.single("image"), update);

    router.delete("/:id", verifyToken, deletePost);

    app.use("/api/posts", router);
} 