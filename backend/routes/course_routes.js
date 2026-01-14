import express from "express";
import { allowInstructor } from "../middlewares/role_middleware.js";
import authorize from "../middlewares/auth_middleware.js";
import { 
  createCourse, 
  addSection, 
  addLesson,
  getCourseCurriculum,
  getCourses,
  updateCourse,
  deleteCourse,
  updateSection,
  deleteSection,
  updateLesson,
  deleteLesson
} from "../controllers/course_controller.js";

const courseRouter = express.Router();

// Instructor-only routes
courseRouter.post("/", authorize, allowInstructor, createCourse);
courseRouter.post("/:courseId/section", authorize, allowInstructor, addSection);
courseRouter.post("/:courseId/section/:sectionId/lesson", authorize, allowInstructor, addLesson);

courseRouter.put("/courses/:courseId", authorize, allowInstructor, updateCourse);
courseRouter.delete("/courses/:courseId", authorize, allowInstructor, deleteCourse);


courseRouter.put("/sections/:sectionId", authorize, allowInstructor, updateSection);
courseRouter.delete("/sections/:sectionId", authorize, allowInstructor, deleteSection);

courseRouter.put("/lessons/:lessonId", authorize, allowInstructor, updateLesson);
courseRouter.delete("/lessons/:lessonId", authorize, allowInstructor, deleteLesson);


// Public routes
courseRouter.get("/:courseId/curriculum", getCourseCurriculum);
courseRouter.get("/", getCourses);



export default courseRouter;
