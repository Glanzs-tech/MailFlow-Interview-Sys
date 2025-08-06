import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      ` MongoDB connected SuccessFully to ${connection.connection.host}:${connection.connection.port}`
    );
  } catch (error) {
    console.error(" MongoDB connection failed:", error.message);
  }
};

export default dbConnection;
