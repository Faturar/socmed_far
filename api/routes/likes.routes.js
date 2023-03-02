import express from 'express'
import { getLikes, getLike, create, update, deleteLike } from '../controllers/likes.controller.js';

export default app => {
    let router = express.Router();

    router.get("/", getLikes);

    router.get("/:id", getLike);

    router.post("/", create);

    router.put("/:id", update);

    router.delete("/:id", deleteLike);

    app.use("/api/likes", router);
} 