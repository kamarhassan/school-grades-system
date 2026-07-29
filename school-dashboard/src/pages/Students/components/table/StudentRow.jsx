import { TableRow, TableCell } from "@mui/material";
import GradeCell from "./GradeCell";

function StudentRow({ student, subjects, handleGradeChange }) {

    return (
        <TableRow>

            <TableCell
                align="center"
                sx={{
                    padding: "8px",
                    borderBottom: "1px solid #ddd"
                }}
            >
                {student.student_name}
            </TableCell>


            {subjects.map((subject) => (

                <GradeCell

                    key={subject.id}

                    grade={
                        student[`subject_${subject.id}`] ?? ""
                    }


                    onChange={(value)=>


                        handleGradeChange(

                            student.id,

                            subject.class_subject_id,

                            subject.subject_component_id,

                            value

                        )


                    }

                />

            ))}

        </TableRow>
    );
}

export default StudentRow;