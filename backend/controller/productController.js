import uploadOnCloudinary from "../config/cloudinary.js";
import Product from "../model/productModel.js";

// ✅ Add Product
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, bestseller } = req.body;

    // Upload the image to Cloudinary
    const image = await uploadOnCloudinary(req.files.image[0].path);

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      bestseller: bestseller === "true",
      date: Date.now(),
      image,
    };

    const product = await Product.create(productData);
    return res.status(201).json(product);
  } catch (error) {
    console.error("AddProduct error:", error);
    return res.status(500).json({ message: `AddProduct error: ${error.message}` });
  }
};

// ✅ List Products
export const listProduct = async (req, res) => {
  try {
    const products = await Product.find().sort({ date: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("ListProduct error:", error);
    res.status(500).json({ message: "Error listing products", error });
  }
};

// ✅ Remove Product
export const removeProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    console.error("RemoveProduct error:", error);
    res.status(500).json({ message: "Error removing product", error });
  }
};

// ✅ Update Product
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price, category, bestseller } = req.body;

    let updatedData = {
      name,
      description,
      price: Number(price),
      category,
      bestseller: bestseller === "true",
    };

    // If a new image is uploaded
    if (req.files && req.files.image && req.files.image[0]) {
      const image = await uploadOnCloudinary(req.files.image[0].path);
      updatedData.image = image;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("UpdateProduct error:", error);
    res.status(500).json({ message: "Update product failed", error });
  }
};
