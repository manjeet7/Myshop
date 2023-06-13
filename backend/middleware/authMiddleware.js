import jwt from "jsonwebtoken";
import Users from "../Models/userModel.js";
import expressAsyncHandler from "express-async-handler";

export const authUser = expressAsyncHandler(async (req, res, next) => {
  let token;
  console.log("reached the method");
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log(req.headers.authorization);
    try {
      token = req.headers.authorization.split(" ")[1];
      // console.log("token ", token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log( decoded);
      req.user = await Users.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(500);
      throw new Error(error);
    }
  }
  if (!token) {
    res.status(400);
    throw new Error("Not Authorized to Acess This Route");
  }
});

export const admin = expressAsyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    throw new Error("Not Authorized For Admin Routes");
  }
});
