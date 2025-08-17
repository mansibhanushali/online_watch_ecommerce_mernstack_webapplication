import express from 'express';
import {
  addProduct,
  listProduct,
  removeProduct,
  updateProduct,
} from '../controller/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from "../middleware/adminAuth.js";

let productRoutes = express.Router();

// Add product (with image upload)
productRoutes.post(
  "/addproduct",
  upload.fields([{ name: "image", maxCount: 1 }]),
  addProduct
);

// List products
productRoutes.get("/list", listProduct);

// Remove product (admin only)
productRoutes.post("/remove/:id", adminAuth, removeProduct);

// ✅ Update product (with optional image upload)
productRoutes.put(
  "/update/:id",
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateProduct
);

export default productRoutes;
