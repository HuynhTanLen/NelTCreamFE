import axios from "axios";
import Cookies from "js-cookie";

export const axiosClient = axios.create({
  baseURL: "http://localhost:8080/identity/api/",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor cho request
axiosClient.interceptors.request.use(
  async (config : any) => {
    const sessionToken = await Cookies.get("authToken");
    console.log("Session Token trong axxios client:", sessionToken);
    if (sessionToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${sessionToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor cho response

export default axiosClient;
