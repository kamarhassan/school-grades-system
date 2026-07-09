import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ClassIcon from "@mui/icons-material/Class";
import QuizIcon from "@mui/icons-material/Quiz";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SettingsIcon from "@mui/icons-material/Settings";

export const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: DashboardIcon,   // ✅ بدون <>
  },
  {
    title: "Students",
    path: "/students",
    icon: PeopleIcon,
  },
  {
    title: "Students Reports",
    path: "/studentsreports",
    icon: MenuBookIcon,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: SettingsIcon,
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