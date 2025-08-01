import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return void res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }
    // verify the token
    const decode = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;
    //check if decoding was successfull
    if (!decode) {
      return void res.status(401).json({
        success: false,
        message: " Invalid token",
      });
    }

    req.id = decode.userId;
    next();
  } catch (error) {
    return void res.status(500).json({
      message: "internal server error",
    });
  }
};
