import { Stack, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function StudentsFilters({
  classId,
  sectionId,
  examId,
  classes,
  sections,
  exams,
  onClassChange,
  onSectionChange,
  onExamChange,
}) {
  return (
    <Stack direction="row" spacing={4} sx={{ mb: 3 }}>
  {/* EXAM */}
      <FormControl fullWidth size="small">
        <InputLabel>Exam</InputLabel>
        <Select
          value={examId}
          label="Exam"
          onChange={(e) => onExamChange(e.target.value)}
        >
          {exams.map((e) => (
            <MenuItem key={e.id} value={e.id}>
              {e.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* CLASS */}
      <FormControl fullWidth size="small">
        <InputLabel>Class</InputLabel>
        <Select
          value={classId}
          label="Class"
          onChange={(e) => onClassChange(e.target.value)}
        >
          {classes.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* SECTION */}
      <FormControl fullWidth size="small" disabled={!classId}>
        <InputLabel>Section</InputLabel>
        <Select
          value={sectionId}
          label="Section"
          onChange={(e) => onSectionChange(e.target.value)}
        >
          {sections.map((s) => (
            <MenuItem key={s.id} value={s.id}>
              {s.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

    
    </Stack>
  );
}

export default StudentsFilters;