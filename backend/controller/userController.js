import User from "../model/userModel.js";

// ✅ Get Current Logged-In User (for regular users)
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("getCurrentUser error:", error);
    return res.status(500).json({
      success: false,
      message: `getCurrentUser error: ${error.message}`,
    });
  }
};

// ✅ Get Admin Profile (for admin dashboard)
export const getAdminProfile = async (req, res) => {
  try {
    // Agar .env wale admin login kiya hai to DB lookup skip
    if (
      req.adminEmail === process.env.ADMIN_EMAIL &&
      req.adminId && req.adminId.toString().length === 24 // valid ObjectId
    ) {
      // Try DB lookup, lekin agar nahi mila to fallback dummy
      const adminFromDb = await User.findById(req.adminId).select("-password");
      if (adminFromDb) {
        return res.status(200).json({
          success: true,
          admin: {
            id: adminFromDb._id,
            name: adminFromDb.name,
            email: adminFromDb.email,
            role: adminFromDb.role,
          },
        });
      }
      // Fallback dummy admin
      return res.status(200).json({
        success: true,
        admin: {
          id: req.adminId,
          name: "Admin",
          email: req.adminEmail,
          role: "admin",
        },
      });
    }

    // Agar DB me admin ka record hai
    const admin = await User.findById(req.adminId).select("-password");

    if (!admin || admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("getAdminProfile error:", error);
    return res.status(500).json({
      success: false,
      message: `getAdminProfile error: ${error.message}`,
    });
  }
};

