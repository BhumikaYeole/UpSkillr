import express from "express";
import { allowLearner } from "../middlewares/role_middleware.js";
import { generateCertificate, verifyCertificate } from "../controllers/certificate_controller.js";
import authorize from "../middlewares/auth_middleware.js";

const certificateRouter = express.Router();

certificateRouter.get(
  "/course/:courseId/certificate",
  authorize,
  allowLearner,
  generateCertificate
);

certificateRouter.get(
  "/:certificateId",
  authorize,
  verifyCertificate
);

export default certificateRouter;