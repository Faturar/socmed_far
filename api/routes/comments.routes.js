import express from 'express'
import { getComments, getComment, create, update, deleteComment } from '../controllers/comments.controller.js';

export default app => {
    let router = express.Router();

    router.get("/", getComments);

    router.get("/:id", getComment);

    router.post("/", create);

    router.put("/:id", update);

    router.delete("/:id", deleteComment);

    app.use("/api/comments", router);
} 