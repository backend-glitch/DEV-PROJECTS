import express from "express";
import { generateContent } from "../controllers/ai.controllers.js";

const router = express.Router();

router.post("/generate",generateContent);

export default router;
