import express from "express";
import {
  createRestaurant,
  getRestaurant,
  getRestaurtantOrder,
  getSingleRestaurant,
  searchRestaurant,
  updateOrderStatus,
  updateRestaurant,
} from "../controller/restaurant.controller.ts";
import { isAuthenticated } from "../middlewares/isAuthanticated.middlesware.ts";
import upload from "../middlewares/multer.ts";

const router = express.Router();

router
  .route("/")
  .post(isAuthenticated, upload.single("imagefile"), createRestaurant);
router.route("/").get(isAuthenticated, getRestaurant);
router
  .route("/")
  .put(isAuthenticated, upload.single("imagefile"), updateRestaurant);
router.route("/order").get(isAuthenticated, getRestaurtantOrder);
router.route("/order/:orderId/status").put(isAuthenticated, updateOrderStatus);
router.route("/search/:searchText").get(isAuthenticated, searchRestaurant);
router.route("/:id").get(isAuthenticated, getSingleRestaurant);

export default router;
