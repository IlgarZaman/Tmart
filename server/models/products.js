import mongoose from "mongoose";

const ImageDetailSchema = new mongoose.Schema({
  images: String,
  originalName: String,
});

const productsSchema = mongoose.Schema(
  {
    images: [ImageDetailSchema],
    name: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    sale: {
      type: Number,
      required: false,
    },
    discounted: {
      type: Number,
      required: false,
    },
    size: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: false,
    },

    material: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const ProductsModal = mongoose.model("Products", productsSchema);
export default ProductsModal;
