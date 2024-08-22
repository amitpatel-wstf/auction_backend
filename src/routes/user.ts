import express from "express";
import User from "../models/Users";
import dotenv from "dotenv";
import {
  registerUser,
  getUsers,
  updateUserById,
  getUserByEmailAndPassword,
  deleteUserById,
} from "../controllers/user";
import { responseMessage } from "../types/responseMessage";
import { statusCode } from "../types/statusCode";
import {
  loginUserType,
  registerUserType,
  updateUserType,
  UserType,
} from "../types/user";
import { createJWTToken } from "../helper/createJWTToken";

dotenv.config();
const app = express.Router();

app.get("/", async (req, res) => {
  try {
    res
      .status(statusCode.OK)
      .json({ status: true, messeage: responseMessage.RouteWorking });
  } catch (error) {
    res
      .status(statusCode.InternalServerError)
      .json({ status: false, message: responseMessage.InternalServerError });
  }
});
app.get("/users", async (req, res) => {
  try {
    const users = await getUsers();
    res
      .status(statusCode.OK)
      .json({ users: users, status: true, message: responseMessage.UserList });
  } catch (error) {
    res
      .status(statusCode.InternalServerError)
      .json({ status: false, message: responseMessage.InternalServerError });
  }
});
// Create a user
app.post("/register", async (req, res) => {
  try {
    const { username, email, password }: registerUserType = req.body;
    const user = await registerUser(username, email, password);
    const token = createJWTToken(user._id);
    res.status(statusCode.Created).json({
      user: user,
      status: true,
      token: token,
      message: responseMessage.UserCreated,
    });
  } catch (error) {
    res
      .status(statusCode.InternalServerError)
      .json({ status: false, message: responseMessage.InternalServerError });
  }
});

app.put("/update", async (req, res) => {
  try {
    const { id, username, email, password }: updateUserType = req.body;
    const user = await updateUserById(id, username, email, password);
    res.status(statusCode.Accepted).json({
      user: user,
      status: true,
      message: responseMessage.UserUpdated,
    });
  } catch (error) {
    res
      .status(statusCode.InternalServerError)
      .json({ message: responseMessage.InternalServerError, error });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password }: loginUserType = req.body;
    const user: UserType | any = await getUserByEmailAndPassword(
      email,
      password
    );
    if (!user) {
      return res
        .status(statusCode.NoContent)
        .json({ message: responseMessage.UserNotFound, status: false });
    }
    const token = createJWTToken(user._id);
    res.status(statusCode.OK).json({
      user: user,
      status: true,
      token: token,
      message: responseMessage.LoginSuccess,
    });
  } catch (error) {
    res
      .status(statusCode.InternalServerError)
      .json({ status: false, message: responseMessage.InternalServerError });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await deleteUserById(id);
    res.status(statusCode.delete).json({
      status: true,
      message: responseMessage.UserDeleted,
      user: user,
    });
  } catch (error) {
    res
      .status(statusCode.InternalServerError)
      .json({ status: false, message: responseMessage.InternalServerError });
  }
});

export default app;
