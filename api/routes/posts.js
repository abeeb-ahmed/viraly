import express from "express";
import { getPosts } from "../controllers/posts";

const router = express.Router();

router("/", getPosts);

export default router;
