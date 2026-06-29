import { TableRow, TableCell } from "@mui/material";
import GradeCell from "./GradeCell";

function StudentRow({ student, subjects }) {
    return (
        <TableRow>

            <TableCell>
                {student.name}
            </TableCell>

            {subjects.map((subject) => (
                <GradeCell
                    key={subject.id}
                    subject={subject}
                grade={student.grades?.[examId]?.[subject.id]}
                />
            ))}

        </TableRow>
    );
}

export default StudentRow;