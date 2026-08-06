
import { useState, useEffect } from "react";
// import StudentsFilters from "../../components/StudentsFilter/StudentsFilters";
// import StudentsFilters from "./components/filters/StudentsFilters";
import StudentsFilters from "../../components/StudentsFilter/StudentsFilters";
// import StudentsTable from "./components/table/StudentsTable";
import { getClasses } from "../../services/classes.service";
import { getSections, getstudents } from "../../services/sections.service";
import { getClassAssessments } from "../../services/setting/examSetting.service";
import { saveAllGrades } from "../../services/sections.service"; // 👈 Import save service
import { Box, CircularProgress, Button, Paper } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useSnackbar } from "notistack"; // 👈 استيراد Hook الخاص بـ notistack

export default function StudentsReports() {
  const [classId, setClassId] = useState("");
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [sectionId, setSectionId] = useState("");
    const [examId, setExamId] = useState("");
    const [exams, setExams] = useState([]);
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false); // 👈 Button loading state
    const { enqueueSnackbar } = useSnackbar();
   useEffect(() => {
          async function loadClasses() {
              try {
                  setLoading(true);
                  const data = await getClasses();
                  setClasses(data.data);
              } catch (err) {
                  console.error("Error loading classes:", err);
              } finally {
                  setLoading(false);
              }
          }
          loadClasses();
      }, []);
  
      const handleClassChange = async (value) => {
          setClassId(value);
          setExamId("");
          setSectionId("");
          try {
              setLoading(true);
              const data = await getSections(value);
              setSections(data.data);
  
              const classAssessmentsdata = await getClassAssessments(value);
              setExams(classAssessmentsdata.data);
          } catch (err) {
              console.error(err);
          } finally {
              setLoading(false);
          }
      };
  
      const handleSectionChange = async (value) => {
          setSectionId(value);
          try {
              if (classId && examId && value) {
                  setLoading(true);
                  const data = await getstudents(classId, value, examId);
                  setStudents(data.data.students);
                  setSubjects(data.data.subjects);
              }
          } catch (err) {
              console.error(err);
          } finally {
              setLoading(false);
          }
      };
  
      const handleExamChange = async (value) => {
          setExamId(value);
          try {
              if (classId && sectionId && value) {
                  setLoading(true);
                  const data = await getstudents(classId, sectionId, value);
                  setStudents(data.data.students);
                  setSubjects(data.data.subjects);
              }
          } catch (err) {
              console.error(err);
          } finally {
              setLoading(false);
          }
      };
  if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <CircularProgress />
            </Box>
        );
    }
    return (
        <Box sx={{ pb: 10 }}>
            <StudentsFilters
                classId={classId}
                sectionId={sectionId}
                sections={sections}
                examId={examId}
                classes={classes}
                exams={exams}
                onClassChange={handleClassChange}
                onSectionChange={handleSectionChange}
                onExamChange={handleExamChange}
            />

            
        </Box>
    )
}