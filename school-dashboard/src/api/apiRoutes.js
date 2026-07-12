
export const API_BASE_URL = "http://localhost/grade/api";


export const API_ROUTES = {
  //  API_BASE_URL: `${API_BASE_URL}`,
  LOGIN: `${API_BASE_URL}/login`,
  LOGOUT: `${API_BASE_URL}/logout`,
  ME: `${API_BASE_URL}/me`,
  REFRESH: `${API_BASE_URL}/refresh-token`,





  classes: `${API_BASE_URL}/classes`,
  sections: (classId) => `${API_BASE_URL}/class-sections?class_id=${classId}`,
  //   exams: `${API_BASE_URL}/exams`,
  //   grades: (examId, classId, sectionId) =>
  //     `${API_BASE_URL}/grades?examId=${examId}&classId=${classId}&sectionId=${sectionId}`,

  addSchoolYears: `${API_BASE_URL}/settings/AddSchoolYear`,
  CurrentSchoolYears: `${API_BASE_URL}/settings/CurrentSchoolYear`,
  SetCurrentSchoolYear: `${API_BASE_URL}/settings/SetCurrentSchoolYear`,
  settings: `${API_BASE_URL}/settings/sections`,
  sectionsStoreSetting: `${API_BASE_URL}/settings/sectionsStoreSetting`,
  getstudents: (examsId,classId, sectionId) =>  `${API_BASE_URL}/getstudents/${examsId}/${classId}/${sectionId}`











};