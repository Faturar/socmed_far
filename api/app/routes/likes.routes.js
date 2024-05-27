import express from 'express'
import { getLikes, getLikeByPost, getUserLike, create, deleteLike } from '../controllers/likes.controller.js';
import verifyToken from '../controllers/auth/verifyToken.js'

export default app => {
    let router = express.Router();

    router.get("/", getLikes);

    router.get("/post/:id", verifyToken, getLikeByPost);

    router.get("/user/:id", verifyToken, getUserLike);

    router.post("/", verifyToken, create);

    router.delete("/:id", verifyToken, deleteLike);

    app.use("/api/likes", router);
} 