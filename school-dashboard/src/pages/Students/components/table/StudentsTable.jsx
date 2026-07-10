import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import StudentRow from "./StudentRow";

function StudentsTable({ subjects = [], students = [] ,handleGradeChange }) {
  return (
    <TableContainer
            component={Paper}
            sx={{
                maxHeight: 500, // ارتفاع الجدول قبل ظهور الـ scroll
            }}
        >
            <Table stickyHeader>

        <TableHead>
          <TableRow>
            <TableCell>Student</TableCell>

            {subjects.map((subject) => (
              <TableCell key={subject.id} align="center">
                {subject.name}
              </TableCell>
            ))}

          </TableRow>
        </TableHead>

        <TableBody>

          {students.map((student) => (
            <StudentRow
              key={student.id}
              student={student}
              subjects={subjects}
              handleGradeChange={handleGradeChange}
            />
          ))}

        </TableBody>

      </Table>
    </TableContainer>
  );
}

export default StudentsTable;