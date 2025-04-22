import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { UserPlus } from "lucide-react";
import { useNotification } from "../hooks/useHttp";
import { useNavigate, useParams } from "react-router-dom";
import CustomDropdown from "../components/manual/CustomDropdown";
import { useUserSignUp } from "../Apis/Authentication/SignupUser";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../components/ui/input-otp";
import { useOtpCheck } from "@/Apis/Authentication/UserOtpVerification";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    emailId: "",
    password: "",
    confirmPassword: "",
    mobileNo: "",
    department: "",
    designation: "",
    campus: "",
  });

  const departmentOptions = ["CSE", "IT", "ECE", "EEE", "ME", "CE"];
  const designationOptions = [
    "Assistant Professor",
    "Associate Professor",
    "Professor",
    "Technical Assistant",
  ];
  const campusOptions = ["IEM Newtown", "IEM Saltlake", "UEM Jaipur"];

  const { showError, showSuccess } = useNotification();
  const navigate = useNavigate();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { signupUser } = useUserSignUp();

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const {
    sendOtp,
    verifyOtp,
  }= useOtpCheck();

  // // Mock API hook functions
  // const sendOtp = async (email) => {
  //   // Replace with your actual API call
  //   return await fetch(`http://192.168.90.24:8000/api/v2/user/verifyemail?email=${email}`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email }),
  //   }).then((res) => res.json());
  // };

  // const verifyOtp = async (email, otp) => {
  //   return await fetch(`http://192.168.90.24:8000/api/v2/user/verifyemail?email=${email}&otp=${otp}`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email, otp }),
  //   }).then((res) => res.json());
  // };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDropdownChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showError("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);
      let response;

      // if (params.role === "superadmin") {
      const { confirmPassword, ...submitData } = formData;
      response = await signupUser(submitData);
      // }
      //  else {
      //   showError("Signup failed. Please check your role.");
      //   return;
      // }

      if (!response?.success) {
        showError("Signup failed. Please try again.");
      } else {
        navigate(`/login/user`);
      }
    } catch (error) {
      console.error("Signup error:", error);
      showError("An unexpected error occurred during signup.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center">
            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm">
              <UserPlus className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1 capitalize">
              {params.role} Signup
            </h2>
            <p className="text-blue-100">Create your account to continue</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full outline-none"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="emailId"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="flex gap-2">
                  <Input
                    id="emailId"
                    type="email"
                    name="emailId"
                    value={formData.emailId}
                    onChange={(e) => {
                      handleChange(e);
                      setOtpSent(false);
                      setOtpVerified(false);
                    }}
                    required
                    className="w-full"
                  />
                  <Button
                    type="button"
                    onClick={async () => {
                      if (!formData.emailId)
                        return showError("Enter an email address");
                      setIsLoading(true);
                      const res = await sendOtp(formData.emailId);
                      console.log(res)
                      if (res.success) {
                        setOtpSent(true);
                        showSuccess("OTP sent to your email!");
                      } else {
                        showError(res.message || "Failed to send OTP.");
                      }
                      setIsLoading(false);
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {otpSent ? "Resend OTP" : "Verify Email"}
                  </Button>
                </div>
              </div>

              {otpSent && !otpVerified && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Enter OTP
                  </label>
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={setOtp}
                    containerClassName="justify-center"
                  >
                    <InputOTPGroup>
                      {[...Array(6)].map((_, i) => (
                        <InputOTPSlot key={i} index={i} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                  <Button
                    onClick={async () => {
                      setIsVerifyingOtp(true);
                      const res = await verifyOtp(formData.emailId, otp);
                      if (res.success) {
                        setOtpVerified(true);
                        showSuccess("Email verified successfully!");
                      } else {
                        showError("Invalid OTP. Please try again.");
                      }
                      setIsVerifyingOtp(false);
                    }}
                    className="mt-2 bg-green-600 hover:bg-green-700"
                    disabled={otp.length !== 6 || isVerifyingOtp}
                  >
                    {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
                  </Button>
                </div>
              )}

              <div className="space-y-2">
                <label
                  htmlFor="mobileNo"
                  className="text-sm font-medium text-gray-700"
                >
                  Mobile Number
                </label>
                <Input
                  id="mobileNo"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  required
                  className="w-full outline-none"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full outline-none"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full outline-none"
                />
              </div>

              <CustomDropdown
                label="Department"
                options={departmentOptions}
                value={formData.department}
                onChange={(val) => handleDropdownChange("department", val)}
              />

              <CustomDropdown
                label="Designation"
                options={designationOptions}
                value={formData.designation}
                onChange={(val) => handleDropdownChange("designation", val)}
              />

              <CustomDropdown
                label="Campus"
                options={campusOptions}
                value={formData.campus}
                onChange={(val) => handleDropdownChange("campus", val)}
              />

              <Button
                type="submit"
                disabled={isLoading || !otpVerified}
                className={`w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 ${
                  !otpVerified ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Signing up..." : "Sign Up"}
              </Button>
            </form>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href={`/login/${params.role}`}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
