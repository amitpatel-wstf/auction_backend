import { config } from "../config/config";
import { responseMessage } from "../types/responseMessage";
import { statusCode } from "../types/statusCode";
import jwt from "jsonwebtoken";

export function setUserId(req: any, res: any, next: any) {
  try {
    const token = req.params.id;
    jwt.verify(token, config.SECRET_KEY || "");
    const decoded = jwt.decode(token);
    // @ts-ignore
    const userId = decoded.id;
  } catch (error) {
    res
      .status(statusCode.InternalServerError)
      .json({ status: false, message: responseMessage.InternalServerError });
  }
}
