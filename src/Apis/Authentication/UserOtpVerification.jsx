import { useHttp } from "../../hooks/useHttp";
import { useNotification } from "../../hooks/useHttp"; // Import this directly

export const useOtpCheck = () => {
  const { postReq } = useHttp();
  const { showInfo, showError } = useNotification(); // Access notification functions

  const sendOtp = async (email) => {
    try {
      // const response = await fetch(`http://192.168.90.24:8000/api/v2/user/verifyemail?email=${email}`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // });

      const response=await postReq(`api/v2/user/verifyemail?email=${email}`, "", {email})

      const data = response;

      console.log(data)

      if (response.success) {
        showInfo("OTP sent to email.");
        return { success: true, ...data };
      } else {
        showError(data.message || "Failed to send OTP.");
        return { success: false };
      }
    } catch (err) {
      showError("Error sending OTP.");
      return { success: false };
    }
  };

  const verifyOtp = async (email, otp) => {
    try {
      // const response = await fetch(`http://192.168.90.24:8000/api/v2/user/verifyemail?email=${email}&otp=${otp}`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, otp }),
      // });

      const response= await postReq(`api/v2/user/verifyemail?email=${email}&otp=${otp}`, "", { email, otp })

      const data =  response;

      if (response.ok) {
        showInfo("OTP verified.");
        return { success: true, ...data };
      } else {
        showError(data.message || "OTP verification failed.");
        return { success: false };
      }
    } catch (err) {
      showError("Error verifying OTP.");
      return { success: false };
    }
  };

  return {
    sendOtp,
    verifyOtp,
  };
};
