import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_API_LINK });
export const getWishlist = () => API.get("/wishlist");
export const addWishlist = (data) => API.post("/wishlist", data);
export const deleteWishlist = (data) =>
  API.delete(`/wishlist/delete`, { data });
export const clearWishlist = (data) => API.post(`/wishlist/clear`, data);
export const deleteUserWislist = (id) => API.delete(`/wishlist/${id}`);
