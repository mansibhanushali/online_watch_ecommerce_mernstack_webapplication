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
    return res
      .status(500)
      .json({ message: `getCurrentUser error: ${error.message}` });
  }
};

// ✅ Get Admin Profile (for admin dashboard)
export const getAdminProfile = async (req, res) => {
  try {
    // Token se user ka ID mila hai, ab DB me check karo
    const admin = await User.findById(req.admin.id).select("-password");


    if (!admin || admin.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Admin not found or unauthorized" });
    }

    return res.status(200).json({
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `getAdminProfile error: ${error.message}` });
  }
};
