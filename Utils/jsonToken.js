import jwt from "jsonwebtoken";

export function generateToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
}
