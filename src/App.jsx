import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp.jsx";
import Dashboard from "./pages/Dashboard";
import Unauthorized from "./pages/Unauthorized";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
         
          <Route path="/login/:role" element={<Login />} />
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
    </AuthProvider>
  );
}

export default App;
