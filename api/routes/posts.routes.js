import express from 'express'
import { getAllPosts } from '../controllers/posts.controller.js';

export default app => {
    let router = express.Router();

    router.get("/", getAllPosts);

    app.use("/api/posts", router);
} 