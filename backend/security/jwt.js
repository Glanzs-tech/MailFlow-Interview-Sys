import config from "@/config";
import jwt from "jsonwebtoken";

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, config.ACCESS_TOKEN_SECRET, { algorithm: "HS256", expiresIn: config.ACCESS_TOKEN_EXPIRY });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, config.REFRESH_TOKEN_SECRET, { algorithm: "HS256", expiresIn: config.REFRESH_TOKEN_EXPIRY });
};

export const decodeToken = (token, type = "refresh") => {
  try {
    const secret = type === "refresh" ? config.REFRESH_TOKEN_SECRET : config.ACCESS_TOKEN_SECRET;
    jwt.verify(token.replace("Bearer ", ""), secret, {
      algorithms: ["HS256"],
    });
    return jwt.decode(token.replace("Bearer ", ""));
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const encodeToken = (payload, type = "refresh") => {
  const secret = type === "refresh" ? config.REFRESH_TOKEN_SECRET : config.ACCESS_TOKEN_SECRET;
  return jwt.sign(payload, secret, { algorithm: "HS256", expiresIn: "5m" });
};
