import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";

function SidebarItem({ title, path, icon }) {
  return (
    <ListItemButton
      component={NavLink}
      to={path}
      sx={{
        mx: 1,
        mb: 0.5,
        borderRadius: 2,
        py: 1,

        color: "text.primary",

        "& .MuiListItemIcon-root": {
          color: "text.secondary",
          minWidth: 38,
        },

        "&.active": {
          bgcolor: "primary.main",
          color: "white",

          "& .MuiListItemIcon-root": {
            color: "white",
          },
        },

        "&:hover": {
          bgcolor: "primary.light",
          color: "white",

          "& .MuiListItemIcon-root": {
            color: "white",
          },
        },
      }}
    >
      <ListItemIcon>
        {icon}
      </ListItemIcon>

      <ListItemText
        primary={title}
        sx={{
          "& .MuiTypography-root": {
            fontSize: 14,
            fontWeight: 500,
          },
        }}
      />
    </ListItemButton>
  );
}

export default SidebarItem;