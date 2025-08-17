// backend/controller/cartController.js

import User from "../model/userModel.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;

    const userData = await User.findById(req.userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Initialize or update cart
    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    await User.findByIdAndUpdate(req.userId, { cartData });

    return res.status(201).json({ message: "Added to cart" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "addToCart error" });
  }
};

// Update item quantity in cart
export const updateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;

    const userData = await User.findById(req.userId);
    let cartData = userData.cartData;

    if (!cartData[itemId] || !cartData[itemId][size]) {
      return res.status(400).json({ message: "Item not found in cart" });
    }

    cartData[itemId][size] = quantity;

    await User.findByIdAndUpdate(req.userId, { cartData });

    return res.status(201).json({ message: "Cart updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "updateCart error" });
  }
};

// Get current user cart
export const getUserCart = async (req, res) => {
  try {
    const userData = await User.findById(req.userId);
    let cartData = userData.cartData;

    return res.status(200).json(cartData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "getUserCart error" });
  }
};
