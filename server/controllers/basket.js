import BasketModal from "../models/basket.js";
import ProductsModal from "../models/products.js";
export const getBasket = async (req, res) => {
  try {
    const addToCart = await BasketModal.find();
    res.status(200).json(addToCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBasket = async (req, res) => {
  const { userId, productId, size, material, color, quantity } = req.body;

  try {
    const product = await ProductsModal.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const basket = await BasketModal.findOne({ userId });

    if (!basket) {
      const newBasket = new BasketModal({
        userId,
        products: [{ product: productId, size, material, color, quantity }],
      });
      await newBasket.save();
      return res.status(201).json(newBasket);
    }

    const existingProductIndex = basket.products.findIndex(
      (p) =>
        p.product.toString() === productId &&
        p.size === size &&
        p.material === material &&
        p.color === color
    );

    if (existingProductIndex !== -1) {
      basket.products[existingProductIndex].quantity += quantity;
    } else {
      basket.products.push({
        product: productId,
        size,
        material,
        color,
        quantity,
      });
    }

    await basket.save();
    res.status(200).json(basket);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the product from the cart.",
      error,
    });
  }
};

export const deleteBasket = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const basket = await BasketModal.findOne({ userId });

    if (!basket) {
      return res.status(404).json({ message: "Basket not found." });
    }

    basket.products = basket.products.filter(
      (product) => product._id.toString() !== productId
    );

    await basket.save();

    res.status(200).json(basket);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the product from the cart.",
      error,
    });
  }
};

export const updateBasketItem = async (req, res) => {
  const {
    userId,
    productId,
    size,
    material,
    color,
    quantityChange,
    actionType,
    productItemId,
  } = req.body;

  try {
    const basket = await BasketModal.findOne({ userId });

    if (!basket) {
      return res.status(404).json({ message: "Basket not found." });
    }

    const originalProductIndex = basket.products.findIndex(
      (p) => p._id.toString() === productId
    );

    if (actionType === "increase" || actionType === "decrease") {
      if (originalProductIndex === -1) {
        return res
          .status(404)
          .json({ message: "There is no such product in the cart." });
      }

      basket.products[originalProductIndex].quantity += quantityChange;
      if (basket.products[originalProductIndex].quantity <= 0) {
        basket.products.splice(originalProductIndex, 1);
      }
    } else {
      const updatedProductIndex = basket.products.findIndex(
        (p) =>
          p.product.toString() === productItemId &&
          p.size === size &&
          p.material === material &&
          p.color === color
      );

      if (updatedProductIndex !== -1) {
        basket.products[updatedProductIndex].quantity +=
          basket.products[originalProductIndex].quantity;
        if (originalProductIndex !== updatedProductIndex) {
          basket.products.splice(originalProductIndex, 1);
        }
      } else if (originalProductIndex !== -1) {
        basket.products[originalProductIndex].size = size;
        basket.products[originalProductIndex].material = material;
        basket.products[originalProductIndex].color = color;
        basket.products[originalProductIndex].quantity += quantityChange;
      } else {
        basket.products.push({
          product: productId,
          size,
          material,
          color,
          quantity: quantityChange,
        });
      }
    }

    await basket.save();
    res.status(200).json(basket);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while updating the cart.", error });
  }
};

export const clearBasket = async (req, res) => {
  try {
    const { userId } = req.body;

    await BasketModal.findOneAndUpdate({ userId }, { products: [] });

    res.status(200).send({ message: "Wishlist cleared successfully" });
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
};
export const deleteUsersFromBasket = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUsersFromBasket = await BasketModal.findByIdAndDelete(id);
    res.json(deleteUsersFromBasket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
