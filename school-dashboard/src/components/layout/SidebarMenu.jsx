import { List } from "@mui/material";
import SidebarItem from "./SidebarItem";
import { menuItems } from "../../constants/menu";

function SidebarMenu() {
  console.log("menuItems:", menuItems); // 🔍 للتأكد

  return (
    <List sx={{ px: 1 }}>
      {menuItems.map((item) => {
        const Icon = item.icon;

        return (
          <SidebarItem
            key={item.path}
            title={item.title}
            path={item.path}
            icon={<Icon />} // ✔ هنا فقط JSX
          />
        );
      })}
    </List>
  );
}

export default SidebarMenu;
