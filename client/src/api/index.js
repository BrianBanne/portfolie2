import axios from "axios";

const serverURL = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : "https://localhost:8080";

console.log("serverurl", serverURL);

const { token } = localStorage.getItem("session")
  ? JSON.parse(localStorage.getItem("session"))
  : "";

const server = axios.create({
  baseURL: serverURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const api = axios.create({
  baseURL: serverURL.concat("/api"),
  headers: {
    "Content-Type": "application/json",
  },
});

const admin = axios.create({
  baseURL: serverURL.concat("/admin"),
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  },
});

const user = axios.create({
  baseURL: serverURL.concat("/api/user"),
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  },
});

const loginAdmin = async (payload) =>
  server.post("api/auth/login/admin", payload);
export const getRedirectUrl = async () => server.get("api/auth/login/google");

//** PRODUCT API **/
const getAllProducts = async () => api.get("/products");
const getProductFromId = async (id) => api.get(`/product/${id}`);

const createOrder = async (payload) => api.post("/order/create", payload);

//** USER API **/

const getUserOrders = async (id) =>
  api.get(`/orders/user`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
const updateUserDetails = async (payload) => user.put("/update", payload);
const getUserDetails = async () => user.get("/details");

//** ADMIN API **/
const getAllOrders = async () =>
  api.get("/orders", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

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
  getUserDetails,
};

export const AdminAPI = {
  getAllOrders,
  loginAdmin,
  addproduct,
  deleteProduct,
  editProduct,
};
