import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_API_LINK });
export const getBaskets = () => API.get("/basket/");
export const addBasket = (data) => API.post("/basket", data);
export const deleteBasket = (userId, productId) =>
  API.delete(`/basket/${userId}/${productId}`);
export const updateBasketItem = (updateData) =>
  API.put("/basket/update", updateData);
export const clearBasket = (data) => API.post(`/basket/clear`, data);
export const deleteUserBasket = (id) => API.delete(`/basket/${id}`);
