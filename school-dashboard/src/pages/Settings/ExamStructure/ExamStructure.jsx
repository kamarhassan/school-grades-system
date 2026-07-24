import {
    Box,
    CircularProgress,
    Card,
    CardContent,
    Typography,
    Checkbox,
    FormControlLabel,
    Grid,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    Switch, // <--- Added Switch import
} from "@mui/material";

import { useEffect, useState } from "react";
import {
    examSettings,
    postexamSettings,
    assessmentstatus,
} from "../../../services/setting/examSetting.service";
import { getClasses } from "../../../services/classes.service";
import Toaster from "../../../components/toaster/Toaster";

export default function ExamStructure() {
    const [loading, setLoading] = useState(true);
    const [fetchingExams, setFetchingExams] = useState(false);
    const [examTypes, setExamTypes] = useState([]);
    const [classId, setClassId] = useState("");
    const [classes, setClasses] = useState([]);
    const [assessmentid, setAssessmentid] = useState({}); // حالة الـ Switch لكل Assessment
    // حالة التحكم بـ Toaster
    const [toast, setToast] = useState({
        open: false,
        message: "",
        type: "success",
    });

    const showToast = (message, type = "success") => {
        setToast({ open: true, message, type });
    };

    const handleCloseToast = () => {
        setToast((prev) => ({ ...prev, open: false }));
    };

    // جلب قائمة الصفوف عند التحميل الأول
    useEffect(() => {
        async function loadClasses() {
            try {
                const data = await getClasses();
                setClasses(data.data || []);
            } catch (err) {
                console.error("خطأ أثناء جلب الصفوف:", err);
                showToast("حدث خطأ أثناء جلب قائمة الصفوف", "error");
            } finally {
                setLoading(false);
            }
        }
        loadClasses();
    }, []);

    // تغيير الصف وجلب المواد والامتحانات التابعة له
    const handleClassChange = async (value) => {
        setClassId(value);
        setExamTypes([]);
        setFetchingExams(true);

        try {
            const data = await examSettings(value);

            if (data && data.data) {
                setExamTypes(data.data);
            } else if (Array.isArray(data)) {
                setExamTypes(data);
            }
            showToast("تم جلب هيكلية الامتحانات بنجاح", "success");
        } catch (err) {
            console.error("خطأ أثناء جلب هيكلية الامتحانات:", err);
            showToast("فشل جلب هيكلية الامتحانات", "error");
        } finally {
            setFetchingExams(false);
        }
    };

    const handleExamStatus = async (e, assessment_type_id) => {
        const isChecked = e.target.checked;

        // 1. تحديث الواجهة فورياً (Optimistic Update)
        setExamTypes((prevTypes) =>
            prevTypes.map((exam) =>
                exam.assessment_type_id === assessment_type_id
                    ? { ...exam, is_active: isChecked }
                    : exam,
            ),
        );

        try {
            // 2. تجهيز البيانات كاملة للـ Backend
            const payload = {
                class_id: classId, // معرف الصف المحدد
                assessment_type_id: assessment_type_id, // معرف الامتحان
                is_active: isChecked, // الحالة الجديدة
            };

            const response = await assessmentstatus(payload);
            console.log("API response:", response);
            showToast("تم حفظ التغييرات بنجاح", "success");
        } catch (err) {
            console.error("فشل حفظ التغييرات:", err);
            showToast("فشل حفظ التعديلات!", "error");

            // التراجع عن التغيير في الواجهة إذا فشل الطلب
            setExamTypes((prevTypes) =>
                prevTypes.map((exam) =>
                    exam.assessment_type_id === assessment_type_id
                        ? { ...exam, is_active: !isChecked }
                        : exam,
                ),
            );
        }
    };

    // التعديل على حالة الـ Checkbox للمواد (is_split)
    const handlecheckboxChange = async (
        e,
        assessment_type_id,
        class_subject_id,
    ) => {
        const isChecked = e.target.checked;

        // 1. التحديث الفوري للـ UI
        setExamTypes((prevTypes) =>
            prevTypes.map((exam) => {
                if (exam.assessment_type_id === assessment_type_id) {
                    return {
                        ...exam,
                        subjects: exam.subjects.map((sub) =>
                            sub.class_subject_id === class_subject_id
                                ? { ...sub, is_split: isChecked }
                                : sub,
                        ),
                    };
                }
                return exam;
            }),
        );

        // 2. إرسال البيانات للـ Backend
        try {
            const payload = {
                class_id: classId,
                assessment_type_id,
                class_subject_id,
                is_split: isChecked,
            };

            await postexamSettings(payload);
            showToast("تم حفظ التغييرات بنجاح", "success");
        } catch (err) {
            console.error("فشل حفظ التغييرات:", err);
            showToast("فشل حفظ التعديلات!", "error");

            // تراجع عن التغيير في حال فشل الـ API
            setExamTypes((prevTypes) =>
                prevTypes.map((exam) => {
                    if (exam.assessment_type_id === assessment_type_id) {
                        return {
                            ...exam,
                            subjects: exam.subjects.map((sub) =>
                                sub.class_subject_id === class_subject_id
                                    ? { ...sub, is_split: !isChecked }
                                    : sub,
                            ),
                        };
                    }
                    return exam;
                }),
            );
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
        <Box sx={{ p: 3 }}>
            {/* مكون التوست يعرض التنبيهات ديناميكياً */}
            <Toaster
                open={toast.open}
                message={toast.message}
                type={toast.type}
                onClose={handleCloseToast}
            />

            {/* قائمة اختيار الصف */}
            <Box sx={{ maxWidth: 300, mb: 4 }}>
                <FormControl fullWidth size="small">
                    <InputLabel>Class</InputLabel>
                    <Select
                        value={classId}
                        label="Class"
                        onChange={(e) => handleClassChange(e.target.value)}
                    >
                        {classes.map((c) => (
                            <MenuItem key={c.id} value={c.id}>
                                {c.class_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* مؤشر التحميل الخاص بجلب الامتحانات */}
            {fetchingExams ? (
                <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                    <CircularProgress size={30} />
                </Box>
            ) : (
                /* كروت الامتحانات */
                examTypes.map((exam) => (
                    <Card key={exam.assessment_type_id} sx={{ mb: 3 }}>
                        <CardContent>
                            {/* Flex container to place Typography and Switch side by side */}
                            <Box
                                sx={{
                                    display: "flex",
                                    justify: "space-between",
                                    alignItems: "center",
                                    mb: 2,
                                }}
                            >
                                {/* <row> */}
                                <Typography variant="h6">
                                    {console.log("Exam Data:", exam.assessment_name)}
                                    {exam.assessment_name}
                                </Typography>

                                <FormControlLabel
                                    style={{ marginLeft: "auto" }} // This pushes the switch to the right
                                    control={
                                        <Switch
                                            checked={Boolean(exam.is_active)}
                                            onChange={(e) =>
                                                handleExamStatus(
                                                    e,
                                                    exam.assessment_type_id,
                                                )
                                            }
                                            color="primary"
                                        />
                                    }
                                    label={
                                        exam.is_active ? "Active" : "Inactive"
                                    }
                                />
                                {/* </row> */}
                            </Box>

                            <Grid container spacing={2}>
                                {exam.subjects.map((subject) => (
                                    <Grid
                                        item
                                        xs={12}
                                        md={4}
                                        key={subject.class_subject_id}
                                    >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={Boolean(
                                                        subject.is_split,
                                                    )}
                                                    onChange={(e) =>
                                                        handlecheckboxChange(
                                                            e,
                                                            exam.assessment_type_id,
                                                            subject.class_subject_id,
                                                        )
                                                    }
                                                />
                                            }
                                            label={subject.subject}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>
                ))
            )}
        </Box>
    );
}
