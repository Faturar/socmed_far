import express from 'express'
import { getLikes, getLikeByPost, create, update, deleteLike } from '../controllers/likes.controller.js';

export default app => {
    let router = express.Router();

    router.get("/", getLikes);

    router.get("/post/:id", getLikeByPost);

    router.post("/", create);

    router.put("/:id", update);

    router.delete("/:id", deleteLike);

    app.use("/api/likes", router);
} 