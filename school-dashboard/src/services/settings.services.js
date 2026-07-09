import api from "./api";
import { API_ROUTES } from "../api/apiRoutes";

export async function getSettings() {
    const response = await api.get(API_ROUTES.settings);
    return response.data;
}


export async function updateSupervisorSections(data) {
    const response = await api.post(API_ROUTES.sectionsStoreSetting, data);
    return response.data;
}

export async function getSupervisorsSections() {
    const response = await api.get(API_ROUTES.settings);
    return response.data;
}