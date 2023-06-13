import mongoose from "mongoose";
import orderModel from "./Models/orderModel.js";
import productModel from "./Models/productModel.js";
import userModel from "./Models/userModel.js";
import user from "./asset/user.js";
import "./config/database.js";
import products from "./asset/data.js";
import dotenv from "dotenv";
dotenv.config();
const importData = async () => {
  try {
    orderModel.deleteMany();
    productModel.deleteMany();
    userModel.deleteMany();

    const createdUsers = await userModel.insertMany(user);

    const admin = createdUsers[0]._id;
    const sampleproducts = products.map((data) => {
      return { ...data, user: admin };
    });

    await productModel.insertMany(sampleproducts);
    console.log("data imported");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    orderModel.deleteMany();
    productModel.deleteMany();
    userModel.deleteMany();
    console.log("data destroyed");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
