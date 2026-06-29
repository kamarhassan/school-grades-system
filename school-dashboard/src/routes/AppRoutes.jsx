import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Students from "../pages/Students/Students";
import StudentsReports from "../pages/Reports/StudentsReports";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
           <Route path="/studentsreports" element={<StudentsReports />} />
        {/*  <Route path="/classes" element={<Classes />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/supervisors" element={<Supervisors />} />
          <Route path="/settings" element={<Settings />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
