import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import Product from "../model/productModel.js"; 

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

const currency = 'inr';

// ✅ Place Order (COD)
export const placeOrder = async (req, res) => {
  try {
    const { amount, address } = req.body;
    const userId = req.userId;

    // Get user's cart
    const user = await User.findById(userId);
  

    if (!user || !user.cartData || Object.keys(user.cartData).length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Build items array from cartData
    const cartItems = [];
    for (let productId in user.cartData) {
      let quantity = user.cartData[productId];

      // 🔹 Handle case where quantity is stored inside object (e.g., { undefined: 4 })
      if (typeof quantity === "object" && quantity !== null) {
        quantity = Object.values(quantity)[0];
      }

      if (quantity > 0) {
        const product = await Product.findById(productId).lean();
        if (product) {
          cartItems.push({
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity,
          });
        }
      }
    }

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "No valid products in cart" });
    }

    // Create order data
    const orderData = {
      items: cartItems,
      amount,
      userId,
      address,
      paymentMethod: "COD",
      payment: false,
      status: "pending",
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    // Clear user's cart
    await User.findByIdAndUpdate(userId, { cartData: {} });

    return res.status(201).json({ message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Order placement failed" });
  }
};

// ✅ Get orders for current user
export const userOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to fetch user orders" });
  }
};

// ✅ Admin: Get all orders
export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
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
 // controllers/orderController.js
export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Sirf pending orders cancel honge
    if (order.status !== "pending") {
      return res.status(400).json({ message: "Only pending orders can be cancelled" });
    }

    order.status = "Cancelled";
    await order.save();

    res.json({ message: "Order cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
