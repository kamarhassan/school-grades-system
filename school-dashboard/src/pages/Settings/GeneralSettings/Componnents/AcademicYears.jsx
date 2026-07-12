import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Radio,
} from "@mui/material";

import { useState, useEffect } from "react";
import {
    // getschoolyears,
    setCurrentSchoolYear,
} from "../../../../services/setting/currentyears.service";
export default function AcademicYears({ schoolYears, setSchoolYears }) {
    // const [schoolYears, setSchoolYears] = useState([]);
    // const [schoolYearsIds, setSchoolYearsIds] = useState([]);
    const handleChange = async (id) => {
        try {
            // تحديث الواجهة
            setSchoolYears(
                schoolYears.map((row) => ({
                    ...row,
                    is_current: row.id === id ? 1 : 0,
                })),
            );

            // إرسال التغيير إلى الـ API
            await setCurrentSchoolYear(id);

            console.log("Updated school year:", id);
        } catch (error) {
            console.error("Update failed:", error);
        }
    };
    // useEffect(() => {
    //     async function loadSchoolYears() {
    //         try {
    //             const data = await getschoolyears();
    //             console.log("SCHOOL YEARS FROM API:", data); // للتأكد
    //             setSchoolYears(data.data);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     }

    //     // loadClasses();
    // }, []);

    // useEffect(() => {
    //     async function loadSchoolYears() {
    //         try {
    //             const data = await getschoolyears();
    //             const years = Array.isArray(data?.data)
    //                 ? data.data
    //                 : Array.isArray(data)
    //                   ? data
    //                   : [];
    //             console.log("SCHOOL YEARS FROM API:", years);
    //             setSchoolYears(years);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     }

    //     loadSchoolYears();
    // }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Year</TableCell>
                        <TableCell align="center">Is Active</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {schoolYears.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.year_name}</TableCell>

                            <TableCell>
                                <Radio
                                    checked={row.is_current === 1}
                                    onChange={() => handleChange(row.id)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
