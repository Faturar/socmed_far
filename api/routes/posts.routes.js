import express from 'express'
import imageUpload from '../controllers/imageUpload.controller.js'

import { getPosts, getPost, create, update, deletePost } from '../controllers/posts.controller.js';

export default app => {
    let router = express.Router();

    router.get("/", getPosts);

    router.get("/:id", getPost);

    router.post("/", imageUpload.single("image"), create);

    router.put("/:id", imageUpload.single("image"), update);

    router.delete("/:id", deletePost);

    app.use("/api/posts", router);
} 