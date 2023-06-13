import express from "express";
import userController from "../controller/userController.js";
const router = express.Router();
import { admin, authUser } from "../middleware/authMiddleware.js";

router.route("/auth/login").post(userController.authUser);
router
  .route("/update")
  .get(authUser, userController.userDetails)
  .put(authUser, userController.updateuserProfile);
router.route("/register").post(userController.registerUser);
router.route("/admin/users").get(authUser, admin, userController.getAllUsers);
router
  .route("/admin/:id")
  .delete(authUser, admin, userController.deleteUsers)
  .get(authUser, admin, userController.getUser)
  .put(authUser, admin, userController.updateuser);
export default router;
