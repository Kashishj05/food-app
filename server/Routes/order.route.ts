import express from "express";
import { isAuthenticated } from "../middlewares/isAuthanticated.middlesware.ts";
import {
  createCheckoutSession,
  getOrders,
  stripeWebhook,
} from "../controller/order.controller.ts";

const router = express.Router();

router.route("/").get(isAuthenticated, getOrders);
router
  .route("/checkout/create-checkout-session")
  .post(isAuthenticated, createCheckoutSession);

router
  .route("/webhook")
  .post(express.raw({ type: "application/json" }), stripeWebhook);

export default router;
