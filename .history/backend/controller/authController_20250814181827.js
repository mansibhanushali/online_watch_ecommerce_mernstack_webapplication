// controllers/authController.js
import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// ✅ Generate JWT with role
const genToken = (userId, role, email) => {
  return jwt.sign({ userId, role, email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const registration = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) return res.status(400).json({ message: "User already exist" });
    if (!validator.isEmail(email)) return res.status(400).json({ message: "Enter valid Email" });
    if (password.length < 8) return res.status(400).json({ message: "Enter Strong Password" });

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashPassword, role: role || "user" });

    const token = genToken(user._id, user.role, user.email);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.log("registration error", error);
    return res.status(500).json({ message: `registration error ${error}` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User is not Found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    const token = genToken(user._id, user.role, user.email);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.log("login error", error);
    return res.status(500).json({ message: `Login error ${error}` });
  }
};

// ✅ Admin login (supports both .env hardcoded admin and DB admin)
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔹 Step 1: .env admin check
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const dummyId = new mongoose.Types.ObjectId();

      const token = genToken(dummyId, "admin", email);

      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // change to true in production with HTTPS
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        token,
        admin: { id: dummyId, name: "Admin", email, role: "admin" },
      });
    }

    // 🔹 Step 2: DB admin check
    const admin = await User.findOne({ email, role: "admin" });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    const token = genToken(admin._id, admin.role, admin.email);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (error) {
    console.log("adminLogin error", error);
    return res.status(500).json({ message: `Admin login error: ${error.message}` });
  }
};


export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Logout error", error);
    return res.status(500).json({ message: `Logout error ${error}` });
  }
};
