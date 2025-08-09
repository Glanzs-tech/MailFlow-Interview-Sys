import isEmpty from "is-empty";
import ms from "ms";
import { v4 as uuid } from "uuid";
import config from "@/config";
import { User, Security, Tokens, UserSecurity } from "@/models";
import { decodeToken, generateAccessToken, generateRefreshToken } from "@/security/jwt";
import { comparePassword, hashingOTP, generatePassword, compareOTP } from "@/security/password";
import generateOTP from "@/utils/generateOtp";

export const signup = async (req, res) => {
  try {
    const { body } = req;
    const existingUser = await User.findOne({ email: body.email.toLowerCase() });

    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exist, Please login to continue." });
    }

    const { hash, status } = await generatePassword(body?.password);
    if (!status) {
      return res.status(500).json({ success: false, message: "Something went wrong" });
    }
    console.log("hash", hash);

    const user = await User.create({
      email: body?.email.toLowerCase(),
      password: hash,
      name: body?.name,
    });
    console.log("67544");
    const sessionId = uuid();
    const accessToken = `Bearer ${generateAccessToken({ sessionId, id: user._id })}`;
    const refreshToken = `Bearer ${generateRefreshToken({ sessionId, id: user._id })}`;
    console.log(accessToken, "jnjnj");
    const token = await Tokens.create({
      clientId: user._id,
      sessionId: sessionId,
      accessToken: accessToken,
      refreshToken: refreshToken,
      expiration: new Date(Date.now() + ms(config.REFRESH_TOKEN_EXPIRY)),
    });

    console.log(token, "9809");
    const cookieOptions = {
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
      path: "/",
      maxAge: ms(config.REFRESH_TOKEN_EXPIRY),
    };

    res.header("Access-Control-Allow-Origin", config.FRONTEND_URL);
    res.header("Access-Control-Allow-Headers", "secure", "Origin, X-Requested-With, Content-Type, Accept");
    res.cookie("refreshToken", refreshToken,cookieOptions);
    res.cookie("accessToken", accessToken,cookieOptions);

    return res.status(201).json({
      success: true,
      message: "Signup successful. Redirecting to dashboard...",
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ success: false, message: "Something went wrong during signup" });
  }
};

export const signin = async (req, res) => {
  try {
    const { body } = req;

    const user = await User.findOne({ email: body?.email.toLowerCase() });
    if (isEmpty(user)) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (isEmpty(body.password)) {
      return res.status(404).json({ success: false, message: "Password is required" });
    }
    const isMatch = await comparePassword(body.password, user.password);

    if (!isMatch.status) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const sessionId = uuid();
    const accessToken = `Bearer ${generateAccessToken({ sessionId, id: user._id })}`;
    const refreshToken = `Bearer ${generateRefreshToken({ sessionId, id: user._id })}`;

    await Tokens.create({
      clientId: user._id,
      sessionId: sessionId,
      accessToken: accessToken,
      refreshToken: refreshToken,
      expiration: new Date(Date.now() + ms(config.REFRESH_TOKEN_EXPIRY)),
    });

     const cookieOptions = {
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
      path: "/",
      maxAge: ms(config.REFRESH_TOKEN_EXPIRY),
    };

    res.header("Access-Control-Allow-Origin", config.FRONTEND_URL);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.cookie("refreshToken", refreshToken,cookieOptions);
    res.cookie("accessToken", accessToken,cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Signin successful. Redirecting to dashboard...",
      user: { id: user._id, email: user.email, name: user.name },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error("Signin error:", err);
    return res.status(500).json({ success: false, message: "Something went wrong during signin" });
  }
};
