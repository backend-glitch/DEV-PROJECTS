import express from "express";
import { upload } from "../middlewares/upload.middlewares.js";
import { uploadPdf } from "../controllers/upload.controllers.js";

const router = express.Router();

router.get("/", (req,res) => {
    res.send("upload api working");
});


router.post("/", upload.single("pdf"), uploadPdf);

export default router;