import api from "./api";
import { API_ROUTES } from "../api/apiRoutes";

export async function getSections(classId) {
    const response = await api.get(API_ROUTES.sections(classId));
    return response.data;
}



export async function getstudents(examId, classId, sectionId) {
    const response = await api.get(API_ROUTES.getstudents(examId, classId, sectionId));
    return response.data;
}



export async function saveAllGrades(payload) {
    const response = await api.post(API_ROUTES.saveAllGrades, payload);
    return response.data;
}