import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {               
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sizes: {
    type: Array,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  bestseller: {
    type: Boolean,
  },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
