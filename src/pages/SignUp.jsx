import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { UserPlus, CheckCircle, Edit, Mail } from "lucide-react";
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
  const [editingEmail, setEditingEmail] = useState(false);
  const { sendOtp, verifyOtp } = useOtpCheck();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDropdownChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleEditEmail = () => {
    setEditingEmail(true);
    setOtpVerified(false);
    setOtpSent(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showError("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);
      const { confirmPassword, ...submitData } = formData;
      const response = await signupUser(submitData);

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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-800 p-10 text-center">
            <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/30 backdrop-blur-md shadow-lg">
              <UserPlus className="text-white h-10 w-10" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 capitalize">
              {params.role} Signup
            </h2>
            <p className="text-blue-100 text-lg">Join our community today</p>
          </div>

          <div className="p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="text-sm font-semibold text-gray-700 block mb-1.5">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="border-gray-200 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="emailId" className="text-sm font-semibold text-gray-700 block mb-1.5">
                  Email Address
                </label>
                <div className="flex gap-3 items-center">
                  {otpVerified && !editingEmail ? (
                    <div className="flex-1 flex items-center border-2 border-gray-200 rounded-md px-4 py-2 bg-gray-50">
                      <Mail className="text-green-600 mr-2 h-5 w-5" />
                      <span className="flex-1 text-gray-700 font-medium">{formData.emailId}</span>
                      <button 
                        type="button" 
                        onClick={handleEditEmail}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
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
                      placeholder="your.email@example.com"
                      className="border-gray-200 focus:border-blue-500"
                    />
                  )}
                  {!otpVerified && (
                    <Button
                      type="button"
                      onClick={async () => {
                        if (!formData.emailId)
                          return showError("Enter an email address");
                        setIsLoading(true);
                        const res = await sendOtp(formData.emailId);
                        if (res.success) {
                          setOtpSent(true);
                          showSuccess("OTP sent to your email!");
                        } else {
                          showError(res.message || "Failed to send OTP.");
                        }
                        setIsLoading(false);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                    >
                      {otpSent ? "Resend" : "Verify"}
                    </Button>
                  )}
                </div>
              </div>

              {otpSent && !otpVerified && (
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                  <label className="text-sm font-semibold text-gray-700 block mb-3">
                    Enter OTP sent to your email
                  </label>
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={setOtp}
                    containerClassName="justify-center mb-4"
                  >
                    <InputOTPGroup>
                      {[...Array(6)].map((_, i) => (
                        <InputOTPSlot key={i} index={i} className="border-blue-200 h-12 w-12 text-lg font-bold" />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                  <Button
                    onClick={async () => {
                      setIsVerifyingOtp(true);
                      const res = await verifyOtp(formData.emailId, otp);
                      if (res.success) {
                        setOtpVerified(true);
                        setEditingEmail(false);
                        showSuccess("Email verified successfully!");
                      } else {
                        showError("Invalid OTP. Please try again.");
                      }
                      setIsVerifyingOtp(false);
                    }}
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={otp.length !== 6 || isVerifyingOtp}
                  >
                    {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
                  </Button>
                </div>
              )}

              {otpVerified && !editingEmail && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Email verification successful</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="mobileNo" className="text-sm font-semibold text-gray-700 block mb-1.5">
                    Mobile Number
                  </label>
                  <Input
                    id="mobileNo"
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    required
                    placeholder="Your mobile number"
                    className="border-gray-200 focus:border-blue-500"
                  />
                </div>
                
                <CustomDropdown
                  label="Department"
                  options={departmentOptions}
                  value={formData.department}
                  onChange={(val) => handleDropdownChange("department", val)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="password" className="text-sm font-semibold text-gray-700 block mb-1.5">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Create a strong password"
                    className="border-gray-200 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700 block mb-1.5">
                    Confirm Password
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm your password"
                    className="border-gray-200 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>

              <Button
                type="submit"
                disabled={isLoading || !otpVerified}
                className={`w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-lg font-medium transition-all duration-300 mt-2 ${
                  !otpVerified ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </div>

          <div className="px-10 py-6 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a
                href={`/login/${params.role}`}
                className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
              >
                Sign in instead
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}