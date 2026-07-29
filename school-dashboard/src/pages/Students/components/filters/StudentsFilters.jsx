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
              {c.class_name}
              {/* console.log("CLASSES FROM API:",  {c.name}); // للتأكد */}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

 {/* EXAM */}
      <FormControl fullWidth size="small" disabled={!classId}>
        <InputLabel>Exam</InputLabel>
        <Select
          value={examId}
          label="Exam"
          // disabled={!classId}, is_active
          onChange={(e) => onExamChange(e.target.value)}
          >
          {exams.map((e) => (
            <MenuItem key={e.id} value={e.id}
            disabled={e.is_active === 0}>
              {e.name}
              
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* SECTION */}
      <FormControl fullWidth size="small" disabled={!examId}>
        <InputLabel>Section</InputLabel>
        <Select
          value={sectionId}
          label="Section"
          onChange={(e) => onSectionChange(e.target.value)}
        >
          {sections.map((s) => (
            <MenuItem key={s.id} value={s.id}>
              {s.section_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

    

 
    </Stack>
  );
}

export default StudentsFilters;