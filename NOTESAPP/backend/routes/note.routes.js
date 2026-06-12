import express from "express";
import protect from "../middleware/auth.middleware.js";
import { createNote, deleteNote, getNote, searchNotes, togglePinNote, updateNote } from "../controllers/note.controllers.js";

const router = express.Router();

router.get("/",(req,res) => {
    res.send("Notes route working")
});

router.post("/create",protect,createNote);
router.get("/getmynote",protect,getNote);
router.delete("/:id",protect,deleteNote);
router.put("/:id",protect,updateNote);
router.patch("/:id/pin",protect,togglePinNote);
router.get("/search",protect,searchNotes);



export default router;