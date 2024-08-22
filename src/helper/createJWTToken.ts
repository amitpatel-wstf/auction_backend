import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.SECRET_KEY || "";

export function createJWTToken(userId: mongoose.Types.ObjectId) {
  return jwt.sign({ id: userId }, secretKey, { expiresIn: "15d" });
}
