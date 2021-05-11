import axios from "axios";

const { token } = localStorage.getItem("session")
  ? JSON.parse(localStorage.getItem("session"))
  : "";
console.log(token);
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

export const getRedirectUrl = () => server.get("/auth/login/google");

//** PRODUCT API **/
const getAllProducts = () => api.get("/products");
const getProductFromId = (id) => api.get(`/product/${id}`);

//** USER API **/

//** ADMIN API **/
const loginAdmin = (payload) => admin.post("/auth/login/admin", payload);
const getAllOrders = () => admin.get("/admin/orders");

const deleteProduct = (id) => admin.delete(`/product/${id}`);

export const getCustomers = () => api.get("/customers");

export const API = { getAllProducts, getProductFromId, loginAdmin };

export const AdminAPI = { getAllOrders, loginAdmin, deleteProduct };
