import api from "../api";
import { API_ROUTES } from "../../api/apiRoutes";

export async function sectiontoclass() {
    const response = await api.get(API_ROUTES.sectiontoclass);
    return response.data;
}
export async function setsectiontoclass(data) {
    const response = await api.post(API_ROUTES.savesectiontoclass, data);
    return response.data;
}