import { tokenType } from "../types/body";
import { responseMessage } from "../types/responseMessage";
import { statusCode } from "../types/statusCode";

export default async function isAdmin(req: any, res: any, next: any) {
  try {
    const { token }: { token: tokenType } = req.body;
    const tokenFromEnv = process.env.ADMIN_TOKEN;
    if (token !== tokenFromEnv) {
      return res.status(statusCode.Unauthorized).json({
        status: false,
        message: responseMessage.UnauthorizedRoute,
      });
    }
    next();
  } catch (error) {
    res
      .status(statusCode.InternalServerError)
      .json({ status: false, message: responseMessage.InternalServerError });
  }
}
