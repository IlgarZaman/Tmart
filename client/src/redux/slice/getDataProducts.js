import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api-for-products";

export const allProducts = createAsyncThunk("product/allProducts", async () => {
  try {
    const response = await api.getProducts();
    return response.data;
  } catch (err) {
    return err.response.data;
  }
});

export const addProducts = createAsyncThunk(
  "product/addProducts",
  async ({ formData, enqueueSnackbar }) => {
    try {
      const response = await api.addProducts(formData);
      const message = "Added successfully!";
      const addSucess = () => enqueueSnackbar(message, { variant: "success" });
      addSucess();
      return response.data;
    } catch (error) {
      const message = "Please fill all fields!";
      const Error = () => enqueueSnackbar(message, { variant: "info" });
      Error();
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ id, enqueueSnackbar }, { rejectWithValue }) => {
    try {
      const response = await api.deleteProduct(id);
      const message = "Product Deleted Successfully!";
      const deleteSucess = () =>
        enqueueSnackbar(message, { variant: "success" });
      deleteSucess();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const SelectProductById = createAsyncThunk(
  "products/selectProduct",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.getProductById(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ values, id, enqueueSnackbar }, { rejectWithValue }) => {
    try {
      const response = await api.updateProduct(values, id);
      const message = "Product Updated Successfully!";
      const updateSucess = () =>
        enqueueSnackbar(message, { variant: "success" });
      updateSucess();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const getDataProducts = createSlice({
  name: "product",
  initialState: {
    error: "",
    searchTerm: "",
    loadingProduct: false,
    products: [],
    initialProducts: [],
    productById: null,
    typeOne: [],
    typeTwo: [],
    typeThree: [],
    typeFour: [],
  },
  reducers: {
    reset: (state, action) => {
      state.productById = null;
    },
    searchProducts: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.searchTerm = searchTerm;
      if (searchTerm === "") {
        state.products = state.initialProducts;
      } else {
        state.products = state.initialProducts.filter((product) =>
          product.name.toLowerCase().includes(searchTerm)
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProducts.pending, (state, action) => {
        state.loadingProduct = true;
      })
      .addCase(addProducts.fulfilled, (state, action) => {
        state.loadingProduct = false;
      })
      .addCase(addProducts.rejected, (state, action) => {
        state.loadingProduct = false;
        state.error = action.payload.message;
      })
      .addCase(allProducts.pending, (state, action) => {
        state.loadingProduct = true;
      })
      .addCase(allProducts.fulfilled, (state, action) => {
        const allProducts = action.payload;
        state.loadingProduct = false;
        state.products = allProducts;
        state.initialProducts = allProducts;
        state.typeOne = filterProductsByType(allProducts, "featured");
        state.typeTwo = filterProductsByType(allProducts, "bestsale");
        state.typeThree = filterProductsByType(allProducts, "onsale");
        state.typeFour = filterProductsByType(allProducts, "latest");
      })
      .addCase(allProducts.rejected, (state, action) => {
        state.loadingProduct = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.loadingProduct = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.products = state.products.filter((item) => item._id !== id);
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loadingProduct = false;
        state.error = action.payload;
      })
      .addCase(SelectProductById.fulfilled, (state, action) => {
        const { _id } = action.payload;
        state.productById = state.products.find((item) => item._id === _id);
      })
      .addCase(updateProduct.pending, (state, action) => {
        state.loadingProduct = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loadingProduct = false;
        const { _id } = action.payload;
        if (_id) {
          state.products = state.products.map((item) =>
            item._id === _id ? action.payload : item
          );
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loadingProduct = false;
        state.error = action.payload.message;
      });
  },
});
export const selectProducts = (state) => state.product.products;
export const selectTypeOne = (state) => state.product.typeOne;
export const selectTypeTwo = (state) => state.product.typeTwo;
export const selectTypeThree = (state) => state.product.typeThree;
export const selectTypeFour = (state) => state.product.typeFour;
export const selectloadingProduct = (state) => state.product.loadingProduct;
export const selectError = (state) => state.product.error;
export const selectProductById = (state) => state.product.productById;
export const selectSearchTerm = (state) => state.product.searchTerm;
export const selectInitialProducts = (state) => state.product.initialProducts;

function filterProductsByType(products, type) {
  return products.filter((item) => item.type === type);
}
export const { reset } = getDataProducts.actions;
export const { searchProducts } = getDataProducts.actions;
export default getDataProducts.reducer;
