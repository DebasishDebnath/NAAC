import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Store the location they were trying to access for redirect after login
  const fromLocation = location.pathname;

  // Check if user is authenticated
  if (!user || !user.token) {
    // Redirect to login without hardcoding the role
    // Using the general login path, the login page can determine appropriate role
    return <Navigate to="/login" state={{ from: fromLocation }} replace />;
  }

  // Check if user has the required role to access this route
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;