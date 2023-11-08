import ProductsModal from "../models/products.js";
import { v2 as cloudinary } from "cloudinary";
export const getProducts = async (req, res) => {
  try {
    const products = await ProductsModal.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductsById = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await ProductsModal.findById(id);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createProducts = async (req, res) => {
  try {
    const { name, description, sale, discounted, size, color, material, type } =
      req.body;

    const imageDetails = [];

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path);
      imageDetails.push({
        images: result.secure_url,
        originalName: file.originalname,
       
      });
    }

    const images = await ProductsModal.create({
      images: imageDetails,
      name,
      description,
      sale,
      discounted,
      size,
      material,
      type,
      color
    });

    res.status(201).json({
      success: true,
      data: images,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteProducts = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProducts = await ProductsModal.findByIdAndDelete(id);
    res.json(deleteProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProducts = async (req, res) => {
  console.log(req);
  const { id } = req.params;
  try {
    const updatedProducts = await ProductsModal.findByIdAndUpdate(id, req.body);
    res.json(updatedProducts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
