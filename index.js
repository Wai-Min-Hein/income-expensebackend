import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import authRouter from "./Routes/auth.route.js";
import dataRouter from "./Routes/data.route.js";
import cors from 'cors'

const app = express();

app.use(express.json());

app.use(cors())
mongoose
  .connect(process.env.Mongo_URL)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => console.log("Cannot connected to the database" + err));

app.use("/api/auth", authRouter);
app.use("/api/data", dataRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({ message, statusCode, success: false });
});

app.listen(process.env.Port, () => {
  console.log("Server listen at port " + process.env.Port);
});
