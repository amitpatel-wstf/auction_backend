import express from "express";
import User from "../models/Users";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.SECRET_KEY || "";
const app = express.Router();

app.get("/", async (req, res) => {
  try {
    res.status(200).json({ status: true, messeage: "Route working...!" });
  } catch (error) {
    res.status(500).json({ status: false, message: "Error in Routes" });
  }
});
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({users:users,status:true,message:"User List"});
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Error while getting the users" });
  }
});
// Create a user
app.post("/register", async (req, res) => {
  try {
    const {
      username,
      email,
      password,
    }: { username: string; email: string; password: string } = req.body;
    const user = await User.create({
      username: username,
      email: email,
      password: password,
    });
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "15d" });
    res.status(201).json({
      user: user,
      status: true,
      token: token,
      message: "User created successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.put("/update", async (req, res) => {
  try {
    const { id, username, email, password } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { username, email, password },
      { new: true }
    );
    res.json({
      user: user,
      status: true,
      message: "User updated successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Email :: ", email, "Password :: ", password);
    const user = await User.findOne({ email: email, password: password });
    if (!user) {
      return res.status(401).json({ message: "User not found!" });
    }
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "15d" });
    res.json({
      user: user,
      status: true,
      token: token,
      message: "User logged in successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.json({ status: true, message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default app;
