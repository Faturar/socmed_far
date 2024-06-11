import express from 'express'
import verifyToken from '../controllers/auth/verifyToken.js'
import { create, deleteFollow, getFollow, getFollowByUser, getFollows } from '../controllers/follow.controller.js';

export default app => {
    let router = express.Router();

    router.get("/", getFollows);

    router.get("/:id", getFollow)

    router.get("/user/:id", verifyToken, getFollowByUser);

    router.post("/", verifyToken, create);

    router.delete("/:id", verifyToken, deleteFollow);

    app.use("/api/follows", router);
} 