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

function StudentsTable({ subjects, students }) {
  return (
    <TableContainer component={Paper}>
      <Table>

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
            />
          ))}

        </TableBody>

      </Table>
    </TableContainer>
  );
}

export default StudentsTable;