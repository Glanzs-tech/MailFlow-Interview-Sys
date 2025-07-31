import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import campaignRoutes from "./src/routes/campaignRoutes.js";
import contactRoutes from "./src/routes/contactRoutes.js";
import analyticsRoutes from "./src/routes/analyticsRoutes.js";
import emailRoutes from './src/routes/emailRoutes.js';
import aiRoutes from "./src/routes/aiRoutes.js"; 

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/ai", aiRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
