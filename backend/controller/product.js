import express from "express";
import products from "../asset/data.js";
const router = express.Router();
import expressAsyncHandler from "express-async-handler";
import productModel from "../Models/productModel.js";

const findproduct = expressAsyncHandler(async (req, res, next) => {
  const product = await productModel.findById(req.params.id).lean();
  if (!product) {
    return res.status(500).json({
      message: `product with id ${req.params.id} doesn't found`,
    });
  }
  res.status(200).json({
    data: product,
  });
});

const getAllproducts = expressAsyncHandler(async (req, res, next) => {
  const product = await productModel.find().lean();
  console.log("data");
  if (!product?.length) {
    return res.status(400).json({
      message: "No Product Found",
    });
  }
  // throw new Error("No Product Found");
  res.status(200).json({
    data: product,
  });
});
export default {
  getAllproducts,
  findproduct,
};
