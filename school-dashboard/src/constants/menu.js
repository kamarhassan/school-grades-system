import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SettingsIcon from "@mui/icons-material/Settings";

export const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: DashboardIcon,
    permission: null,
  },
  {
    title: "Students",
    path: "/students",
    icon: PeopleIcon,
    permission: "view students",
  },
  {
    title: "Students Reports",
    path: "/studentsreports",
    icon: MenuBookIcon,
    permission: "view grades",
  },
  {
    title: "Settings",
    path: "/settings",
    icon: SettingsIcon,
    permission: "settings",
  },
  // {
  //   title: "Classes",
  //   path: "/classes",
  //   icon: ClassIcon,
  // },
  // {
  //   title: "Exams",
  //   path: "/exams",
  //   icon: QuizIcon,
  // },
  // {
  //   title: "Supervisors",
  //   path: "/supervisors",
  //   icon: SupervisorAccountIcon,
  // },
  // {
  //   title: "Settings",
  //   path: "/settings",
  //   icon: SettingsIcon,
  // },
];