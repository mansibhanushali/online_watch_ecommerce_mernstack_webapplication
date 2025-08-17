import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from "path";
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { fileURLToPath } from "url";
import uploadOnCloudinary from './config/cloudinary.js'

dotenv.config()

const port = process.env.PORT || 8000
const app = express()
const __dirname = path.resolve();
const __filename = fileURLToPath(import.meta.url);

app.use(express.json())
app.use(cookieParser())

// ✅ CORS setup with credentials enabled
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}))

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.get("/", (req, res) => {
  res.send("Welcome to the API. Server is running.");
})

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`)
  connectDb()
})
