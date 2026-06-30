
import axios from "axios";
import { API_ROUTES } from "../api/apiRoutes";
const api = axios.create({
  
  baseURL: `${API_ROUTES.API_BASE_URL_}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
 
});

// إضافة التوكن تلقائياً لكل الطلبات
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
 
export default api;