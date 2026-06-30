import api from "./api";
import { API_ROUTES } from "../api/apiRoutes";

export async function getClasses() {
  const response = await api.get(API_ROUTES.classes);
  return response.data;
}