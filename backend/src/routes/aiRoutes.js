import express from "express";
import { generateEmailContent, generateSubject } from "../controllers/aiController.js";

const router = express.Router();

router.post("/generate-email", generateEmailContent);
router.post("/generate-subject", generateSubject);

export default router;
