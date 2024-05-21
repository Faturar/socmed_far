import express from 'express'
import { register, login } from '../controllers/auth/auth.controller.js';

export default app => {
    let router = express.Router();

    router.post("/register", register);

    router.post("/login", login);
    
    app.use("/api/auth", router);
} 