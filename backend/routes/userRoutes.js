import express from "express";
import isAuth from "../middleware/isAuth.js";
import adminAuth from "../middleware/adminAuth.js";
import { getAdminProfile, getCurrentUser } from "../controller/userController.js";

const userRoutes = express.Router();

userRoutes.get("/getcurrentuser", isAuth, getCurrentUser);
userRoutes.get("/getadmin", adminAuth, getAdminProfile);

export default userRoutes;
