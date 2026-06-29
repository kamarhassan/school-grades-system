import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

import { NAVBAR_HEIGHT } from "../constants/layout";

function MainLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>

      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>

        {/* NAVBAR */}
        <Navbar />

        {/* MAIN CONTENT */}
        <Box
          component="main"
          sx={{
            mt: `${NAVBAR_HEIGHT}px`,
            p: 3,
            bgcolor: "background.default",
            flex: 1,
          }}
        >
          <Outlet />
        </Box>

      </Box>
    </Box>
  );
}

export default MainLayout;