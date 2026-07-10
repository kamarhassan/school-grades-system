import { List } from "@mui/material";
import SidebarItem from "./SidebarItem";
import { menuItems } from "../../constants/menu";
import { useAuth } from "../../auth/context/AuthContext";
import { hasPermission } from "../../auth/utils/permissions";

export default function SidebarMenu() {
  const { user } = useAuth();

  return (
    <List sx={{ px: 1 }}>
      {menuItems
        .filter((item) => hasPermission(user, item.permission))
        .map((item) => {
          const Icon = item.icon;

          return (
            <SidebarItem
              key={item.path}
              title={item.title}
              path={item.path}
              icon={<Icon />}
            />
          );
        })}
    </List>
  );
}
