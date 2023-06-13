import paymentModel from "../Models/paymentModel.js";
import { instance } from "../server.js";
import crypto from "crypto";
import expressAsyncHandler from "express-async-handler";

const Checkouthandler = expressAsyncHandler(async (req, res, next) => {
  console.log(req.body.amount);
  const options = {
    amount: Number(req.body.amount * 100), // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  const order = await instance.orders.create(options);
  console.log("order is ", order);
  res.json({
    order,
  });
});

const paymentVerification = async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  console.log(
    "ids is ",
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  );
  let body = razorpay_order_id + "|" + razorpay_payment_id;

  var expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
    .update(body.toString())
    .digest("hex");
  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    await paymentModel.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    res.redirect(
      `http://localhost:3000/confirmation?refrence=${razorpay_payment_id}`
    );
  } else {
    res.status(200).json({
      succes: true,
    });
  }
};

export default {
  Checkouthandler,
  paymentVerification,
};
