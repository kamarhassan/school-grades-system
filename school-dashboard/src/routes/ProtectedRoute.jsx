import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/context/AuthContext";
import { hasPermission } from "../auth/utils/permissions";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const routePermissions = {
    "/settings": "settings",
    "/students": "view students",
    "/studentsreports": "view grades",
  };

  const requiredPermission = routePermissions[location.pathname];

  if (requiredPermission && !hasPermission(user, requiredPermission)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
