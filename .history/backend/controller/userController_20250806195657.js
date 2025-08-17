import User from "../model/userModel.js";

// ✅ Get Current Logged-In User (for regular users)
export const getCurrentUser = async (req, res) => {
  try {
    let user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `getCurrentUser error: ${error.message}` });
  }
};

// ✅ Get Admin Profile (for admin dashboard)
export const getAdminProfile = async (req, res) => {
  try {
    let adminEmail = req.admin?.email; // ✅ fixed lowercase + optional chaining
    if (!adminEmail) {
      return res.status(404).json({ message: "Admin not found" });
    }
    return res.status(200).json({
      email: adminEmail,
      role: "admin",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `getAdminProfile error: ${error.message}` });
  }
};
