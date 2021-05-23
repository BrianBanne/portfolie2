import axios from "axios";

const serverURL = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : "https://localhost:8080";

const { token } = localStorage.getItem("session")
  ? JSON.parse(localStorage.getItem("session"))
  : "";

const api = axios.create({
  baseURL: serverURL.concat("/api"),
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  },
});

const loginAdmin = async (payload) => api.post("/auth/login/admin", payload);
export const getRedirectUrl = async () => api.get("/auth/login/google");

//** PRODUCTS **/
const getAllProducts = async () => api.get("/products");
const getProductFromId = async (id) => api.get(`/product/${id}`);
const addproduct = async (payload) => api.post("/product", payload);
const editProduct = async (id, payload) => api.put(`/product/${id}`, payload);
const deleteProduct = async (id) => api.delete(`/product/${id}`);
const getAllOrders = async () => api.get("/orders");

//** ORDERS **/
const createOrder = async (payload) => api.post("/order/create", payload);
const getUserOrders = async (id) => api.get(`/orders/user`);

//* USERS *//
const updateUserDetails = async (payload) => api.put("/update", payload);
const getUserDetails = async () => api.get("/details");

//** ADMIN API **/

export const API = {
  getAllProducts,
  getProductFromId,
  loginAdmin,
  createOrder,
  getUserOrders,
  updateUserDetails,
  getUserDetails,
  getAllOrders,
  addproduct,
  deleteProduct,
  editProduct,
};
