import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import uploadRouter from "./routes/upload.routes.js";
import aiRouter from "./routes/ai.routes.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/assign/upload",uploadRouter);
app.use("/assign/ai",aiRouter);


export default app;

