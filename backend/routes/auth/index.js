import express from "express";

import userRoutes from "./user.routes";
const router = express.Router();

router.use("/user", userRoutes);

export default router;
