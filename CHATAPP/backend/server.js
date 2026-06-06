import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.routes.js";
import connectDB from "./config/mongoconnect.js";
import messageRouter from "./routes/message.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(cookieParser())
app.use(express.json());


connectDB();

app.get("/", (req, res) => {
  res.json("Server running !!");
});

app.use("/chat/auth", authRouter);
app.use("/chat/message",messageRouter);
app.use("/chat/users",userRouter);



app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});