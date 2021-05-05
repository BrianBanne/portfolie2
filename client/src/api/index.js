import axios from "axios";

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : "";

const server = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export const getCustomers = () => server.get("/customers");
export const loginGoogle = (payload) => {
  localStorage.setItem("token,", payload.token)
  server.post("/customer/login/google", payload);
}
