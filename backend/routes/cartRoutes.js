// backend/routes/cartRoutes.js

import express from 'express';
import { getUserCart, addToCart, updateCart } from '../controller/cartController.js';
import isAuth from '../middleware/isAuth.js';

const router = express.Router();

router.post("/add", isAuth, addToCart);
router.post("/get", isAuth, getUserCart);
router.post("/update", isAuth, updateCart);

export default router;
