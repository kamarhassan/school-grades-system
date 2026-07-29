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

function StudentsTable({
  subjects = [],
  students = [],
  handleGradeChange,
}) {
  // Function to move focus to the cell below
  const handleKeyDownEnter = (currentRowIndex, currentColIndex) => {
    const nextRowIndex = currentRowIndex + 1;
    const nextInputId = `grade-input-${nextRowIndex}-${currentColIndex}`;
    const nextInput = document.getElementById(nextInputId);

    if (nextInput) {
      nextInput.focus();
      nextInput.select(); // Optional: auto-select text for easy overwrite
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: 500,
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
          {students.map((student, rowIndex) => (
            <StudentRow
              key={student.id}
              student={student}
              subjects={subjects}
              rowIndex={rowIndex}
              onKeyDownEnter={handleKeyDownEnter}
              handleGradeChange={handleGradeChange}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StudentsTable;