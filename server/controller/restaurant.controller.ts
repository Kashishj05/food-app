import type { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model.ts";

import uploadImageOnCloudinary from "../utils/imageUpload.ts";
import { Order } from "../models/order.model.ts";

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const { restaurantName, city, country, deliverytime, cuisines } = req.body;
    const file = req.file;

    const restaurant = await Restaurant.findOne({ user: req.id });
    if (restaurant) {
      return res.status(400).json({
        success: false,
        message: "Restaurant already exist for this user",
      });
      // return;
    }
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
      // return;
    }
    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
    await Restaurant.create({
      user: req.id,
      restaurantName,
      city,
      country,
      deliverytime,
      cuisines: JSON.parse(cuisines),
      imageUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Restaurant added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
    // return;
  }
};

export const getRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.id }).populate(
      "menus"
    );
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        restaurant: [],
        messsage: "Restaurant is not found",
      });
      // return;
    }
    // Ensure menus is always an array
    // const menus = Array.isArray(restaurant.menus)
    //   ? restaurant.menus
    //   : Object.values(restaurant.menus);

    return res.status(200).json({ success: true, restaurant });
    // return;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
    // return;
  }
};

export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const { restaurantName, city, country, deliverytime, cuisines } = req.body;
    const file = req.file;
    const restaurant = await Restaurant.findOne({ user: req.id });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        messsage: "Restaurant is not found",
      });
      // return;
    }

    restaurant.restaurantName = restaurantName;
    restaurant.city = city;
    restaurant.country = country;
    restaurant.deliverytime = deliverytime;
    restaurant.cuisines = JSON.parse(cuisines);

    if (file) {
      const imageURL = await uploadImageOnCloudinary(
        file as Express.Multer.File
      );
      restaurant.imageUrl = imageURL;
    }

    await restaurant.save();

    return res.status(200).json({
      success: true,
      message: "Restaurant updated",
      restaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
    // return;
  }
};

export const getRestaurtantOrder = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.id });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        messsage: "Restaurant is not found",
      });
      // return;
    }

    const orders = await Order.find({ restaurant: restaurant._id })
      .populate("restaurant")
      .populate("user");
    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
    // return;
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,

        messsage: "order is not found",
      });
      // return;
    }
    order.status = status;
    await order.save();
    return res.status(200).json({
      success: true,
      status: order.status,
      message: "Status updated",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
    // return;
  }
};

export const searchRestaurant = async (req: Request, res: Response) => {
  try {
    const searchText = req.params.searchText || "";
    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = ((req.query.selectedCuisines as string) || "")
      .split(",")
      .filter((cuisine) => cuisine);

    const query: any = {};
    //basic search on searchtext (name, city, country)
    if (searchText) {
      query.$or = [
        { restaurantName: { $regex: searchText, $options: "i" } },
        { city: { $regex: searchText, $options: "i" } },
        { country: { $regex: searchText, $options: "i" } }, // i means word ki substring be match ho skti h
      ];
    }

    // filter on the basis on searchquery

    if (searchQuery) {
      query.$or = [
        { restaurantName: { $regex: searchQuery, $options: "i" } },
        { cuisines: { $regex: searchQuery, $options: "i" } },
      ];
    }
    // ["momo","nuger"]
    if (selectedCuisines.length > 0) {
      query.cuisines = { $in: selectedCuisines };
    }

    // user serach for momo it search momo in selected arry using $in and it retun boolean
    const restaurants = await Restaurant.find(query);
    return res.status(200).json({
      success: true,
      data: restaurants,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
    // return;
  }
};

export const getSingleRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findById(restaurantId).populate({
      path: "menus",
      options: { createdAt: -1 },
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant is not found",
      });
      // return;
    }
    return res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
    // return;
  }
};
