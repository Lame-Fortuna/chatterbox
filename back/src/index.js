import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import {app, server} from "../lib/socket.js"

dotenv.config();

app.use(express.json())

app.use(cookieParser());

// Cors
app.use(
  cors({
    origin: [
          "http://localhost:5173", 
          `https://chatterbox-4a2df.web.app`, 
          `https://console.firebase.google.com/project/chatterbox-4a2df/overview`
        ],
    credentials: true,
  })
);

import { connectDB } from "../lib/db.js"

import authRoutes from "../routes/auth.js";
import messageRoutes from "../routes/message.js";
//import { app, server } from "./lib/socket.js";

app.get("/", (req, res)=>{
    res.status(200).send("YOLO")
})

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes)


const PORT = process.env.PORT || 9090

server.listen(PORT, ()=>{
    console.log("Server Running on localhost:", PORT)
    connectDB()
})