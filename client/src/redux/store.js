import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slice/authSlice";
import getDataProducts from "./slice/getDataProducts";
import wishlistReducer from "./slice/wishList";
import basketReducer from "./slice/addToBasket";
export default configureStore({
  reducer: {
    auth: AuthReducer,
    product: getDataProducts,
    wishlist: wishlistReducer,
    basket: basketReducer,
  },
});
