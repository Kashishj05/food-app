import type { Request, Response } from "express";
import uploadImageOnCloudinary from "../utils/imageUpload.ts";
import { Menu } from "../models/menu.model.ts";
import { Restaurant } from "../models/restaurant.model.ts";
import mongoose from "mongoose";

export const addMenu = async (req: Request, res: Response) => {
  try {
    const { name, discription, price } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
    const menu: any = await Menu.create({
      name,
      discription,
      price,
      image: imageUrl,
    });
    const restaurant = await Restaurant.findOne({ user: req.id });
    if (restaurant) {
      (restaurant.menus as mongoose.Schema.Types.ObjectId[]).push(menu._id);
      await restaurant.save();
    }

    return res.status(201).json({
      success: true,
      message: "Menu added successfully",
      menu,
    });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

export const editMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, discription, price } = req.body;
    const file = req.file;
    const menu = await Menu.findById(id);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "menu not found ",
      });
    }

    if (name) menu.name = name;
    if (discription) menu.discription = discription;
    if (price) menu.price = price;

    if (file) {
      const imageURL = await uploadImageOnCloudinary(
        file as Express.Multer.File
      );
      menu.image = imageURL;
    }
    await menu.save();
    return res.status(200).json({
      success: true,
      message: "menu updated",
      menu,
    });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};
