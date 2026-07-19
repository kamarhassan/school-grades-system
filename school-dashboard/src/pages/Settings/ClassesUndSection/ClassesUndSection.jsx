import React, { useState, useEffect } from 'react';
import { Box, Typography, Checkbox, FormControlLabel, FormGroup, Paper, Button, CircularProgress } from '@mui/material';
import axios from 'axios'; // أو يمكنك استخدام fetch الافتراضي
import { sectiontoclass } from '../../../services/setting/sectiontoclass.service';
// استيراد دالة الحفظ لكي يتعرف عليها الكود داخل handleSaveData
import { setsectiontoclass } from '../../../services/setting/sectiontoclass.service';


export default function ClassesUndSection() {
    const [classesData, setClassesData] = useState([]);
    const [loading, setLoading] = useState(true);
    // 1. جلب البيانات من الـ API عند فتح الواجهة
    useEffect(() => {
        async function loadSectiontoClasses() {
            try {
                // تأكد من أن دالة sectiontoclass معرفة ومستوردة بشكل صحيح
                const data = await sectiontoclass();
                // if (data && data.data) {

                // تم وضع حماية هنا للتأكد من أن البيانات مصفوفة وليست undefined
                if (data && data.data) {
                    setClassesData(data.data);
                } else if (Array.isArray(data)) {
                    setClassesData(data);
                }

                // }
                setLoading(false);
            } catch (err) {
                console.error("خطأ أثناء جلب البيانات:", err);
                setLoading(false);
            }
        }
        loadSectiontoClasses();
    }, []);



    // 2. تحديث قيمة الـ Checkbox محلياً في الـ React State
    const handleToggleSection = (classId, sectionName) => {
        setClassesData(prevClasses =>
            prevClasses.map(cls => {
                if (cls.class_id === classId) {
                    return {
                        ...cls,
                        sections: cls.sections.map(sec =>
                            sec.name === sectionName ? { ...sec, checked: !sec.checked } : sec
                        )
                    };
                }
                return cls;
            })
        );
    };

    // 3. إرسال البيانات النهائية ليتم حفظها وتعديل جدول الـ sections في لارافيل
    // const handleSaveData = () => {
    //     axios.post('/api/admin/save-classes-sections', { classes: classesData })
    //         .then(response => {
    //             alert(response.data.message);
    //         })
    //         .catch(error => {
    //             console.error("خطأ أثناء حفظ البيانات:", error);
    //         });
    // };

    // };
    const handleSaveData = async () => {
        try {
            const response = await setsectiontoclass(classesData);

            console.log("Saved:", response);

            // handleClose();

            // إضافة حماية (Optional Chaining) للتأكد من عدم انهيار التطبيق إذا كانت هذه الدوال غير قادمة كـ props
            if (typeof refreshSchoolYears === 'function') await refreshSchoolYears();
            if (typeof handleClose === 'function') handleClose();

            // تنظيف الحقول
            // if (typeof setFormData === 'function') {
            // setFormData({
            // data: classesData,
            // });
            // }

            // alert("تم الحفظ بنجاح!");
        } catch (error) {
            console.error("Error saving school year:", error);
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
        <Box sx={{ p: 4, maxWidth: 900, margin: 'auto' }}>


            {/* إضافة ?.map لحماية القائمة من الـ undefined */}
            {classesData?.map((cls) => (
                <Paper key={cls.class_id} sx={{ p: 3, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row-reverse' }}>
                    {/* اسم الصف */}
                    <Typography variant="h6" sx={{ minWidth: 150, textAlign: 'right', fontWeight: 'medium' }}>
                        {cls.class_name}
                    </Typography>

                    {/* الشعب المتاحة على هيئة Checkboxes */}
                    <FormGroup row sx={{ display: 'flex', flexDirection: 'row-reverse', gap: 2 }}>
                        {/* إضافة ?.map لحماية الـ sections في حال كانت undefined من السيرفر */}
                        {cls.sections?.map((sec) => (
                            <FormControlLabel
                                key={sec.name}
                                label={`شعبة ${sec.name}`}
                                labelPlacement="start" // لجعل الكتابة متناسقة مع اللغة العربية
                                control={
                                    <Checkbox
                                        checked={!!sec.checked}
                                        onChange={() => handleToggleSection(cls.class_id, sec.name)}
                                        color="primary"
                                    />
                                }
                            />
                        ))}
                    </FormGroup>
                </Paper>
            ))}

            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 3 }}>
                <Button variant="contained" color="primary" size="large" onClick={handleSaveData}>
                    حفظ
                </Button>
            </Box>
        </Box>
    );
}