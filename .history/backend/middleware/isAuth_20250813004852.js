import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    // ✅ Token from cookie or Authorization header
    const token =
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.userId && !decoded?.id) {
      return res.status(403).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    // ✅ Attach to req
    req.userId = decoded.userId || decoded.id;
    req.user = {
      id: req.userId,
      role: decoded.role || "user",
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again",
      });
    }

    console.error("[isAuth] Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Authentication failed",
      error: error.message,
    });
  }
};

export default isAuth;
