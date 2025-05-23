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
import SuperadminReports from "../src/pages/Superadmin/Reports/index.jsx";
import User from "./pages/Superadmin/Users/User.jsx";
import AddEmails from "./pages/Superadmin/Users/AddEmails.jsx";
import Profile from "./pages/User/Profile.jsx";
import PsudoUser from "./pages/Superadmin/PsudoUser/PsudoUser.jsx";
import Drafts from "./pages/User/Drafts.jsx";
import { NotificationProvider } from "./hooks/useHttp.jsx";
import SubmittedReports from "./pages/User/SubmittedReports.jsx";
import Notificatons from "./pages/User/Notificatons.jsx";
import Manage from "./pages/PsudoSuperadmin/Manage/Manage.jsx";
import PreviewSubmit from "./pages/User/PreviewSubmit.jsx";
import Requests from "./pages/Superadmin/Requests/Requests.jsx";
import EachReportTable from "./pages/Superadmin/Reports/EachReportTable.jsx";
import PseudoAdminDashboard from "./pages/PsudoSuperadmin/Dashboard/PseudoAdminDashboard.jsx";
import PsudoUserEdit from "./pages/PsudoSuperadmin/Manage/PsudoUserEdit.jsx";

// Flag to control route protection
// When set to true: Protected routes are enforced (normal security behavior)
// When set to false: All routes are accessible without authentication/authorization
const ENFORCE_ROUTE_PROTECTION = true;

// Allowed login roles
const allowedRoles = ["user", "superadmin", "psudosuperadmin"];

// TokenWrapper: wraps protected routes
const TokenWrapper = ({ children }) => {
  // If we're not enforcing protection, skip the token check
  if (!ENFORCE_ROUTE_PROTECTION) {
    return children;
  }

  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  if (!token || !role) {
    // const lastRole = sessionStorage.getItem("role") || "user";
    return <Navigate to={`/login/${role}`} replace />;
  }

  return children;
};

// Modified ProtectedRouteWrapper to honor the flag
const ProtectedRouteWrapper = ({ allowedRoles, children }) => {
  // If we're not enforcing protection, render the children directly
  if (!ENFORCE_ROUTE_PROTECTION) {
    return children;
  }

  // Otherwise use the original ProtectedRoute component
  return (
    <ProtectedRoute allowedRoles={allowedRoles}>{children}</ProtectedRoute>
  );
};
const LoginWrapper = () => {
  const { role } = useParams();
  console.log("role1: ", role);
  return <LoginRouteWrapper role={role} />;
};
// LoginRouteWrapper: restricts login route to only valid roles
const LoginRouteWrapper = ({ role }) => {
  console.log("role2: ", role);

  if (!allowedRoles.includes(role)) {
    return <NotFound />;
  }
  return <LoginPage />;
};

// Redirect to appropriate dashboard based on role
const RedirectDashboard = () => {
  // If protection is disabled, default to user dashboard
  if (!ENFORCE_ROUTE_PROTECTION) {
    return <Navigate to="/user/dashboard" replace />;
  }

  const role = sessionStorage.getItem("role");

  switch (role) {
    case "user":
      return <Navigate to="/user/dashboard" replace />;
    case "superadmin":
      return <Navigate to="/superadmin/dashboard" replace />;
    case "psudosuperadmin":
      return <Navigate to="/psudosuperadmin/dashboard" replace />;
    default:
      return <Navigate to="/unauthorized" replace />;
  }
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <SnackbarProvider maxSnack={3}>
            <NotificationProvider>
              <Routes>
                {/* Public Routes */}
                <Route path="/login/:role" element={<LoginWrapper />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                {/* Root redirect */}
                <Route
                  path="/"
                  element={
                    <Navigate
                      to={`/login/${sessionStorage.getItem("role") || "user"}`}
                      replace
                    />
                  }
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
                      <ProtectedRouteWrapper allowedRoles={["user"]}>
                        <Layout
                          menus={["Home", "Forms", "Reports"]}
                          submenu={{
                            Reports: ["Drafts", "Submissions"],
                          }}
                        >
                          <Routes>
                            <Route
                              path="dashboard"
                              element={<div>User Dashboard</div>}
                            />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </Layout>
                      </ProtectedRouteWrapper>
                    </TokenWrapper>
                  }
                >
                  <Route path="dashboard" element={<Home />} />
                  <Route path="forms" element={<Forms />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="notifications" element={<Notificatons />} />
                  <Route path="notifications/:id" element={<Notificatons />} />
                  <Route path="reports/drafts" element={<Drafts />} />

                  <Route
                    path="forms/previewsubmit"
                    element={<PreviewSubmit />}
                  />

                  <Route
                    path="reports/submissions"
                    element={<SubmittedReports />}
                  />

                  <Route path="*" element={<NotFound />} />
                  <Route index element={<Navigate to="dashboard" replace />} />
                </Route>

                {/* Superadmin Routes */}
                <Route
                  path="/superadmin"
                  element={
                    <TokenWrapper>
                      <ProtectedRouteWrapper allowedRoles={["superadmin"]}>
                        <Layout
                          menus={["Home", "Users", "Reports", "Requests"]}
                          submenu={{
                            Users: ["User", "Pseudo User", "Add Email"],
                          }}
                        />
                      </ProtectedRouteWrapper>
                    </TokenWrapper>
                  }
                >
                  <Route path="dashboard" element={<SuperadminDashboard />} />
                  <Route path="emails" element={<div>SuperAdmin Emails</div>} />
                  <Route path="requests" element={<Requests />} />
                  <Route path="users/user" element={<User />} />
                  <Route path="users/add-email" element={<AddEmails />} />
                  <Route path="users/pseudo-user" element={<PsudoUser />} />

                  {/* Add the reports/:userId route here */}
                  <Route path="reports/:userId" element={<EachReportTable />} />

                  <Route
                    path="reports"
                    element={
                      <div>
                        <SuperadminReports />
                      </div>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                  <Route index element={<Navigate to="dashboard" replace />} />
                </Route>

                {/* Psudo-Superadmin Routes */}
                <Route
                  path="/psudosuperadmin"
                  element={
                    <TokenWrapper>
                      <ProtectedRouteWrapper allowedRoles={["psudosuperadmin"]}>
                        <Layout menus={["Dashboard", "Manage"]} />
                      </ProtectedRouteWrapper>
                    </TokenWrapper>
                  }
                >
                  <Route
                    path="dashboard"
                    element={<PseudoAdminDashboard/>}
                  />
                  <Route
                    path="manage"
                    element={
                      <div>
                        <Manage />
                      </div>
                    }
                  />
                  <Route
                    path="manage/edit/:id"
                    element={
                      <div>
                        <PsudoUserEdit />
                      </div>
                    }
                  />
                  <Route
                    path="panel"
                    element={<div>PsudoSuperAdmin Panel</div>}
                  />
                  <Route path="*" element={<NotFound />} />
                  <Route index element={<Navigate to="dashboard" replace />} />
                </Route>

                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </NotificationProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
