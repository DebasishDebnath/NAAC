import { Navigate, useParams } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { role: routeRole } = useParams();

  const token = sessionStorage.getItem("token");
  const storedRole = sessionStorage.getItem("role");

  // If no token or no role, redirect to login
  if (!token || !storedRole) {
    return <Navigate to="/login/user" />;
  }

  

  // If user role doesn't match the role in the URL, redirect
  if (routeRole && user.role !== routeRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;