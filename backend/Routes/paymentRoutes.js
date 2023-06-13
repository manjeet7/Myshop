import express from "express";
const router = express.Router();
import paymentController from "../controller/paymentController.js";
import { authUser } from "../middleware/authMiddleware.js";

router.route("/checkout").post(paymentController.Checkouthandler);
router
  .route("/paymentVerification")
  .post(paymentController.paymentVerification);

export default router;
