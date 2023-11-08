import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api-addToBasket";

export const allBaskets = createAsyncThunk("basket/allBaskets", async () => {
  try {
    const response = await api.getBaskets();
    return response.data;
  } catch (err) {
    return err.response.data;
  }
});

export const addBasket = createAsyncThunk(
  "basket/addBasket",
  async ({ data, enqueueSnackbar }) => {
    try {
      const response = await api.addBasket(data);
      const message = "Product Added in Basket!";
      const addSucess = () => enqueueSnackbar(message, { variant: "success" });
      addSucess();
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const deleteBasket = createAsyncThunk(
  "basket/deleteBasket",
  async ({ userId, productId, enqueueSnackbar }, { rejectWithValue }) => {
    try {
      const data = {
        userId: userId,
        productId: productId,
      };
      await api.deleteBasket(userId, productId);
      const message = "Product Deleted in Basket!";
      const deleteSucess = () =>
        enqueueSnackbar(message, { variant: "success" });
      deleteSucess();
      return data.productId;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateBasket = createAsyncThunk(
  "basket/updateBasket",
  async ({ updateData }, { rejectWithValue }) => {
    try {
      const response = await api.updateBasketItem(updateData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const deleteUserBasket = createAsyncThunk(
  "basket/deleteUserBasket",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.deleteUserBasket(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const clearBasketAsync = createAsyncThunk(
  "basket/clearBasket",
  async ({ userId, enqueueSnackbar }) => {
    try {
      const data = {
        userId: userId,
      };
      const message = "Clear all products in wishlist!";
      const clearSucess = () =>
        enqueueSnackbar(message, { variant: "success" });
      clearSucess();
      const response = await api.clearBasket(data);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
const addBasketSlice = createSlice({
  name: "basket",
  initialState: {
    error: "",
    loadingBasket: false,
    basket: [],
    allUserBasket: [],
  },

  extraReducers: (builder) => {
    builder
      .addCase(addBasket.pending, (state, action) => {
        state.loadingBasket = true;
      })
      .addCase(addBasket.fulfilled, (state, action) => {
        state.loadingBasket = false;
      })
      .addCase(addBasket.rejected, (state, action) => {
        state.loadingBasket = false;
        state.error = action.payload.message;
      })
      .addCase(allBaskets.pending, (state, action) => {
        state.loadingBasket = true;
      })
      .addCase(allBaskets.fulfilled, (state, action) => {
        state.loadingBasket = false;
        state.basket = action.payload;
        state.allUserBasket = action.payload;
        const user = JSON.parse(localStorage.getItem("user"));
        user === null
          ? (state.basket = [])
          : (state.basket = state.basket?.filter(
              (item) => item?.userId === user.userTokenId?.id
            ));
        if (state.basket.length !== 0) {
          state.basket = state.basket[0].products;
        }
      })
      .addCase(allBaskets.rejected, (state, action) => {
        state.loadingBasket = false;
        state.error = action.payload;
      })
      .addCase(deleteBasket.pending, (state, action) => {
        state.loadingBasket = true;
      })
      .addCase(deleteBasket.fulfilled, (state, action) => {
        state.loadingBasket = false;
        const { productId } = action.payload;
        state.basket = state.basket.filter((item) => item._id !== productId);
      })
      .addCase(deleteBasket.rejected, (state, action) => {
        state.loadingBasket = false;
        state.error = action.payload.message;
      });
  },
});
export const selectBasket = (state) => state.basket.basket;
export const selectAllUserBasket = (state) => state.basket.allUserBasket;
export const SelectLoadingBasket = (state) => state.basket.loadingBasket;

export default addBasketSlice.reducer;
