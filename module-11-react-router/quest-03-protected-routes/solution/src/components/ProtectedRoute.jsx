import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login, saving current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
