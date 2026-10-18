import { useState, useEffect } from "react";

import { Box, CircularProgress, Button, Alert } from "@mui/material";

import PrintIcon from "@mui/icons-material/Print";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useSnackbar } from "notistack";

import { getClasses } from "../../services/classes.service";
import {
    getSections,
    getGradeGridReports,
} from "../../services/sections.service";

import { getClassAssessments } from "../../services/setting/examSetting.service";

import StudentsFilters from "../Students/components/filters/StudentsFilters";

import "./StudentsReports.css";

export default function StudentsReports() {
    const [classId, setClassId] = useState("");
    const [classes, setClasses] = useState([]);

    const [sections, setSections] = useState([]);
    const [sectionId, setSectionId] = useState("");

    // الاحتفاظ بها لأن StudentsFilters يستخدمها.
    const [examId, setExamId] = useState("");
    const [exams, setExams] = useState([]);

    const [reportData, setReportData] = useState(null);

    const [loading, setLoading] = useState(false);
    const [reportLoading, setReportLoading] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    // تحميل الصفوف
    useEffect(() => {
        const loadClasses = async () => {
            try {
                setLoading(true);

                const response = await getClasses();
                setClasses(response.data ?? []);
            } catch (error) {
                console.error("Error loading classes:", error);

                enqueueSnackbar("تعذّر تحميل الصفوف.", {
                    variant: "error",
                });
            } finally {
                setLoading(false);
            }
        };

        loadClasses();
    }, [enqueueSnackbar]);

    // تغيير الصف
    const handleClassChange = async (value) => {
        setClassId(value);
        setSectionId("");
        setExamId("");

        setSections([]);
        setExams([]);
        setReportData(null);

        if (!value) return;

        try {
            setLoading(true);

            const [sectionsResponse, assessmentsResponse] = await Promise.all([
                getSections(value),
                getClassAssessments(value),
            ]);

            setSections(sectionsResponse.data ?? []);
            setExams(assessmentsResponse.data ?? []);
        } catch (error) {
            console.error("Error loading class data:", error);

            enqueueSnackbar("تعذّر تحميل الشعب والتقييمات.", {
                variant: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    // تغيير الشعبة
    const handleSectionChange = (value) => {
        setSectionId(value);
        setReportData(null);
    };

    // تغيير التقييم في الفلتر
    const handleExamChange = (value) => {
        setExamId(value);
    };

    // عرض التقرير لجميع تقييمات الشعبة
    const handleShowReport = async () => {
        if (!sectionId) {
            enqueueSnackbar("يرجى اختيار الصف والشعبة أولاً.", {
                variant: "warning",
            });
            return;
        }

        try {
            setReportLoading(true);
            setReportData(null);

            const response = await getGradeGridReports(sectionId);
            const data = response.data?.message;

            if (!data || !Array.isArray(data.students)) {
                throw new Error("صيغة بيانات التقرير غير صحيحة.");
            }

            setReportData(data);

            if (data.students.length === 0) {
                enqueueSnackbar("لا يوجد تلاميذ في هذه الشعبة.", {
                    variant: "info",
                });
            }
        } catch (error) {
            console.error("Error loading grades report:", error);

            enqueueSnackbar(
                error.response?.data?.error || "تعذّر تحميل تقرير العلامات.",
                { variant: "error" },
            );
        } finally {
            setReportLoading(false);
        }
    };

    // طباعة الشهادات
    const handlePrint = () => {
        window.print();
    };

    // المواد الموجودة في أعمدة التقرير
    const subjects = reportData
        ? Array.from(
              new Map(
                  (reportData.columns ?? []).map((column) => [
                      column.class_subject_id,
                      {
                          id: column.class_subject_id,
                          name: column.subject_name,
                      },
                  ]),
              ).values(),
          )
        : [];

    if (loading && classes.length === 0) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 5,
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box className="students-reports-page" sx={{ pb: 10 }}>
            {/* الفلاتر */}
            <Box className="report-controls" sx={{ mb: 3 }}>
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

                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        mt: 2,
                        flexWrap: "wrap",
                    }}
                >
                    <Button
                        variant="contained"
                        startIcon={<VisibilityIcon />}
                        onClick={handleShowReport}
                        disabled={
                            !classId || !sectionId || loading || reportLoading
                        }
                    >
                        {reportLoading
                            ? "جارٍ تحميل العلامات..."
                            : "عرض العلامات"}
                    </Button>

                    {reportData?.students?.length > 0 && (
                        <Button
                            variant="outlined"
                            startIcon={<PrintIcon />}
                            onClick={handlePrint}
                        >
                            طباعة الشهادات
                        </Button>
                    )}
                </Box>
            </Box>

            {loading && (
                <Box
                    className="report-controls"
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        my: 2,
                    }}
                >
                    <CircularProgress size={26} />
                </Box>
            )}

            {reportLoading && (
                <Box
                    className="report-controls"
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2,
                        py: 3,
                    }}
                >
                    <CircularProgress size={26} />
                    <span>جارٍ تحميل تقرير العلامات...</span>
                </Box>
            )}

            {!reportData && !reportLoading && (
                <Alert severity="info" className="report-controls">
                    اختر الصف والشعبة، ثم اضغط على «عرض العلامات».
                </Alert>
            )}

            {reportData && (
                <Box className="grades-report" dir="rtl">
                    {reportData.students.map((student) => (
                        <Box
                            className="student-certificate"
                            key={student.student_id}
                        >
                            {/* رأس الشهادة */}
                            <Box className="certificate-header">
                                <h2 className="school-name">
                                    متوسطة سحمر الرسمية الأولى
                                </h2>

                                <h3 className="certificate-title">
                                    كشف علامات التلميذ
                                </h3>

                                <Box className="student-information">
                                    <span>
                                        اسم التلميذ: {student.student_name}
                                    </span>

                                    <span>
                                        الصف:{" "}
                                        {reportData.class_name ||
                                            classes.find(
                                                (item) =>
                                                    String(item.id) ===
                                                    String(classId),
                                            )?.class_name ||
                                            ""}
                                    </span>

                                    <span>
                                        الشعبة:{" "}
                                        {reportData.section_name ||
                                            sections.find(
                                                (item) =>
                                                    String(item.id) ===
                                                    String(sectionId),
                                            )?.section_name ||
                                            ""}
                                    </span>

                                    <span>
                                        العام الدراسي:{" "}
                                        {reportData.academic_year_name ||
                                            reportData.academic_year_id ||
                                            ""}
                                    </span>
                                </Box>
                            </Box>

                            {/* جدول العلامات */}
                            {(reportData.columns ?? []).length > 0 ? (
                                <div className="grades-table-wrapper">
                                    <table className="grades-table">
                                        <thead>
                                            <tr>
                                                <th
                                                    rowSpan={2}
                                                    className="subject-column"
                                                >
                                                    المادة
                                                </th>

                                                {(
                                                    reportData.assessments ?? []
                                                ).map((assessment) => {
                                                    const count =
                                                        reportData.columns.filter(
                                                            (column) =>
                                                                Number(
                                                                    column.assessment_type_id,
                                                                ) ===
                                                                Number(
                                                                    assessment.id,
                                                                ),
                                                        ).length;

                                                    if (count === 0) {
                                                        return null;
                                                    }

                                                    return (
                                                        <th
                                                            key={assessment.id}
                                                            colSpan={count}
                                                        >
                                                            {assessment.name}
                                                        </th>
                                                    );
                                                })}
                                            </tr>

                                            <tr>
                                                {(
                                                    reportData.assessments ?? []
                                                ).map((assessment) =>
                                                    reportData.columns
                                                        .filter(
                                                            (column) =>
                                                                Number(
                                                                    column.assessment_type_id,
                                                                ) ===
                                                                Number(
                                                                    assessment.id,
                                                                ),
                                                        )
                                                        .map(
                                                            (column, index) => (
                                                                <th
                                                                    key={[
                                                                        assessment.id,
                                                                        column.class_subject_id,
                                                                        column.subject_component_id ??
                                                                            "main",
                                                                        index,
                                                                    ].join("-")}
                                                                >
                                                                    <div>
                                                                        {column.component_name ||
                                                                            "العلامة"}
                                                                    </div>

                                                                    <small>
                                                                        /{" "}
                                                                        {column.max_score ??
                                                                            ""}
                                                                    </small>
                                                                </th>
                                                            ),
                                                        ),
                                                )}
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {subjects.map((subject) => (
                                                <tr key={subject.id}>
                                                    <td className="subject-name">
                                                        {subject.name}
                                                    </td>

                                                    {(
                                                        reportData.assessments ??
                                                        []
                                                    ).map((assessment) =>
                                                        reportData.columns
                                                            .filter(
                                                                (column) =>
                                                                    Number(
                                                                        column.assessment_type_id,
                                                                    ) ===
                                                                        Number(
                                                                            assessment.id,
                                                                        ) &&
                                                                    Number(
                                                                        column.class_subject_id,
                                                                    ) ===
                                                                        Number(
                                                                            subject.id,
                                                                        ),
                                                            )
                                                            .map(
                                                                (
                                                                    column,
                                                                    index,
                                                                ) => {
                                                                    const grade =
                                                                        student.grades?.find(
                                                                            (
                                                                                item,
                                                                            ) =>
                                                                                Number(
                                                                                    item.assessment_type_id,
                                                                                ) ===
                                                                                    Number(
                                                                                        assessment.id,
                                                                                    ) &&
                                                                                Number(
                                                                                    item.class_subject_id,
                                                                                ) ===
                                                                                    Number(
                                                                                        column.class_subject_id,
                                                                                    ) &&
                                                                                (item.subject_component_id ==
                                                                                null
                                                                                    ? column.subject_component_id ==
                                                                                      null
                                                                                    : Number(
                                                                                          item.subject_component_id,
                                                                                      ) ===
                                                                                      Number(
                                                                                          column.subject_component_id,
                                                                                      )),
                                                                        );

                                                                    return (
                                                                        <td
                                                                            key={[
                                                                                assessment.id,
                                                                                subject.id,
                                                                                column.subject_component_id ??
                                                                                    "main",
                                                                                index,
                                                                            ].join(
                                                                                "-",
                                                                            )}
                                                                        >
                                                                            {grade?.grade ==
                                                                            null
                                                                                ? ""
                                                                                : grade.grade}
                                                                        </td>
                                                                    );
                                                                },
                                                            ),
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <Alert severity="warning">
                                    لا توجد أعمدة علامات معرفة لهذا الصف.
                                </Alert>
                            )}

                            {/* أسفل الشهادة */}
                            <Box className="certificate-footer">
                                <div>
                                    <strong>ملاحظات:</strong>
                                    <div className="notes-line" />
                                </div>

                                <Box className="signatures">
                                    <span>توقيع المسؤول</span>
                                    <span>توقيع المدير</span>
                                    <span>ختم المدرسة</span>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
}
