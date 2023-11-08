import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import usersRouter from "./routes/users.js";
import ProductRouter from "./routes/products.js";
import WishlistRouter from "./routes/wishlist.js";
import { v2 as cloudinary } from "cloudinary";
import BasketRouter from "./routes/basket.js";

const app = express();
dotenv.config();
app.use(morgan("dev")), app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/", express.static("uploads"));
app.use(cors());
app.use("/users", usersRouter);
app.use("/products", ProductRouter);
app.use("/wishlist", WishlistRouter);
app.use("/basket", BasketRouter);
app.get("/", (req, res) => {
  res.json({ message: "Welcome 'Tmart' website server" });
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const PORT = process.env.PORT;
const DB = process.env.DB_URL.replace("<password>", process.env.PASSWORD);
mongoose.connect(
  DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      app.listen(PORT, () => {
        console.log(`url: http://localhost:${PORT}`);
      });
    }
  }
);
