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
  baseURL: "http://localhost:8080/api/user",
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  },
});

const loginAdmin = async (payload) => server.post("/auth/login/admin", payload);
export const getRedirectUrl = async () => server.get("/auth/login/google");

//** PRODUCT API **/
const getAllProducts = async () => api.get("/products");
const getProductFromId = async (id) => api.get(`/product/${id}`);

const createOrder = async (payload) => api.post("/order/create", payload);

//** USER API **/

const getUserOrders = async (id) => user.get(`/orders`);
const updateUserDetails = async (payload) => user.put("/update", payload);
const getUserDetails = async () => user.get("/details");

//** ADMIN API **/
const getAllOrders = async () => admin.get("/orders");

const addproduct = async (payload) => admin.post("/product", payload);
const editProduct = async (id, payload) => admin.put(`/product/${id}`, payload);
const deleteProduct = async (id) => admin.delete(`/product/${id}`);

export const getCustomers = () => api.get("/customers");

export const API = {
  getAllProducts,
  getProductFromId,
  loginAdmin,
  createOrder,
  getUserOrders,
  updateUserDetails,
  getUserDetails
};

export const AdminAPI = {
  getAllOrders,
  loginAdmin,
  addproduct,
  deleteProduct,
  editProduct,
};
