import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // أثناء فحص /me
  if (loading) {
    return <div>Loading...</div>;
  }

  // غير مسجل دخول
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // مسجل دخول
  return children;
}

export default ProtectedRoute;