import { useState } from "react";
import StudentsFilters from "./components/filters/StudentsFilters";
import { classesMock, sectionsMock, examsMock, curriculumMock, gradesMock, } from "../../mock/students.mock";
import StudentsTable from "./components/table/StudentsTable";

function Students() {
  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [exams, setExams] = useState("");
  const [examId, setExamId] = useState("");

  const subjects = curriculumMock[classId]?.subjects ?? [];

  const students =
    gradesMock[`${classId}-${sectionId}`]?.students ?? [];

  const onExamChange = (value) => {
    setExamId(value);
  };
  const handleClassChange = (value) => {
    setClassId(value);
    setSectionId(""); // reset section

  };

  const handleSectionChange = (value) => {
    setSectionId(value);
  };




  return (
    <div>
      {
        <StudentsFilters
          classId={classId}
          sectionId={sectionId}
          examId={examId}
          classes={classesMock}
          sections={sectionsMock[classId] || []}
          exams={examsMock}
          onClassChange={handleClassChange}
          onSectionChange={handleSectionChange}
          onExamChange={setExamId}
        />
      }
      <StudentsTable
        subjects={subjects}
        students={students}
      />
    </div>
  );
}

export default Students;
