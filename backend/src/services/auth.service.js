import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { generateToken } from "../utils/jwt.js";

export const registerService = async (
  name,
  email,
  password,
  confirmPassword
) => {
  if (!name || !email || !password || !confirmPassword) {
    throw new Error("Name, email, and password are required");
  }
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  const payload = {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
  };

  const token = generateToken(payload);

  return {
    user: payload,
    token: token,
  };
};

export const loginService = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
  };

  const token = generateToken(payload);

  return {
    user: payload,
    token: token,
  };
};
