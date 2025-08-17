import Order from "../model/orderModel.js";
import User from "../model/userModel.js";

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Currency (not needed now, but you can keep it for later use)
const currency = 'inr';

// ✅ Place Order (COD)
export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    const orderData = {
      items,
      amount,
      userId,
      address,
      paymentMethod: 'COD',
      payment: false,
      status: 'pending',
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    // Clear user's cart
    await User.findByIdAndUpdate(userId, { cartData: {} });

    return res.status(201).json({ message: 'Order Placed' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Order placement failed' });
  }
};

// ✅ Get orders for current user
export const userOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ userId }).sort({});
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to fetch user orders" });
  }
};

// ✅ Admin: Get all orders
export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to fetch all orders" });
  }
};

// ✅ Admin: Update order status
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await Order.findByIdAndUpdate(orderId, { status });
    return res.status(201).json({ message: 'Status Updated' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
