import { TableCell, TextField } from "@mui/material";

function GradeCell({ grade, onChange }) {
    return (
        <TableCell align="center">
            <TextField
                size="small"
                type="number"
                value={grade ?? ""}
                onChange={(e) => onChange(e.target.value)}
                inputProps={{
                    min: 0,
                    max: 20
                }}
                sx={{
                    width: 70
                }}
            />
        </TableCell>
    );
}

export default GradeCell;