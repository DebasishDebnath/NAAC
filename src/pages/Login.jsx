import React, { useState, useEffect } from "react";
import { useSuperadminApi } from "../Apis/Authentication/SigninSuperadmin";
import { useUserApi } from "../Apis/Authentication/SigninUser";
import { useNotification } from "../hooks/useHttp";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { User, ChevronDown } from "lucide-react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useForgotPassword } from "@/Apis/Login/forgetPassword";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [mobileNo, setMobileNo] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { signinSuperadmin } = useSuperadminApi();
  const { signinUser } = useUserApi();
  const { showError } = useNotification();
  const params = useParams();
  const navigate = useNavigate();
  const { user, loginUser } = useAuth();
  const { sendOtp, verifyOtp, changePassword } = useForgotPassword();

  const handleSendOtp = async () => {
    await sendOtp(mobileNo);
  };

  const handleVerifyOtp = async () => {
    await verifyOtp(mobileNo, otp);
  };

  const handleChangePassword = async () => {
    await changePassword(mobileNo, newPassword);
  };

  useEffect(() => {
    if (params.role) {
      setSelectedRole(params.role);
    }
  }, [params.role]);

  // Redirect if already logged in
  if (user && user.token) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setDropdownOpen(false);
    navigate(`/login/${role}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let response;

    try {
      const currentRole = selectedRole || params.role;

      if (currentRole === "superadmin")
        response = await signinSuperadmin(email, password);
      else if (currentRole === "user" || currentRole === "psudosuperadmin")
        response = await signinUser(email, password);

      if (!response?.success) {
        showError("Login failed. Please check your credentials.");
        setIsLoading(false);
        return;
      }

      // Use context to save user data
      loginUser({
        email,
        token: response?.data?.token,
        role: response?.data?.role,
      });

      navigate(`/${response?.data?.role}/dashboard`, { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      showError("An unexpected error occurred during login.");
      setIsLoading(false);
    }
  };

  // Rest of your component remains the same...
  const roleDisplay = {
    superadmin: "Super Admin",
    user: "User",
    psudosuperadmin: "Pseudo User",
  };

  const currentRoleDisplay =
    roleDisplay[selectedRole || params.role] || "Select Role";

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#f0f4ff" }}
    >
      <div className="w-full max-w-md">
        <div
          className="rounded-lg overflow-hidden"
          style={{
            backgroundColor: "var(--color-card)",
            boxShadow: "var(--shadow-xl)",
          }}
        >
          <div
            className="p-8 text-center"
            style={{
              backgroundColor: "var(--card-header)",
            }}
          >
            {/* Role dropdown */}
            <div className="relative mb-4 flex justify-end">
              {/* <button
                type="button"
                className="flex items-center justify-between w-auto px-4 py-2 text-sm font-medium text-black bg-[#fff] rounded-md hover:bg-[#fafafa] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {currentRoleDisplay}
                <ChevronDown className="w-4 h-4 ml-2" />
              </button> */}

              {dropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
                  <ul className="py-1">
                    <li>
                      <button
                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                        onClick={() => handleRoleSelect("superadmin")}
                      >
                        Super Admin
                      </button>
                    </li>
                    <li>
                      <button
                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                        onClick={() => handleRoleSelect("user")}
                      >
                        User
                      </button>
                    </li>
                    <li>
                      <button
                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                        onClick={() => handleRoleSelect("psudosuperadmin")}
                      >
                        Pseudo User
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div
              className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full backdrop-blur-sm"
              style={{ background: "rgba(255, 255, 255, 0.2)" }}
            >
              <User className="text-white" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-1">
              {currentRoleDisplay} Login
            </h2>
            <p className="text-blue-100">
              Enter your credentials to access the dashboard
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@example.com"
                />
              </div>

              <div>
                <div className="flex justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-800"
                    onClick={() => setShowOtpForm(true)}
                  >
                    Forgot Password?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>

              <Button
                type="submit"
                disabled={isLoading || !selectedRole}
                className="w-full"
                style={{
                  backgroundColor: "#2563eb",
                  color: "white",
                }}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </div>

          <div
            className="text-center border-t text-sm px-8 py-4"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "#f9fafb",
            }}
          >
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Contact admin
              </a>
            </p>
          </div>
        </div>
      </div>
      {showOtpForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#ced2ebdd] backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md px-8 py-6 space-y-6 relative">
         
            <button
              onClick={() => setShowOtpForm(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-semibold"
              aria-label="Close"
            >
              ×
            </button>

            <h3 className="text-xl font-bold text-center text-gray-800">
              Reset Your Password
            </h3>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <Input
                type="number"
                placeholder="e.g. 9876543210"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                className="focus:ring-2 focus:ring-blue-500"
              />
              <Button
                type="button"
                onClick={handleSendOtp}
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
              >
                Send OTP
              </Button>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">OTP</label>
              <Input
                type="number"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="focus:ring-2 focus:ring-green-500"
              />
              <Button
                type="button"
                onClick={handleVerifyOtp}
                className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white transition-all duration-200"
              >
                Verify OTP
              </Button>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                New Password
              </label>
              <Input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="focus:ring-2 focus:ring-purple-500"
              />
              <Button
                type="button"
                onClick={handleChangePassword}
                className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white transition-all duration-200"
              >
                Change Password
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
