import express from "express";
import {
  addRelationship,
  getRelationship,
} from "../controllers/relationships.js";

const router = express.Router();

router.get("/", getRelationship);
router.post("/", addRelationship);

export default router;
