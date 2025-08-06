import jwt from "jsonwebtoken";

const SECRET = "Utpal_Secret";

export function generateToken(payload) {
  console.log(SECRET);
  return jwt.sign(payload, SECRET, { expiresIn: "1d" });
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET);
}
