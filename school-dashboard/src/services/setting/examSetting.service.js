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



export async function assessmentstatus(payload) {
    // نرسل الـ payload مباشرة في Body الـ POST
    const response = await api.post(API_ROUTES.assessmentstatus, payload);
    return response.data;
}



export async function getClassAssessments(classId) {
    const response = await api.post(API_ROUTES.ClassAssessmentsdata,{class_id: classId,/* فقط لحل مشكلة تغيير الاسم من bacend < frontend*/});
    return response.data;
}