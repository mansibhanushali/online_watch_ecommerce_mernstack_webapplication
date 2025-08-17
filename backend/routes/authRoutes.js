import express from "express"
import { adminLogin, login, logOut, registration } from "../controller/authController.js"

const authRoutes = express.Router()

authRoutes.post("/registration",registration)
authRoutes.post("/login",login)
authRoutes.get("/logout",logOut)
authRoutes.post("/adminlogin",adminLogin)




export default authRoutes