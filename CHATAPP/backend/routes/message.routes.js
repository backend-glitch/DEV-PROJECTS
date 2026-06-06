import express, { application } from "express";
import {SendMessage,getMessages} from "../controllers/message.controllers.js";
import protect from "../middleware/protect.middleware.js";

const router = express.Router();

router.get("/:id",protect,getMessages);
router.post("/send/:id",protect,SendMessage);

export default router;