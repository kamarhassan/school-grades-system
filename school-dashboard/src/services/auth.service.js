import api from "./api";
import { API_ROUTES } from "../api/apiRoutes";

export const login = async (credentials) => {
  const response = await api.post(API_ROUTES.LOGIN, credentials);
  return response.data;
};

export const logout = async () => {
  const response = await api.post(API_ROUTES.LOGOUT);
  return response.data;
};

export const me = async () => {
  const response = await api.get(API_ROUTES.ME);
  return response.data;
};