import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js'; 

dotenv.config();

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password'); 
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; 
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
