import jwt from "jsonwebtoken";
import { statusCode } from "../types/statusCode";
import { responseMessage } from "../types/responseMessage";

export async function tokenValidator(req: any, res: any, next: any) {
  try {
    const authHeader = req.headers["Authorization"];
    const token = authHeader.split(" ")[0];
    const secretKey = process.env.SECRET_KEY || "";
    jwt.verify(token, secretKey);
    next();
  } catch (error) {
    res
      .status(statusCode.Unauthorized)
      .json({ status: false, message: responseMessage.invalidToken });
  }
}
