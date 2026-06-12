import express from "express";
import { getHabits,addHabit,toggleHabit, updateHabit, deleteHabit, getStats } from "../controllers/habit.controllers.js";
import protect from "../middleware/protect.middleware.js";

const router = express.Router();

router.get("/gethabit",protect,getHabits);
router.post("/addhabit",protect, addHabit);
router.post("/:id/toggle",protect, toggleHabit);
router.put("/:id/updatehabit",protect,updateHabit);
router.delete("/:id/deletehabit",protect,deleteHabit);

router.get("/stats",protect, getStats);

export default router;
