import express from "express";
import { signUp ,Login } from "../controllers/auth.controllers.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();


router.get("/", (req,res) => {
    res.send("Auth route working")
});

router.post("/signup",signUp);
router.post("/login",Login);

router.get("/profile",protect,(req,res) => {
    res.json(req.user)
})


export default router;