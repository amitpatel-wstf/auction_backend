import User from "../models/Users";
import { UserType } from "../types/user";

export async function deleteUserById(id: string) {
  try {
    const user = await User.findByIdAndDelete(id);
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getUsers() {
  try {
    const users = User.find();
    return users;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function registerUser(
  username: string,
  email: string,
  password: string
) {
  try {
    const user = await User.create({
      username: username,
      email: email,
      password: password,
    });
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function updateUserById(
  id: string,
  username: string,
  email: string,
  password: string
) {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { username: username, email: email, password: password },
      { new: true }
    );
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getUserByEmailAndPassword(
  email: string,
  password: string
) {
  try {
    const user:UserType|null = await User.findOne({ email: email, password: password });
    return User;
  } catch (error: any) {
    throw new Error(error);
  }
}
