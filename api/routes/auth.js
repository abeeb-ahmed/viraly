import express from "express";
import { login, logout, registerUser } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.get("/logout", logout);

export default router;
