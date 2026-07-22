import api from "../api";
import { API_ROUTES } from "../../api/apiRoutes";

export async function examSettings(classId) {
    const response = await api.get(`${API_ROUTES.examsettings(classId)}`);
    return response.data;
}
export async function postexamSettings(data) {
    const response = await api.post(API_ROUTES.examsetting_save, data);
    return response.data;
}
