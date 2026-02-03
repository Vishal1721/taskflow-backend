import express from "express";
import { register, login, getMe } from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// get logged-in user
router.get("/me", authMiddleware, getMe);

export default router;
