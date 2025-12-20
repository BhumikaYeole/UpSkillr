import express from "express";
import authorize from "../middlewares/auth_middleware.js";
import { allowInstructor, allowLearner } from "../middlewares/role_middleware.js";
import {
  addResource,
  deleteResource,
  getCourseResources,
  downloadResource,
} from "../controllers/resource_controller.js";

const resourceRouter = express.Router();

// Instructor
resourceRouter.post(
  "/instructor/course/:courseId/resource",
  authorize,
  allowInstructor,
  addResource
);

resourceRouter.delete(
  "/instructor/resource/:resourceId",
  authorize,
  allowInstructor,
  deleteResource
);

// Learner
resourceRouter.get(
  "/learner/course/:courseId/resources",
  authorize,
  allowLearner,
  getCourseResources
);

resourceRouter.get(
  "/learner/resource/:resourceId/download",
  authorize,
  allowLearner,
  downloadResource
);

export default resourceRouter;
