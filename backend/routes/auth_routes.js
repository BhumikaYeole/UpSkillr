import { Router } from "express";
import { signIn, signUpLearner, signUpInstructor } from "../controllers/auth_controller.js";

const authRouter = Router()

authRouter.post("/sign-up/learner", signUpLearner)
authRouter.post("/sign-up/instructor", signUpInstructor)
authRouter.post("/sign-in", signIn)

export default authRouter