 
const API_BASE_URL = "http://localhost/grade/api";


export const API_ROUTES = {

  classes: `${API_BASE_URL}/classes`,
  sections: (classId) => `${API_BASE_URL}/class-sections?class_id=${classId}`,
//   exams: `${API_BASE_URL}/exams`,
//   grades: (examId, classId, sectionId) =>
//     `${API_BASE_URL}/grades?examId=${examId}&classId=${classId}&sectionId=${sectionId}`,
};