import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/SignUp.jsx";
import Dashboard from "./pages/Dashboard";
import Unauthorized from "./pages/Unauthorized";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { NotificationProvider } from "./hooks/useHttp.jsx";
import LoginPage from "./pages/Login.jsx";
import { SnackbarProvider } from "notistack";

function App() {
  return (
      <AuthProvider>
      <SnackbarProvider maxSnack={3}>
      <NotificationProvider>
        <Router>
          <Routes>
            <Route path="/login/:role" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  allowedRoles={["user", "superadmin", "psudosuperadmin"]}
                >
                  <Dashboard />
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
          </Routes>
        </Router>
        </NotificationProvider>
      </SnackbarProvider>
      </AuthProvider>
  );
}

export default App;
