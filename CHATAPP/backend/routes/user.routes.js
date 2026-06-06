import express from "express";
import protect from "../middleware/protect.middleware.js";
import { getUserForSidebar } from "../controllers/user.controllers.js";

const router = express.Router();


router.get("/",protect,getUserForSidebar);

export default router;