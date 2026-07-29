import { useState, useEffect } from "react";
import StudentsFilters from "./components/filters/StudentsFilters";
import StudentsTable from "./components/table/StudentsTable";
import { getClasses } from "../../services/classes.service";
import { getSections, getstudents } from "../../services/sections.service";
import { getClassAssessments } from "../../services/setting/examSetting.service";
import { saveAllGrades } from "../../services/sections.service"; // 👈 Import save service
import { Box, CircularProgress, Button, Paper } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

function Students() {
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

  // 1. Local state update ONLY (No API calls here)
  const handleGradeChange = (studentId, classSubjectId, componentId, newValue) => {
    const targetSubject = subjects.find(
      (sub) =>
        sub.class_subject_id === classSubjectId &&
        sub.subject_component_id === componentId
    );

    if (!targetSubject) return;

    const subjectKey = `subject_${targetSubject.id}`;

    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (student.id === studentId) {
          return {
            ...student,
            [subjectKey]: newValue,
          };
        }
        return student;
      })
    );
  };

  // 2. Send ALL data at once when "Save All" button is clicked
  const handleSaveAll = async () => {
    try {
      setSaveLoading(true);

      // Construct the complete JSON payload
      const payload = {
        class_id: classId,
        section_id: sectionId,
        exam_id: examId,
        students: students.map((student) => ({
          student_id: student.id,
          grades: subjects.map((subject) => ({
            class_subject_id: subject.class_subject_id,
            subject_component_id: subject.subject_component_id,
            grade: student[`subject_${subject.id}`] ?? null,
          })),
        })),
      };

      await saveAllGrades(payload);
      alert("All grades saved successfully!");
    } catch (err) {
      console.error("Error saving grades:", err);
      alert("Failed to save grades. Please try again.");
    } finally {
      setSaveLoading(false);
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

      {classId && sectionId && examId && (
        <>
          <StudentsTable
            students={students}
            subjects={subjects}
            examId={examId}
            handleGradeChange={handleGradeChange}
          />

          {/* Fixed bottom bar with "Save All" button */}
          <Paper
            elevation={3}
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
              display: "flex",
              justifyContent: "flex-end",
              bgcolor: "background.paper",
              borderTop: "1px solid #ddd",
              zIndex: 1100,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={
                saveLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <SaveIcon />
                )
              }
              onClick={handleSaveAll}
              disabled={saveLoading || students.length === 0}
            >
              {saveLoading ? "Saving..." : "Save All Grades"}
            </Button>
          </Paper>
        </>
      )}
    </Box>
  );
}

export default Students;