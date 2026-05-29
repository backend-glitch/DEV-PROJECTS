import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
dotenv.config();


import authRouter from "./routes/auth.routes.js";
import noteRouter from "./routes/note.routes.js"


//db
connectDB();

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("API Working");
});

app.use("/notes/auth",authRouter);
app.use("/notes",noteRouter);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});