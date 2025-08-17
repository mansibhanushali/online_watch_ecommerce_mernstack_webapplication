import jwt from "jsonwebtoken";

export const genToken = (userId, role = "user") => {
  try {
    return jwt.sign(
      { userId, role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  } catch (error) {
    console.log("token error", error);
  }
};

export const genToken1 = (userId,email) => {
  try {
    return jwt.sign(
      {userId, email, role: "admin" }, // admin role fix
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  } catch (error) {
    console.log("token error", error);
  }
};
