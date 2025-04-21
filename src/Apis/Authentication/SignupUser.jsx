import { useHttp } from "../../hooks/useHttp";
import { useNotification } from "../../hooks/useHttp"; // Correct import for notifications

export const useUserSignUp = () => {
  const { postReq } = useHttp();
  const { showInfo, showError } = useNotification(); // Access notification functions

  const signupUser = async (formData) => {
    try {

      const data = { formData };
      console.log("Sending signup request:", formData);

      const response = await postReq("api/v2/user/signup", "", data);
      console.log("Signup response:", response);

      if (response) {
        sessionStorage.setItem("token", response.token);
      } else {
        showError("Signup failed. Please try again.");
      }

      return response;
    } catch (error) {
      console.error("Signup error:", error);
      showError("An unexpected error occurred during signup.");
      return null;
    }
  };

  return { signupUser };
};
