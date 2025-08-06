import { loginService, registerService } from "../services/auth.service.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await loginService(email, password);
    res.status(200).json({
      user: data.user,
      token: data.token,
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    res
      .status(401)
      .json({ error: error.message, success: false, message: "Login failed" });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const data = await registerService(name, email, password, confirmPassword);
    res.status(201).json({
      user: data.user,
      token: data.token,
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      success: false,
      message: "Registration failed",
    });
  }
};
