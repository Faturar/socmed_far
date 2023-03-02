import express from 'express'
import { getPosts, getPost, create, update, deletePost } from '../controllers/posts.controller.js';

export default app => {
    let router = express.Router();

    router.get("/", getPosts);

    router.get("/:id", getPost);

    router.post("/", create);

    router.put("/:id", update);

    router.delete("/:id", deletePost);

    app.use("/api/posts", router);
} 