import api from "../api";
import { API_ROUTES } from "../../api/apiRoutes";

export async function examSettings() {
    const response = await api.get(API_ROUTES.examsettings);
    return response.data;
}
