import express from "express";
import { authUser } from "../middleware/authMiddleware.js";
const router = express.Router();
import orderController from "../controller/orderController.js";

router.route("/").post(authUser, orderController.createOrder);
router.route("/myOrder").get(authUser, orderController.findUserOrder);
router.route("/:id").get(authUser, orderController.findOrder);
router.route("/:id/pay").put(authUser, orderController.updateOrdertoPaid);

export default router;
