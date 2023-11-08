import WishlistModal from "../models/wishlist.js";

export const getWishlist = async (req, res) => {
  try {
    const wishlists = await WishlistModal.find().populate("products");

    res.status(200).send(wishlists);
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
};

export const createWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    console.log(userId);
    console.log(productId);
    let wishlist = await WishlistModal.findOne({ userId });

    if (!wishlist) {
      wishlist = new WishlistModal({ userId, products: [productId] });
    } else {
      wishlist.products.push(productId);
    }

    await wishlist.save();

    res.status(200).send({ message: "Product added to wishlist successfully" });
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
};

export const deleteWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    console.log(userId);
    const wishlist = await WishlistModal.findOne({ userId });

    if (!wishlist) {
      return res.status(404).send({ message: "Wishlist not found" });
    }

    const index = wishlist.products.indexOf(productId);
    if (index > -1) {
      wishlist.products.splice(index, 1);
      await wishlist.save();
    }

    res
      .status(200)
      .send({ message: "Product removed from wishlist successfully" });
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
};

export const clearAllData = async (req, res) => {
  try {
    const { userId } = req.body;

    await WishlistModal.findOneAndUpdate({ userId }, { products: [] });

    res.status(200).send({ message: "Wishlist cleared successfully" });
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
};


export const deleteUsersFromWishlist = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUsersFromBasket = await WishlistModal.findByIdAndDelete(id);
    res.json(deleteUsersFromBasket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};