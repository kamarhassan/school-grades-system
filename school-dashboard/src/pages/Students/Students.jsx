import { useState, useEffect } from "react";
import StudentsFilters from "./components/filters/StudentsFilters";
import StudentsTable from "./components/table/StudentsTable";
import { getClasses } from "../../services/classes.service";
import { getSections, getstudents } from "../../services/sections.service";
function Students() {
    const [classId, setClassId] = useState("");
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [sectionId, setSectionId] = useState("");
    const [examId, setExamId] = useState("");

   const [students, setStudents] = useState([]);
const [subjects, setSubjects] = useState([]);

    const exams = [
        { id: 1, name: "السعي الأول" },
        { id: 2, name: "السعي الثاني" },
        { id: 3, name: "السعي الثالث" },
        { id: 4, name: "السعي الرابع" },
        { id: 5, name: "امتحان الفصل الأول" },
        { id: 6, name: "امتحان الفصل الثاني" },
    ];

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

    const handleSectionChange = async (value) => {
        setSectionId(value);
        // console.log("Selected Section ID:", value); // للتأكد من قيمة sectionId
        try {
            // يمكنك إضافة أي منطق إضافي هنا إذا لزم الأمر عند تغيير القسم
            const data = await getstudents(examId, classId, value);
            setStudents(data.data);
            setSubjects(data.subjects);
            console.log("STUDENTS FROM API:", data.data); // للتأكد
        } catch (err) {
            console.error(err);
        }
    };
    const handleExamChange = async (value) => {
        setExamId(value);
        setSectionId(""); // reset section
        // console.log("Selected Section ID:", value); // للتأكد من قيمة sectionId
        try {
            // يمكنك إضافة أي منطق إضافي هنا إذا لزم الأمر عند تغيير القسم

            // console.log("examId:", value); // للتأكد
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
                examId={examId}
                classes={classes}
                // sections={[]}
                exams={exams}
                onClassChange={handleClassChange}
                onSectionChange={handleSectionChange}
                onExamChange={handleExamChange}
            />

            {classId && sectionId && examId && (
                <StudentsTable
                    // classId={classId}
                    // sectionId={sectionId}
                    // examId={examId}
                    students={students}
                    subjects={subjects}
                    examId={examId}
                />
            )}
        </div>
    );
}

export default Students;
