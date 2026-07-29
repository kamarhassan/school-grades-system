import { TableCell, TextField } from "@mui/material";

function GradeCell({
  grade,
  onChange,
  rowIndex,
  colIndex,
  onKeyDownEnter,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submit or newline
      onKeyDownEnter(rowIndex, colIndex);
    }
  };

  return (
    <TableCell align="center">
      <TextField
        size="small"
        type="number"
        value={grade ?? ""}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        // Unique ID for easy focus targeting
        id={`grade-input-${rowIndex}-${colIndex}`} 
        inputProps={{
          min: 0,
          max: 20,
        }}
        sx={{
          width: 70,
        }}
      />
    </TableCell>
  );
}

export default GradeCell;