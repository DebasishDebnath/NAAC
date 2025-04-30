import { useHttp } from "../../hooks/useHttp";
import { useNotification } from "../../hooks/useHttp"; // Import this directly

export const useUserApi = () => {
  const { postReq } = useHttp();
  const { showInfo } = useNotification(); // Get direct access to notification functions

  const signinUser = async (email, password) => {
    // Add manual notification to check if notistack is working
    // showInfo("Attempting to sign in...");

    const data = { emailId: email, password };
    console.log("Sending signin request:", data);

    const response = await postReq("api/v2/user/signin", "", data);
    console.log("Signin response:", response);
    if (response) {
      sessionStorage.setItem("userDetails", JSON.stringify(response.data));
      sessionStorage.setItem("token", response.data.token);
    }

    return response;
  };

  return { signinUser };
};
