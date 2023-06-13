import asyncHandler from "express-async-handler";
import Users from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/jwtTokens.js";

const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await Users.findOne({ email }).lean();
  if (!user) {
    res.status(500);
    throw new Error("No User found");
  }
  //   console.log(user);
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    res.status(500);
    throw new Error("Please Enter Correct Password");
  }
  if (user && isPasswordMatch) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  }
});
const registerUser = asyncHandler(async (req, res, next) => {
  console.log("register ", req.body);
  const { email, password, name } = req.body;
  if (!email && !password && !name) {
    throw new Error("Please try with appropriate data");
  }
  const exist = await Users.findOne({ email }).lean();
  if (exist) {
    throw new Error(`user with email ${email} already exist`);
  }
  const user = await Users.create({
    email,
    name,
    password,
  });
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  }
});
const userDetails = asyncHandler(async (req, res, next) => {
  const user = await Users.findById(req.user._id);
  if (!user) {
    throw new Error("No user found");
  }
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

const updateuserProfile = asyncHandler(async (req, res, next) => {
  const user = await Users.findById(req.user._id);
  if (!user) {
    throw new Error("No user found");
  }
  if (user) {
    (user.name = req.body.name), (user.email = req.body.email);
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updateuser = await user.save();
    res.json({
      _id: updateuser._id,
      name: updateuser.name,
      email: updateuser.email,
      isAdmin: updateuser.isAdmin,
      token: generateToken(updateuser._id),
    });
  }
});

const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await Users.find({});
  console.log("user is ", users);
  if (!users) {
    throw new Error("No Users Found");
  }
  res.json(users);
});

const deleteUsers = asyncHandler(async (req, res, next) => {
  const user = await Users.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("No User Found");
  }
  await user.delete();
  res.status(201);
  res.json({
    message: `User with ID ${req.params.id} deleted successfully`,
  });
});

const getUser = asyncHandler(async (req, res, next) => {
  const user = await Users.findById(req.params.id);
  if (!user) {
    throw new Error("No user found");
  }
  res.status * 201;
  res.jsonp(user);
});

const updateuser = asyncHandler(async (req, res, next) => {
  const user = await Users.findById(req.params.id);
  if (!user) {
    throw new Error("No user found");
  }
  if (user) {
    (user.name = req.body.name), (user.email = req.body.email);

    const updateuser = await user.save();
    res.json({
      _id: updateuser._id,
      name: updateuser.name,
      email: updateuser.email,
      isAdmin: updateuser.isAdmin,
    });
  }
});

export default {
  authUser,
  userDetails,
  registerUser,
  updateuserProfile,
  getAllUsers,
  deleteUsers,
  getUser,
  updateuser,
};
