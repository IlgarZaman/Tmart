import express from "express";
import {
  clearBasket,
  createBasket,
  deleteBasket,
  deleteUsersFromBasket,
  getBasket,
  updateBasketItem,
} from "../controllers/basket.js";

const BasketRouter = express.Router();
BasketRouter.get("/", getBasket);
BasketRouter.post("/", createBasket);
BasketRouter.delete("/:userId/:productId", deleteBasket);
BasketRouter.post("/clear", clearBasket);
BasketRouter.put("/:id", updateBasketItem);
BasketRouter.delete("/:id", deleteUsersFromBasket);

export default BasketRouter;
