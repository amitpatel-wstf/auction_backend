import express from "express";
import { statusCode } from "../types/statusCode";

const app = express.Router();

app.get("/", async (req, res) => {
  try {
    res
      .status(statusCode.OK)
      .json({ status: true, messeage: "Route working...!" });
  } catch (error) {
    res.status(500).json({ status: false, message: "Error in Routes" });
  }
});

export default app;
