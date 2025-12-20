import express from "express";
import authorize from "../middlewares/auth_middleware.js";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/user_controller.js";
const userRouter = express.Router();

userRouter.get("/me", authorize, getUserProfile);
userRouter.put("/me", authorize, updateUserProfile);

export default userRouter;