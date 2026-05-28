import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
dotenv.config();

//db
connectDB();

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});