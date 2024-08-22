import express from "express";
import { statusCode } from "../types/statusCode";
import isAdmin from "../middlewares/isAdmin";
import { responseMessage } from "../types/responseMessage";
import dotenv from "dotenv";
dotenv.config();

const app = express.Router();
app.post("/", isAdmin, async (req, res) => {
  try {
    res
      .status(statusCode.OK)
      .json({ message: responseMessage.LoginSuccess, status: true });
  } catch (error) {
    res
      .status(statusCode.InternalServerError)
      .json({ message: responseMessage.InternalServerError, status: false });
  }
});

export default app;
