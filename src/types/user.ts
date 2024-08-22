import mongoose from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

export type registerUserType = {
  username: string;
  email: string;
  password: string;
};

export type updateUserType = registerUserType & {
  id: string;
};

export type loginUserType = Exclude<registerUserType, "username">;

export type UserType = IUser & {
  _id: mongoose.Types.ObjectId;
};
