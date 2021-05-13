import axios from "axios";

const { token } = localStorage.getItem("session")
  ? JSON.parse(localStorage.getItem("session"))
  : "";

const server = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

const admin = axios.create({
  baseURL: "http://localhost:8080/admin",
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  },
});

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const user = axios.create({
  baseURL: "http://localhost:8080/user",
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  },
});

export const getRedirectUrl = () => server.get("/auth/login/google");

//** PRODUCT API **/
const getAllProducts = () => api.get("/products");
const getProductFromId = (id) => api.get(`/product/${id}`);

const createOrder = (payload) => api.post("/order/create", payload);

//** USER API **/

const getUserOrders = (id) => user.get(`/orders`);

//** ADMIN API **/
const loginAdmin = (payload) => server.post("/auth/login/admin", payload);
const getAllOrders = () => admin.get("/admin/orders");

const deleteProduct = (id) => admin.delete(`/product/${id}`);

const addproduct = (payload) => admin.post("/product", payload);

export const getCustomers = () => api.get("/customers");

export const API = {
  getAllProducts,
  getProductFromId,
  loginAdmin,
  createOrder,
  getUserOrders,
};

export const AdminAPI = { getAllOrders, loginAdmin, deleteProduct, addproduct };
