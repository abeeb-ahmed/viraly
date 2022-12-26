import express from "express";
import { getPosts, sendPost } from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", sendPost);

export default router;
