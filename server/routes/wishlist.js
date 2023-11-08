import express from "express";
import {
  clearAllData,
  createWishlist,
  deleteUsersFromWishlist,
  deleteWishlist,
  getWishlist,
} from "../controllers/wishlist.js";

const WishlistRouter = express.Router();
WishlistRouter.get("/", getWishlist);
WishlistRouter.post("/", createWishlist);
WishlistRouter.post("/clear", clearAllData);
WishlistRouter.delete("/delete", deleteWishlist);
WishlistRouter.delete("/:id", deleteUsersFromWishlist);

export default WishlistRouter;
