import mongoose from "mongoose";

const basketItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  color: {
    type: String,
    required: false,
  },
  size: {
    type: String,
    required: false,
  },
  material: {
    type: String,
    required: false,
  },
});
const basketSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [basketItemSchema],
  },
  { timestamps: true }
);

const BasketModal = mongoose.model("Basket", basketSchema);
export default BasketModal;
