import { TableCell, TextField } from "@mui/material";

function GradeCell({
  grade,
  maxScore = 100,
  onChange,
  rowIndex,
  colIndex,
  onKeyDownEnter,
}) {
  const numericGrade = Number(grade);

  // التحقق من الخطأ (أكبر من الحد الأقصى أو أقل من الصفر)
  const hasError =
    grade !== "" &&
    grade !== null &&
    grade !== undefined &&
    (numericGrade > maxScore || numericGrade < 0);

  const handleKeyDown = (e) => {
    // منع الفاصلة العادية (,) والإشارات (+ / -) والأحرف النصية (e/E)
    if (["e", "E", "-", "+", ","].includes(e.key)) {
      e.preventDefault();
      return;
    }

    // التنقل عند ضغط Enter
    if (e.key === "Enter") {
      e.preventDefault();
      onKeyDownEnter(rowIndex, colIndex);
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;

    // 1. السماح بالحذف (قيمة فارغة)
    if (val === "") {
      onChange(val);
      return;
    }

    // 2. السماح بكتابة أي رقم أو نقطة عشرية (السماح بالتجاوز ليظهر الخطأ باللون الأحمر)
    if (!isNaN(val) || val === ".") {
      onChange(val);
    }
  };

  return (
    <TableCell align="center">
      <TextField
        size="small"
        type="number"
        value={grade ?? ""}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        error={hasError} // سيقوم MUI بتلوين الحقل باللون الأحمر إذا كان hasError = true
        id={`grade-input-${rowIndex}-${colIndex}`}
        inputProps={{
          min: 0,
          max: maxScore,
          step: "any", // للسماح بالأرقام العشرية مثل 10.26
        }}
        sx={{
          width: 80,
          "& input": {
            textAlign: "center",
          },
        }}
      />
    </TableCell>
  );
}

export default GradeCell;