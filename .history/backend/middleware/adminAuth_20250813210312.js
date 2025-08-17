import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Not Authorized. Login Again." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    req.adminId = decoded.userId;
    req.adminEmail = decoded.email;

    next();
  } catch (error) {
    console.error("adminAuth error", error);
    return res.status(500).json({ message: `adminAuth error: ${error.message}` });
  }
};

export default adminAuth;
