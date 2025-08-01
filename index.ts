import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./Routes/user.route";
import restaurantRoute from "./Routes/restaurant.route";
import menuRoute from "./Routes/menu.route";
import orderRoute from "./Routes/order.route";
import path from "path";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
const DIRNAME = path.resolve();
// default middelware
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://food-app-server-hk06.onrender.com",
  ],
  credentials: true,
};
app.use(cors(corsOptions));
//apis

app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);

app.use(express.static(path.join(DIRNAME, "/client/dist")));
app.use("*", (_, res) => {
  res.sendFile(path.resolve(DIRNAME, "client", "dist", "index.html"));
});
app.listen(PORT, () => {
  connectDB();
  console.log(`server is at port ${PORT}`);
});
