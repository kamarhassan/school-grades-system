import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  InputBase,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircle from "@mui/icons-material/AccountCircle";

import { DRAWER_WIDTH, NAVBAR_HEIGHT } from "../../constants/layout";

function Navbar() {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        ml: `${DRAWER_WIDTH}px`,
        height: NAVBAR_HEIGHT,
        justifyContent: "center",
        borderBottom: "1px solid #eee",
        bgcolor: "background.paper",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* 🔍 Search */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#f5f5f5",
            px: 2,
            py: 0.5,
            borderRadius: 2,
            width: 300,
          }}
        >
          <SearchIcon sx={{ color: "gray", mr: 1 }} />
          <InputBase placeholder="Search..." fullWidth />
        </Box>

        {/* ⚡ Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          
          <IconButton>
            <NotificationsIcon />
          </IconButton>

          <IconButton>
            <MailIcon />
          </IconButton>

          <IconButton>
            <AccountCircle />
          </IconButton>

        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;