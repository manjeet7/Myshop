import express from "express";
const router = express.Router();
import productController from "../controller/product.js";

router.route("/product").get(productController.getAllproducts);
router.route("/product/:id").get(productController.findproduct);

export default router;
