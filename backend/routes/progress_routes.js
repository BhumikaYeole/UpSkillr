import { Router } from "express";
import authorize from "../middlewares/auth_middleware.js";
import { allowLearner } from "../middlewares/role_middleware.js";
import {
  completeLesson,
  getCourseProgress,
  getLearnerDashboard,
} from "../controllers/progress_controller.js";

const progressRouter = Router();

progressRouter.get("/dashboard", authorize, allowLearner, getLearnerDashboard);
progressRouter.post("/:courseId/lesson/:lessonId",authorize,allowLearner,completeLesson);
progressRouter.get("/:courseId",authorize,allowLearner,getCourseProgress);


export default progressRouter;
