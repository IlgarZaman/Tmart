import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_API_LINK });
export const getProducts = () => API.get("/products");
export const addProducts = (formData) =>
  API.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const getProductById = (id) => API.get(`/products/${id}`);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const updateProduct = (updatedProductData, id) =>
  API.put(`/products/${id}`, updatedProductData);
