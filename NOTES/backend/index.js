
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import connectDB from "./config/db.js";
dotenv.config();


import authRouter from "./routes/auth.routes.js";
import noteRouter from "./routes/note.routes.js"
import aiRouter from "./routes/ai.routes.js";


import {
  authLimiter,
  notesLimiter,
  aiLimiter,
  globalLimiter,
} from "./middleware/limit.middleware.js";


//db
connectDB();

const app = express();
const PORT = 8000;


app.use(cors());

app.use(express.json());

app.use(globalLimiter);


app.get("/", (req, res) => {
    res.send("API Working");
});

app.use("/notes/auth",authLimiter,authRouter);
app.use("/notes",notesLimiter,noteRouter);
app.use("/notes/ai",aiLimiter,aiRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});