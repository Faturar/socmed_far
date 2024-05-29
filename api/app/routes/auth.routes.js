import express from 'express'
import { register, login, tokenCheck } from '../controllers/auth/auth.controller.js';
import verifyToken from '../controllers/auth/verifyToken.js';

export default app => {
    let router = express.Router();

    router.get("/tokenCheck", verifyToken, tokenCheck);

    router.post("/register", register);

    router.post("/login", login);
    
    app.use("/api/auth", router);
} 