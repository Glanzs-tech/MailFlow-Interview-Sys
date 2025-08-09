import express from "express";
import * as controller from "@/controllers";
import * as validation from "@/validations";
import { limiter } from "@/security/limiter";

const router = express.Router();

router.route("/signup").post(limiter, validation.auth.user.signup, controller.auth.users.signup);
router.route("/signin").post(limiter, controller.auth.users.signin);
export default router;

