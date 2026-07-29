import { useState, useEffect } from "react";
import StudentsFilters from "./components/filters/StudentsFilters";
import StudentsTable from "./components/table/StudentsTable";
import { getClasses } from "../../services/classes.service";
import { getSections, getstudents } from "../../services/sections.service";
import { getClassAssessments } from "../../services/setting/examSetting.service";
import { Box, CircularProgress } from '@mui/material';

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

    // 📌 جلب الصفوف فقط
    useEffect(() => {
        async function loadClasses() {
            try {
                setLoading(true);
                const data = await getClasses();
                // console.log("CLASSES FROM API:", data.data); // للتأكد
                setClasses(data.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadClasses();
    }, []);

    const handleClassChange = async (value) => {
        setClassId(value);
        setExamId(""); // reset exam
        setSectionId(""); // reset section

        try {
            setLoading(true);
            const data = await getSections(value);
            setSections(data.data);
            // console.log("SECTIONS FROM API:", data.data); // للتأكد
            
            // console.log(
            //     "%c class is  " + value + " exam is " + examId + " section is " + sectionId,
            //     "color: red; font-size: 40px; font-weight: bold;"
            // );

            const ClassAssessmentsdata = await getClassAssessments(value);
            // console.log("EXAMS FROM API:", ClassAssessmentsdata.data); // للتأكد
            setExams(ClassAssessmentsdata.data);

            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }





    };

    const handleSectionChange = async (value) => {
        setSectionId(value);

        try {
            setLoading(true);
            // console.log(
            //     "%c class is  " + classId + " exam is " + examId + " section is " + sectionId,
            //     "color: red; font-size: 40px; font-weight: bold;"
            // );
            // يمكنك إضافة أي منطق إضافي هنا إذا لزم الأمر عند تغيير القسم
            if (classId && examId ) {

                const data = await getstudents(classId, value, examId);
                setStudents(data.data.students);
                setSubjects(data.data.subjects);

                // console.log("STUDENTS FROM API:", data.data); // للتأكد
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };
    const handleExamChange = async (value) => {
        setExamId(value);
        // setSectionId(""); // reset section
        // console.log("Selected Section ID:", value); // للتأكد من قيمة sectionId

        try {
            setLoading(true);
            //  console.log(
            //     "%c class is  " + classId + " exam is " + examId + " section is " + sectionId,
            //     "color: red; font-size: 40px; font-weight: bold;"
            // );
            // يمكنك إضافة أي منطق إضافي هنا إذا لزم الأمر عند تغيير القسم
            if (classId && sectionId ) {

                const data = await getstudents(classId, sectionId, value);
                //  console.log("data", data.students);
                // console.log("class", classId);
                // console.log("section", sectionId);
                // console.log("exam", examId);


                 setStudents(data.data.students);
                setSubjects(data.data.subjects);
                // console.log("STUDENTS FROM API:", data.data); // للتأكد
            }
            setLoading(false);
            // console.log("amskdm",classId,sectionId,examId)
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <CircularProgress />
            </Box>
        );
    }
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

                    students={students}
                    subjects={subjects}
                    examId={examId}
                />
            )}
        </div>
    );
}

export default Students;
