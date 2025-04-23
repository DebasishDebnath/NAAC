import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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
import Layout from "./components/Layouts/Layout.jsx";
import SuperadminDashboard from "./pages/Superadmin/Dashboard";
// import UserDashboard from "./pages/User/Dashboard";
// import PsudoSuperadminDashboard from "./pages/PsudoSuperadmin/Dashboard";
import { ThemeProvider } from "./components/theme/ThemeProvider.jsx";
import Home from "./pages/User/Home.jsx";
import Reports from "./pages/User/Reports.jsx";
import Forms from "./pages/User/Forms.jsx";

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

// LoginRouteWrapper: restricts login route to only valid roles
const LoginRouteWrapper = () => {
  const { role } = useParams();
  if (!allowedRoles.includes(role)) {
    return <NotFound />;
  }
  return <LoginPage />;
};

// Redirect to appropriate dashboard based on role
const RedirectDashboard = () => {
  const role = sessionStorage.getItem("role");

  switch (role) {
    case "user":
      return <Navigate to="/user/dashboard" replace />;
    case "superadmin":
      return <Navigate to="/superadmin/dashboard" replace />;
    case "psudosuperadmin":
      return <Navigate to="/psudo/dashboard" replace />;
    default:
      return <Navigate to="/unauthorized" replace />;
  }
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SnackbarProvider maxSnack={3}>
          <NotificationProvider>
            <Router>
              <Routes>
                {/* Public Routes */}
                <Route path="/login/:role" element={<LoginRouteWrapper />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                {/* Root redirect */}
                <Route
                  path="/"
                  element={<Navigate to="/login/user" replace />}
                />

                {/* Dashboard redirect */}
                <Route
                  path="/dashboard"
                  element={
                    <TokenWrapper>
                      <RedirectDashboard />
                    </TokenWrapper>
                  }
                />

                {/* User Routes */}
                <Route
                  path="/user"
                  element={
                    <TokenWrapper>
                      <ProtectedRoute allowedRoles={["user"]}>
                        <Layout menus={["Home", "Forms", "Reports"]} >
                        <Routes>
                            <Route
                              path="dashboard"
                              element={<div>User Dashboard</div>}
                            />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </Layout>
                      </ProtectedRoute>
                    </TokenWrapper>
                  }
                >
                  <Route path="dashboard" element={<Home />} />
                  <Route path="forms" element={<Forms/>} />
                  <Route path="reports" element={<Reports/>} />
                  <Route path="*" element={<NotFound />} />
                  <Route index element={<Navigate to="dashboard" replace />} />
                </Route>

                {/* Superadmin Routes */}
                <Route
                  path="/superadmin"
                  element={
                    <TokenWrapper>
                      <ProtectedRoute allowedRoles={["superadmin"]}>
                        <Layout menus={["Home", "Email Request", "Pseudo Superadmin Add", "Reports"]} />
                      </ProtectedRoute>
                    </TokenWrapper>
                  }
                >
                  <Route path="dashboard" element={<SuperadminDashboard />} />
                  <Route path="emailrequest" element={<div>SuperAdmin Email Request</div>} />
                  <Route path="pseudosuperadmin-add" element={<div>SuperAdmin PseudoSuperadmin Add</div>} />
                  <Route path="reports" element={<div>SuperAdmin Reports</div>} />
                  <Route path="*" element={<NotFound />} />
                  <Route index element={<Navigate to="dashboard" replace />} />
                </Route>

                {/* Psudo-Superadmin Routes */}
                <Route
                  path="/psudo"
                  element={
                    <TokenWrapper>
                      <ProtectedRoute allowedRoles={["psudosuperadmin"]}>
                        <Layout menus={["Psudo", "Manage", "Settings"]} />
                        
                      </ProtectedRoute>
                    </TokenWrapper>
                  }
                >
                  <Route path="dashboard" element={<div>Psudo Superadmin Dashboard</div>} />
                  <Route path="panel" element={<div>PsudoSuperAdmin Panel</div>} />
                  <Route path="*" element={<NotFound />} />
                  <Route index element={<Navigate to="dashboard" replace />} />
                </Route>

                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </NotificationProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;