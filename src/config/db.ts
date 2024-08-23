import mongoose from "mongoose";
import dotenv from "dotenv";
import { config } from "./config";

dotenv.config();

const MONGODB_URI = config.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {});
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
