import api from "../api";
import { API_ROUTES } from "../../api/apiRoutes";

export async function getschoolyears() {
    const response = await api.get(API_ROUTES.CurrentSchoolYears);
    return response.data;
}


export async function setCurrentSchoolYear(id) {
    const response = await api.post(`${API_ROUTES.SetCurrentSchoolYear}/${id}`);
    return response.data;
}


export async function addSchoolYear(data) {
    const response = await api.post(API_ROUTES.addSchoolYears, data);
    return response.data;
}