import express from "express";
import * as controller from "@/controllers";
import { limiter } from "@/security/limiter";
import { upload } from "../../middleware/uploadMiddleware";
import { userAuthenticate as userAuth } from "@/security/passport";


const router = express.Router();

router.route("/send-mail").post(limiter,userAuth, upload.single("email"), controller.v1.users.uploadContactsFromExcel);
router.route("/dashboard").get(limiter,userAuth, controller.v1.users.dashboard);

export default router;