import mongoose, { Document } from "mongoose";

export interface IUser {
  fullname: string;
  email: string;
  password: string;
  contact: number;
  address: string;
  city: string;
  country: string;
  profilePicture: string;
  admin: boolean;
  lastlogin?: Date;
  isVerified?: boolean;
  resetPasswordToken?: string;
  resetPasswordTokenExpireAt?: Date;
  verificationToken?: string;
  verificationTokenExpireAt?: Date;
}

export interface IUserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      default: "Update your address",
    },
    city: {
      type: String,
      default: "Update your city",
    },
    country: {
      type: String,
      default: "Update your country",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    admin: {
      type: Boolean,
      default: true,
    },
    // advance authantication
    lastlogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordTokenExpireAt: Date,
    verificationToken: String,
    verificationTokenExpireAt: Date,
  },
  { timestamps: true }
);

export const User = mongoose.model<IUserDocument>("User", userSchema);
