import express from "express";
import { allowLearner } from "../middlewares/role_middleware.js";
import { generateCertificate } from "../controllers/certificate_controller.js";
import authorize from "../middlewares/auth_middleware.js";

const certificateRouter = express.Router();

certificateRouter.get(
  "/course/:courseId/certificate",
  authorize,
  allowLearner,
  generateCertificate
);

export default certificateRouter;