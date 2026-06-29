import { Drawer, Box } from "@mui/material";

import SidebarLogo from "./SidebarLogo";
import SidebarMenu from "./SidebarMenu";

import { DRAWER_WIDTH } from "../../constants/layout";

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          borderRight: "1px solid #eee",
        },
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SidebarLogo />

        <Box sx={{ flex: 1, overflowY: "auto" }}>
          <SidebarMenu />
        </Box>
      </Box>
    </Drawer>
  );
}

export default Sidebar;