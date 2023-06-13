import express from "express";
const app = express();
import cors from "cors";
import "./config/database.js";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddle.js";
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.get("/app/config", (req, res, next) => {
  console.log("key sent");
  res.send({ key: process.env.RAZORPAY_API_KEY });
});
import productRoutes from "./Routes/productRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import paymetRoutes from "./Routes/paymentRoutes.js";
app.use("/api", productRoutes);
app.use("/api", userRoutes);
app.use("/api/order", orderRoutes);
app.use("/api", paymetRoutes);
app.use(notFound);
app.use(errorHandler);
export default app;
