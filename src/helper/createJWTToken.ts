import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { config } from "../config/config";
dotenv.config();

const secretKey = config.SECRET_KEY || "";

export function createJWTToken(userId: mongoose.Types.ObjectId) {
  return jwt.sign({ id: userId }, secretKey, { expiresIn: "15d" });
}
