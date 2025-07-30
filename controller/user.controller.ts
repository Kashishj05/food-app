import type { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import cloudinary from "../utils/cloudinary";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import { generateToken } from "../utils/generateToken";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/email";

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password, contact } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return void res.status(400).json({
        success: false,
        message: "User already exist with this email",
      });
      // return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = generateVerificationCode();

    user = await User.create({
      fullname,
      email,
      password: hashedPassword,
      contact: Number(contact),
      verificationToken,
      verificationTokenExpireAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    generateToken(res, user);

    await sendVerificationEmail(email, verificationToken);
    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );
    return void res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    return void res.status(500).json({ message: "Internet server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return void res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
      // return;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return void res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
      // return;
    }

    generateToken(res, user);
    user.lastlogin = new Date();
    await user.save();

    // send user without password
    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );
    return void res.status(200).json({
      success: true,
      message: `Welcome back ${user.fullname}`,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    return void res
      .status(500)
      .json({ message: "Internet server error", error });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { verificationCode } = req.body;

    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpireAt: { $gt: Date.now() },
    }).select("-password");

    if (!user) {
      return void res.status(400).json({
        success: false,
        message: "Invalid or expire verification token",
      });
      // return;
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpireAt = undefined;
    await user.save();

    // send welcome email
    await sendWelcomeEmail(user.email, user.fullname);

    return void res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return void res.status(500).json({ message: "Internet server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    return void res.clearCookie("token").status(200).json({
      success: true,
      message: "logged out successfully",
    });
  } catch (error) {
    console.log(error);
    return void res.status(500).json({ message: "Internet server error" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return void res.status(200).json({
        success: false,
        message: "User does not exist",
      });
      // return;
    }
    const resetToken = crypto.randomBytes(40).toString("hex");
    const resettokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpireAt = resettokenExpiresAt;
    await user.save();

    //send email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`
    );

    return void res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log(error);
    return void res.status(500).json({ message: "Internet server error" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpireAt: { $gt: Date.now() },
    });

    if (!user) {
      return void res.status(400).json({
        success: false,
        message: "Invalid or expire verification resetToken",
      });
      // return;
    }
    // update password

    const hashedpassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedpassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpireAt = undefined;
    await user.save();

    //send reset success email
    await sendResetSuccessEmail(user.email);

    return void res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    return void res.status(500).json({ message: "Internet server error" });
  }
};

export const checkAuth = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return void res.status(404).json({
        success: false,
        message: "user is not found",
      });
      // return;
    }
    return void res.status(200).json({
      success: true,
      user,
    });
    // return;
  } catch (error) {
    console.log(error);
    return void res.status(500).json({ message: "Internet server error" });
  }
};

export const updateprofile = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const { fullname, email, address, city, country, profilePicture } =
      req.body;
    //upload image on cloudinary
    let cloudResponse: any;

    cloudResponse = await cloudinary.uploader.upload(profilePicture);
    const updatedData = {
      fullname,
      email,
      address,
      city,
      country,
      profilePicture,
    };
    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    return void res.status(200).json({
      success: true,
      user,
      message: " Profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    return void res.status(500).json({ message: "Internal server error" });
  }
};
