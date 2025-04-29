import type { Response } from "express";
import jwt from "jsonwebtoken";
import type { IUserDocument } from "../models/user.model.ts";

export const generateToken = (res: Response, user: IUserDocument) => {
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY!, {
    expiresIn: "1d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
  return token;
};
