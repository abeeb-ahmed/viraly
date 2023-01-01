import express from "express";
import { getFeaturedUsers, getUser, updateUser } from "../controllers/users.js";

const router = express.Router();

router.get("/find/:userId", getUser);
router.put("/", updateUser);
router.get("/featured", getFeaturedUsers);

export default router;
