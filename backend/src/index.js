import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import dbConnection from "./common/config/database-connection.js";

dotenv.config();

const app = express();
dbConnection();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
