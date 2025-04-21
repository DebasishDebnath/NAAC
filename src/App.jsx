import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useParams,
} from "react-router-dom";
import Signup from "./pages/SignUp.jsx";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { NotificationProvider } from "./hooks/useHttp.jsx";
import LoginPage from "./pages/Login.jsx";
import { SnackbarProvider } from "notistack";
import "./index.css";

import SuperadminDashboard from "./pages/Superadmin/Dashboard";
// import UserDashboard from "./pages/User/Dashboard";
// import PsudoSuperadminDashboard from "./pages/PsudoSuperadmin/Dashboard";

// Allowed login roles
const allowedRoles = ["user", "superadmin", "psudosuperadmin"];

// TokenWrapper: wraps protected routes
const TokenWrapper = ({ children }) => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  if (!token || !role) {
    return <Navigate to="/login/user" replace />;
  }

  return children;
};

// RedirectDashboard: handles route /dashboard and redirects based on role
const RedirectDashboard = () => {
  const role = sessionStorage.getItem("role");

  switch (role) {
    case "user":
      return <Navigate to="/dashboard/user" replace />;
    case "superadmin":
      return <Navigate to="/dashboard/superadmin" replace />;
    case "psudosuperadmin":
      return <Navigate to="/dashboard/psudo" replace />;
    default:
      return <Navigate to="/unauthorized" replace />;
  }
};

// LoginRouteWrapper: restricts login route to only valid roles
const LoginRouteWrapper = () => {
  const { role } = useParams();
  if (!allowedRoles.includes(role)) {
    return <NotFound />;
  }
  return <LoginPage />;
};

function App() {
  return (
    <AuthProvider>
      <SnackbarProvider maxSnack={3}>
        <NotificationProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/login/:role" element={<LoginRouteWrapper />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Routes */}
              <Route
                path="*"
                element={
                  <TokenWrapper>
                    <Routes>
                      <Route path="/unauthorized" element={<Unauthorized />} />
                      <Route path="/dashboard" element={<RedirectDashboard />} />
                      <Route
                        path="/dashboard/user"
                        element={
                          <ProtectedRoute allowedRoles={["user"]}>
                            {/* <UserDashboard /> */}
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/dashboard/superadmin"
                        element={
                          <ProtectedRoute allowedRoles={["superadmin"]}>
                            <SuperadminDashboard />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/dashboard/psudo"
                        element={
                          <ProtectedRoute allowedRoles={["psudosuperadmin"]}>
                            {/* <PsudoSuperadminDashboard /> */}
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin"
                        element={
                          <ProtectedRoute allowedRoles={["superadmin"]}>
                            <div>SuperAdmin Panel</div>
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/psudo-admin"
                        element={
                          <ProtectedRoute allowedRoles={["psudosuperadmin"]}>
                            <div>PsudoSuperAdmin Panel</div>
                          </ProtectedRoute>
                        }
                      />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </TokenWrapper>
                }
              />
            </Routes>
          </Router>
        </NotificationProvider>
      </SnackbarProvider>
    </AuthProvider>
  );
}

export default App;
