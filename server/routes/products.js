import express from "express";

import {
  createProducts,
  deleteProducts,
  getProducts,
  getProductsById,
  updateProducts,
} from "../controllers/products.js";
import { uploadMultiMiddleware } from "../middleware/multiUploadMiddleware.js";

const ProductRouter = express.Router();
ProductRouter.get("/", getProducts);
ProductRouter.post("/", uploadMultiMiddleware.array("images", 5), createProducts);
ProductRouter.delete("/:id", deleteProducts);
ProductRouter.get("/:id", getProductsById);
ProductRouter.put("/:id", updateProducts);

export default ProductRouter;
