import express from "express";
import protect from "../middleware/auth.middleware.js";
import { createNote, getNote } from "../controllers/note.controllers.js";

const router = express.Router();

router.get("/",(req,res) => {
    res.send("Notes route working")
});

router.post("/create",protect,createNote);
router.get("/mynote",protect,getNote);


export default router;