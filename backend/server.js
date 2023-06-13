import app from "./app.js";
import RazorPay from "razorpay";

export const instance = new RazorPay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

console.log("instance ", process.env.RAZORPAY_API_KEY);

app.listen(4009, (req, res) => {
  console.log("app is running at port 4009");
});
