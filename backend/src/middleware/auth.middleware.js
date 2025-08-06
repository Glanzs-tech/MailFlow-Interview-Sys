import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({
      message: "No token provided",
      success: false,
      error: "Unauthorized",
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user)
      return res.status(400).json({
        message: "User doesn't exist",
        success: false,
        error: "Unauthorized",
      });

    req.user = decoded;
    next();
  } catch {
    res.status(401).json({
      message: "Unauthorized",
      success: false,
      error: "Invalid token",
    });
  }
};
