import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";


import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import habitRotes from "./routes/habit.routes.js"



dotenv.config();
const app = express();

app.use(cors());

connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is Serving");
});

app.use("/habit/auth",authRoutes);
app.use("/habit/habits",habitRotes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

