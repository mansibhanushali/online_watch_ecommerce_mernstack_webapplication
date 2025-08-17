import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1] ||
      req.body?.token;

    if (!token || typeof token !== "string" || token.trim() === "") {
      return res
        .status(401)
        .json({ message: "Authentication token missing or invalid" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Check if role is admin
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Admins only." });
    }

    // ✅ Set admin info on request
    req.admin = {
      id: decoded.userId || null,
      email: decoded.email || null,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.error("adminAuth error:", error.message);
    return res
      .status(401)
      .json({ message: "Authentication failed", error: error.message });
  }
};

export default adminAuth;


export default adminAuth;
