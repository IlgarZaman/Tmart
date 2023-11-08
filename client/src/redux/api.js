import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_API_LINK });
export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) =>
  API.post("/users/signup", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const getUsers = () => API.get("/users");
export const getUserById = (id) => API.get(`/users/${id}`);
export const deleteUser = (id) => API.delete(`/users/${id}`);
export const updateUser = (updatedUserData, id) =>
  API.put(`/users/${id}`, updatedUserData);
export const updateUserImage = (userId, imageFile) =>
  API.post(`/users/changeProfileImage/${userId}`, imageFile);
