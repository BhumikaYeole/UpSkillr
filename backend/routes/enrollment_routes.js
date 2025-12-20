import express from "express";
import authorize from "../middlewares/auth_middleware.js";
import { allowLearner } from "../middlewares/role_middleware.js";   
import {
  enrollCourse,
  getUserEnrollments,
  isEnrolled,
} from "../controllers/enrollment_controller.js";

const enrollRouter = express.Router();

enrollRouter.post("/enroll/:courseId", authorize, allowLearner, enrollCourse);
enrollRouter.get("/user-courses", authorize, allowLearner, getUserEnrollments);
enrollRouter.get("/enrolled/:courseId", authorize, allowLearner, isEnrolled);

export default enrollRouter;
