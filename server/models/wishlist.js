import mongoose from "mongoose";
// const ImageDetailSchema = new mongoose.Schema({
//   images: String,
//   originalName: String,
// });
const wishlistSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      },
    ],
  },
  // {
  //   name: {
  //     type: String,
  //     required: true,
  //   },
  //   description: {
  //     type: String,
  //     required: true,
  //   },
  //   sale: {
  //     type: Number,
  //     required: false,
  //   },
  //   discounted: {
  //     type: Number,
  //     required: false,
  //   },
  //   size: {
  //     type: String,
  //     required: false,
  //   },
  //   color: {
  //     type: String,
  //     required: false,
  //   },
  //   images: [ImageDetailSchema],
  //   material: {
  //     type: String,
  //     required: false,
  //   },
  //   type: {
  //     type: String,
  //     required: true,
  //   },
  //   userId: {
  //     type: String,
  //     required: true,
  //   },
  //   productId: {
  //     type: String,
  //     required: true,
  //   },
  // },

  { timestamps: true }
);

const WishlistModal = mongoose.model("Wishlist", wishlistSchema);
export default WishlistModal;
