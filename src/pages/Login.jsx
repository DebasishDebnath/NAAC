import React, { useState } from "react";
import { useSuperadminApi } from "../Apis/Authentication/SigninSuperadmin";
import { useUserApi } from "../Apis/Authentication/SigninUser";
import { useNotification } from "../hooks/useHttp";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signinSuperadmin } = useSuperadminApi();
  const { signinUser } = useUserApi();
  const { showError } = useNotification();
  const params = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let response;

    try {
      if (params.role === "superadmin")
        response = await signinSuperadmin(email, password);
      else if (params.role === "user")
        response = await signinUser(email, password);

      if (!response?.success) {
        showError("Login failed. Please check your credentials.");
        return;
      }

      sessionStorage.setItem("role", response?.data?.role);
      navigate(`/${response?.data?.role}/dashboard`);
    } catch (error) {
      console.error("Login error:", error);
      showError("An unexpected error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#f0f4ff" }} 
    >
      <div className="w-full max-w-md">
        <div
          className="rounded-lg overflow-hidden"
          style={{ backgroundColor: "var(--color-card)", boxShadow: "var(--shadow-xl)" }} // Solid color
        >
          <div
            className="p-8 text-center"
            style={{
              backgroundColor: "var(--card-header)",
            }}
          >
            <div
              className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full backdrop-blur-sm"
              style={{ background: "rgba(255, 255, 255, 0.2)" }}
            >
              <User className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">
              {params.role.charAt(0).toUpperCase() + params.role.slice(1)} Login
            </h2>
            <p className="text-blue-100">
              Enter your credentials to access the dashboard
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                    Forgot Password?
                  </a>
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
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
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
            style={{ borderColor: "var(--color-border)", backgroundColor: "#f9fafb" }}
          >
            <p className="text-gray-600">
              Don’t have an account?{" "}
              <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
                Contact admin
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
