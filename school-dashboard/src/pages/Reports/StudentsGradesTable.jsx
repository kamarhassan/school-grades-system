
import { Box, Button, Paper, Typography } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import "./StudentsGradesTable.css";

const getStudentScore = (student, subject) => {
    const key = `subject_${subject.id}`;
    return student[key] ?? null;
};

const formatScore = (score) => {
    if (score === null || score === undefined || score === "") {
        return "—";
    }

    return Number(score).toFixed(2);
};

export default function StudentsGradesTable({
    students = [],
    subjects = [],
    className = "",
    sectionName = "",
    examName = "",
    academicYear = "2026-2027",
}) {
    const handlePrint = () => {
        window.print();
    };

    if (!students.length || !subjects.length) {
        return (
            <Typography sx={{ p: 3, textAlign: "center" }}>
                يرجى اختيار الصف والشعبة والامتحان لعرض العلامات.
            </Typography>
        );
    }

    return (
        <Box>
            <Box className="report-toolbar">
                <Typography variant="h6">
                    تقارير علامات الطلاب ({students.length})
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<PrintIcon />}
                    onClick={handlePrint}
                >
                    طباعة الشهادات
                </Button>
            </Box>

            {students.map((student) => (
                <Paper
                    key={student.id}
                    elevation={2}
                    className="student-certificate"
                    dir="rtl"
                >
                    <Box className="certificate-header">
                        <Typography variant="h5" fontWeight="bold">
                            متوسطة سحمر الأولى الرسمية
                        </Typography>

                        <Typography>
                            كشف علامات الطلاب
                        </Typography>

                        <Typography>
                            العام الدراسي: {academicYear}
                        </Typography>
                    </Box>

                    <Box className="student-info">
                        <Typography>
                            <strong>اسم الطالب:</strong>{" "}
                            {student.student_name}
                        </Typography>

                        <Typography>
                            <strong>الصف:</strong>{" "}
                            {className || "—"}
                        </Typography>

                        <Typography>
                            <strong>الشعبة:</strong>{" "}
                            {sectionName || "—"}
                        </Typography>

                        <Typography>
                            <strong>الامتحان:</strong>{" "}
                            {examName || "—"}
                        </Typography>
                    </Box>

                    <table className="grades-table">
                        <thead>
                            <tr>
                                <th>المادة</th>
                                <th>العلامة القصوى</th>
                                <th>العلامة المحصّلة</th>
                            </tr>
                        </thead>

                        <tbody>
                            {subjects.map((subject) => {
                                const score = getStudentScore(
                                    student,
                                    subject
                                );

                                return (
                                    <tr key={subject.id}>
                                        <td>{subject.name}</td>
                                        <td>
                                            {formatScore(subject.max_score)}
                                        </td>
                                        <td>
                                            {formatScore(score)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <Box className="certificate-footer">
                        <Typography>
                            ملاحظات المدرسة: __________________
                        </Typography>

                        <Typography>
                            توقيع الأهل: __________________
                        </Typography>

                        <Typography>
                            ختم الإدارة: __________________
                        </Typography>
                    </Box>
                </Paper>
            ))}
        </Box>
    );
}
