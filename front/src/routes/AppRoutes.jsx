import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Auth/Login";

export default function AppRoutes() {
  return (
    <Routes>
   
      {/* Pages */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}