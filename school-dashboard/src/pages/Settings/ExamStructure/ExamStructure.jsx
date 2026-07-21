import {
    Box,
    CircularProgress,
    Card,
    CardContent,
    Typography,
    Checkbox,
    FormControlLabel,
    Grid
} from '@mui/material';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { examSettings } from '../../../services/setting/examSetting.service';

export default function ExamStructure() {

    const [loading, setLoading] = useState(true);
    const [examTypes, setExamTypes] = useState([]);

    useEffect(() => {
        async function getexamsettings() {
            try {
                // تأكد من أن دالة examSettings معرفة ومستوردة بشكل صحيح
                const data = await examSettings();
                // if (data && data.data) {
                // console.log(data.data);
                // تم وضع حماية هنا للتأكد من أن البيانات مصفوفة وليست undefined
                if (data && data.data) {
                    setExamTypes(data.data);
                } else if (Array.isArray(data)) {
                    setExamTypes(data);
                }

                // }
                setLoading(false);
            } catch (err) {
                console.error("خطأ أثناء جلب البيانات:", err);
                setLoading(false);
            }
        }
        getexamsettings();
    }, []);





    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 5
            }}>
                <CircularProgress />
            </Box>
        );
    }


    return (
        <>
            <Box sx={{ p: 3 }}>

                <Typography variant="h4" mb={3}>
                    Exam Structure
                </Typography>


                {
                    examTypes.map((exam) => (

                        <Card
                            key={exam.assessment_type_id}
                            sx={{ mb: 3 }}
                        >

                            <CardContent>

                                <Typography
                                    variant="h6"
                                    mb={2}
                                >
                                    {exam.assessment_name}
                                </Typography>


                                <Grid container spacing={2}>

                                    {
                                        exam.subjects.map((subject) => (

                                            <Grid
                                                item
                                                xs={12}
                                                md={4}
                                                key={subject.class_subject_id}
                                            >

                                                <FormControlLabel

                                                    control={
                                                        <Checkbox
                                                            checked={
                                                                subject.is_split
                                                            }
                                                        />
                                                    }

                                                    label={
                                                        subject.subject
                                                    }

                                                />

                                            </Grid>

                                        ))
                                    }

                                </Grid>

                            </CardContent>

                        </Card>

                    ))
                }


            </Box>
        </>
    );
}