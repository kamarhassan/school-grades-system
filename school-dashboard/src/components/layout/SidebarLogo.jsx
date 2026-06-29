import { Box, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

function SidebarLogo() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        p: 3,
      }}
    >
      <SchoolIcon color="primary" sx={{ fontSize: 34 }} />

      <Typography
        variant="h6"
        fontWeight={700}
      >
        School System
      </Typography>
    </Box>
  );
}

export default SidebarLogo;