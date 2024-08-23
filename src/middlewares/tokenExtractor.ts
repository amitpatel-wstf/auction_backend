import jwt from "jsonwebtoken";
import { tokenType } from "../types/body";
import { config } from "../config/config";

export async function tokenExtractor(req: any, res: any, next: any) {
  try {
    const { token }: { token: tokenType } = req.body;
    jwt.verify(token, config.SECRET_KEY || "");
    const decoded = jwt.decode(token);
    // @ts-ignore
    req.body.id = decoded.id;
    next();
  } catch (error: any) {
    throw new Error(error);
  }
}
