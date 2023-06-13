import expressAsyncHandler from "express-async-handler";
import orderModel from "../Models/orderModel.js";
import userModel from "../Models/userModel.js";

const createOrder = expressAsyncHandler(async (req, res, next) => {
  const {
    orderItems,
    ShippingPrice,
    ItemPrice,
    shippingAddress,
    paymentmethod,
    GstPrice,
    TotalPrice,
  } = req.body;
  console.log("order is ", req.user._id);
  if (!orderItems) {
    res.status(400);
    throw new Error("No Order found");
    return;
  } else {
    const Order = new orderModel({
      orderItems,
      user: req.user._id,
      ShippingPrice,
      ItemPrice,
      shippingAddress,
      GstPrice,
      TotalPrice,
      paymentmethod: "paypal",
    });
    const createdOrder = await Order.save();
    res.status(201);
    res.json(createdOrder);
  }
});

const findOrder = expressAsyncHandler(async (req, res, next) => {
  console.log("find orders");
  const order = await orderModel
    .findById(req.params.id)
    .populate("user", "name email");
  if (!order) {
    return res.status(500).json({
      message: `product with id ${req.params.id} doesn't found`,
    });
  }
  res.status(200).json({
    data: order,
  });
});

const updateOrdertoPaid = expressAsyncHandler(async (req, res, next) => {
  console.log("find orderss");
  const order = await orderModel.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidat = Date.now();
    const updatedOrder = await order.save();
    res.status(201);
    res.json(updateOrdertoPaid);
  } else {
    res.status(500);
    throw new Error("Order not found");
  }
});

const findUserOrder = expressAsyncHandler(async (req, res, next) => {
  console.log("user is  ", req.user);
  const order = await orderModel.find({ user: req.user._id });
  console.log("order is ", order);
  if (!order) {
    return res.status(500).json({
      message: "No order found with user",
    });
  }
  res.status(200).json({
    data: order,
  });
});

export default {
  createOrder,
  findOrder,
  updateOrdertoPaid,
  findUserOrder,
};
