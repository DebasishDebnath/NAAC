import { useHttp } from "../../hooks/useHttp";
import { useNotification } from "../../hooks/useHttp"; // Import this directly

export const usePseudoApi = () => {
  const { postReq } = useHttp();
  const { showInfo } = useNotification(); // Get direct access to notification functions

  const signinPseudo = async (email, password) => {
    // Add manual notification to check if notistack is working
    // showInfo("Attempting to sign in...");

    const data = { email: email, password };
    console.log("Sending signin request:", data);

    const response = await postReq("api/v2/pseudoUser/signin", "", data);
    console.log("Signin response:", response);
    if (response) {
      sessionStorage.setItem("PseudoDetails", JSON.stringify(response.data.user));
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("role", "psudosuperadmin")
    }

    return response;
  };

  return { signinPseudo };
};
