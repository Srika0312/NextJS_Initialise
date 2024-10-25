import { NextFunction, Request, Response } from "express";
import { VerifyToken } from "../functions/JWT";

export const TokenVerification = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization header is missing or invalid",
        auth: "invalid",
      });
    }

    const token = authHeader.split(" ")[1];
    if (token) {
      try {
        const decoded = await VerifyToken(token);
     
        if (decoded === "jwt malformed" || decoded === "invalid token")
          return res.status(401).json({
            message: "Token malformed",
            auth: "invalid",
          });
        req.body.id = decoded.id;
        next();
      } catch (error) {
        console.log(error);
        if (error.message === "jwt expired") {
          return res.status(401).json({
            message: "Token expired",
            expiredAt: error.expiredAt,
            auth: "invalid",
          });
        } else {
          return res
            .status(401)
            .json({ message: "Failed to authenticate token", auth: "invalid" });
        }
      }
    } else {
      return res
        .status(401)
        .json({ message: "Failed to authenticate token", auth: "invalid" });
    }
  } catch (error) {
    console.log(error);
  }
};