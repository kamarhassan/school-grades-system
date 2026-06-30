import api from "./api";
import { API_ROUTES } from "../api/apiRoutes";

export async function getSections(classId) {
    const response = await api.get(API_ROUTES.sections(classId));
    return response.data;
}