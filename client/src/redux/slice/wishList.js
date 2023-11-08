import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api-wishlist";

export const allWishlist = createAsyncThunk(
  "wishlist/allWishlist",
  async () => {
    const response = await api.getWishlist();
    return response.data;
  }
);

export const clearWishlistAsync = createAsyncThunk(
  "wishlist/clearWishlist",
  async ({ userId, enqueueSnackbar }) => {
    try {
      const data = {
        userId: userId,
      };
      const message = "Clear all products in wishlist!";
      const clearSucess = () =>
        enqueueSnackbar(message, { variant: "success" });
      clearSucess();
      const response = await api.clearWishlist(data);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const deleteUserWishlist = createAsyncThunk(
  "wishlist/deleteUserWishlist",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.deleteUserWislist(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const addWishlist = createAsyncThunk(
  "wishlist/addWishlist",
  async ({ userId, productId, enqueueSnackbar }) => {
    try {
      const data = {
        userId: userId,
        productId: productId,
      };
      await api.addWishlist(data);
      const message = "Product Added in Wishlist!";
      const addSucess = () => enqueueSnackbar(message, { variant: "success" });
      addSucess();
      return data.productId;
    } catch (error) {
      return error;
    }
  }
);
export const deleteWishlist = createAsyncThunk(
  "wishlist/deleteWishlist",
  async ({ userId, productId, enqueueSnackbar }, { rejectWithValue }) => {
    try {
      const data = {
        userId: userId,
        productId: productId,
      };
      await api.deleteWishlist(data);
      const message = "Product Deleted in Wishlist!";
      const deleteSucess = () =>
        enqueueSnackbar(message, { variant: "success" });
      deleteSucess();
      return data.productId;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const wishlist = createSlice({
  name: "wishlist",
  initialState: {
    error: "",
    loadingWishlist: false,
    wishlist: [],
    allUserWishlist:[]
  },

  extraReducers: (builder) => {
    builder
      .addCase(addWishlist.pending, (state, action) => {
        state.loadingWishlist = true;
      })
      .addCase(addWishlist.fulfilled, (state, action) => {
        state.loadingWishlist = false;
      })
      .addCase(addWishlist.rejected, (state, action) => {
        state.loadingWishlist = false;
        state.error = action.payload;
      })
      .addCase(allWishlist.pending, (state, action) => {
        state.loadingWishlist = true;
      })
      .addCase(allWishlist.fulfilled, (state, action) => {
        const user = JSON.parse(localStorage.getItem("user"));
        state.loadingWishlist = false;
        state.wishlist = action.payload;
        state.allUserWishlist = action.payload;
        user === null
          ? (state.wishlist = [])
          : (state.wishlist = state.wishlist.filter(
              (item) => item.userId === user?.userTokenId.id
            ));
      })
      .addCase(allWishlist.rejected, (state, action) => {
        state.loadingWishlist = false;
        state.error = action.payload;
      })
      .addCase(deleteWishlist.pending, (state, action) => {
        state.loadingWishlist = true;
      })
      .addCase(deleteWishlist.fulfilled, (state, action) => {
        state.loadingWishlist = false;
        const { id } = action.payload;
        state.wishlist = state.wishlist[0]?.products?.filter(
          (item) => item._id !== id
        );
      })
      .addCase(deleteWishlist.rejected, (state, action) => {
        state.loadingWishlist = false;
        state.error = action.payload;
      })
      .addCase(clearWishlistAsync.pending, (state) => {
        state.loadingWishlist = false;
      })
      .addCase(clearWishlistAsync.fulfilled, (state) => {
        state.loadingWishlist = false;
      })
      .addCase(clearWishlistAsync.rejected, (state, action) => {
        state.loadingWishlist = false;
        state.error = action.payload;
      });
  },
});
export const selectWishlist = (state) => state.wishlist.wishlist;
export const selectAllUserWishlist = (state) => state.wishlist.allUserWishlist;
export const selectLoadingWishlist = (state) => state.wishlist.loadingWishlist;

export default wishlist.reducer;
