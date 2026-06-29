import { TableCell } from "@mui/material";

function GradeCell({ subject, grade }) {
  return (
    <TableCell align="center">
      {grade ?? "-"}
    </TableCell>
  );
}

export default GradeCell;