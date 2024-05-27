import express from 'express'
import { getComments, getComment, create, update, deleteComment, getCommentPost } from '../controllers/comments.controller.js';
import verifyToken from '../controllers/auth/verifyToken.js'

export default app => {
    let router = express.Router();

    router.get("/", getComments);

    router.get("/:id", verifyToken, getComment);

    router.get("/post/:id", getCommentPost);

    router.post("/", verifyToken, create);

    router.put("/:id", verifyToken, update);

    router.delete("/:id", verifyToken, deleteComment);

    app.use("/api/comments", router);
} 