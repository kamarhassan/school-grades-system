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
    MenuItem
} from '@mui/material';

import { useEffect, useState } from 'react';
import { examSettings, postexamSettings } from '../../../services/setting/examSetting.service';
import { getClasses } from "../../../services/classes.service";
import Toaster from '../../../components/toaster/Toaster';

export default function ExamStructure() {
    const [loading, setLoading] = useState(true);
    const [fetchingExams, setFetchingExams] = useState(false);
    const [examTypes, setExamTypes] = useState([]);
    const [classId, setClassId] = useState("");
    const [classes, setClasses] = useState([]);

    // حالة التحكم بـ Toaster
    const [toast, setToast] = useState({
        open: false,
        message: '',
        type: 'success'
    });

    const showToast = (message, type = 'success') => {
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

    // التعديل على حالة الـ Checkbox
    const handlecheckboxChange = async (e, assessment_type_id, class_subject_id) => {
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
                                : sub
                        )
                    };
                }
                return exam;
            })
        );

        // 2. إرسال البيانات للـ Backend
        try {
            const payload = {
                class_id: classId,
                assessment_type_id,
                class_subject_id,
                is_split: isChecked
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
                                    : sub
                            )
                        };
                    }
                    return exam;
                })
            );
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
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <CircularProgress size={30} />
                </Box>
            ) : (
                /* كروت الامتحانات */
                examTypes.map((exam) => (
                    <Card key={exam.assessment_type_id} sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="h6" mb={2}>
                                {exam.assessment_name}
                            </Typography>

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
                                                    checked={Boolean(subject.is_split)}
                                                    onChange={(e) =>
                                                        handlecheckboxChange(
                                                            e,
                                                            exam.assessment_type_id,
                                                            subject.class_subject_id
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