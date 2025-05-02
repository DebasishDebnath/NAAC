import { useHttp } from "@/hooks/useHttp";
import { useNotification } from "@/hooks/useHttp"; // If it's actually separate, correct the path

export const useForgotPassword = () => {
  const { postReq } = useHttp();
  const { showInfo, showSuccess, showError } = useNotification();

  // Step 1: Send OTP
  const sendOtp = async (mobileNo) => {
    try {
      const response = await postReq("api/v2/user/forgetPassword", null, {
        mobileNo,
      });
      console.log("Send OTP response:", response);
      if (response.success) {
        showSuccess("OTP sent to your mobile number");
      } else {
        showError(response.message || "Failed to send OTP");
      }
      return response;
    } catch (error) {
      console.error("Send OTP Error:", error);
      showError("Failed to send OTP");
      return { success: false };
    }
  };

  // Step 2: Verify OTP
  const verifyOtp = async (mobileNo, otp) => {
    try {
      const response = await postReq("api/v2/user/verifyOTP", null, {
        mobileNo,
        otp,
      });
      console.log("Verify OTP response:", response);
      if (response.success) {
        showSuccess("OTP verified");
      } else {
        showError(response.message || "Invalid OTP");
      }
      return response;
    } catch (error) {
      console.error("Verify OTP Error:", error);
      showError("OTP verification failed");
      return { success: false };
    }
  };

  // Step 3: Change Password
  const changePassword = async (mobileNo, newPassword) => {
    try {
      const response = await postReq("api/v2/user/changePassword", null, {
        mobileNo,
        newPassword,
      });
      console.log("Change Password response:", response);
      if (response.success) {
        showSuccess("Password changed successfully");
      } else {
        showError(response.message || "Password change failed");
      }
      return response;
    } catch (error) {
      console.error("Change Password Error:", error);
      showError("Failed to change password");
      return { success: false };
    }
  };

  return {
    sendOtp,
    verifyOtp,
    changePassword,
  };
};
