import { Router } from "express";
import authorize from "../middlewares/auth_middleware.js";
import { allowInstructor, allowLearner } from "../middlewares/role_middleware.js";
import {
  completeLesson,
  getCourseProgress,
  getLearnerDashboard,
  getInstructorDashboard
} from "../controllers/progress_controller.js";

const progressRouter = Router();

progressRouter.get("/dashboard", authorize, allowLearner, getLearnerDashboard);
progressRouter.get("/instructor/dashboard", authorize, allowInstructor, getInstructorDashboard)
progressRouter.post("/:courseId/lesson/:lessonId",authorize,allowLearner,completeLesson);
progressRouter.get("/:courseId",authorize,allowLearner,getCourseProgress);


export default progressRouter;
