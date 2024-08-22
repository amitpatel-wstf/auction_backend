import express from "express";
import connectDB from "../config/db";
import dotenv from "dotenv";
dotenv.config();

// post for running the server
const PORT = process.env.PORT || 3001;

export default function ServerStart(app: express.Application) {
  try {
    app.listen(PORT, async () => {
      console.log(`Server started on port ${PORT}`);
      await connectDB();
    });
  } catch (error) {
    console.log("Error starting Server");
  }
}
