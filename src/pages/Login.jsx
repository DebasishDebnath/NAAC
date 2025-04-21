import React, { useState } from "react";
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
import { useSuperadminApi } from "../Apis/Authentication/SigninSuperadmin";
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
  const { showError } = useNotification();
  const params = useParams();
  const navigate= useNavigate()

  console.log(params.role);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let response;

    try {
      if (params.role === "superadmin")
        response = await signinSuperadmin(email, password);
      else {
        // showError("An unexpected error occurred during login.");
      }

      if (!response || !response.success) {
        showError("Login failed. Please check your credentials.");
      }

      if(response?.success){
        sessionStorage.setItem('role', response?.data?.role)
        console.log(`/dashboard/${response?.data?.role}`)
        navigate(`/dashboard/${response?.data?.role}`)
      }
    } catch (error) {
      console.error("Login error:", error);
      showError("An unexpected error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center">
            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm">
              <User className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">{params.role.charAt(0).toUpperCase() + params.role.slice(1)} Login</h2>
            <p className="text-blue-100">
              Enter your credentials to access the dashboard
            </p>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="w-full outline-none"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Forgot Password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-all duration-300"
                variant="whiteText"
              >
                {isLoading ? (
                  <span className="flex items-center text-white">
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
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </div>

          {/* Footer Section */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Contact admin
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
