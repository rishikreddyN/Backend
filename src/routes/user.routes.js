import { Router } from "express";
import { registerUser } from "../controllers/user.controller";
export const router=Router()

//routes declaration
router.route("/register").post(registerUser)