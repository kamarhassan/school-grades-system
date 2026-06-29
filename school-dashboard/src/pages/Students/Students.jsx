import { useState, useEffect } from "react";
import StudentsFilters from "./components/filters/StudentsFilters";
import { getClasses } from "../../services/classes.service";
import { getSections } from "../../services/sections.service";
function Students() {
  const [classId, setClassId] = useState("");
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [sectionId, setSectionId] = useState("");

  // 📌 جلب الصفوف فقط
  useEffect(() => {
    async function loadClasses() {
      try {
        const data = await getClasses();
        console.log("CLASSES FROM API:", data.data); // للتأكد
        setClasses(data.data);
      } catch (err) {
        console.error(err);
      }
    }

    loadClasses();
  }, []);


  const handleClassChange = async (value) => {
    setClassId(value);
    setSectionId(""); // reset section

    try {
      const data = await getSections(value);
      setSections(data.data);
      console.log("SECTIONS FROM API:", data.data); // للتأكد
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <StudentsFilters
        classId={classId}
        sectionId={sectionId}
        sections={sections}
        examId=""
        classes={classes}
        // sections={[]}
        exams={[]}
        onClassChange={handleClassChange}
        onSectionChange={() => { }}
        onExamChange={() => { }}
      />
    </div>
  );
}

export default Students;