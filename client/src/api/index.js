import axios from "axios";

const server = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCustomers = () => api.get("/customers");

export const getRedirectUrl = () => server.get("/auth/login/google");

/*   console.log(token);
  localStorage.setItem("token,", token);
  server.post(
    "/customer/login/google",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ); */
