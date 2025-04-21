import { useHttp } from "../../hooks/useHttp";
import { useNotification } from "../../hooks/useHttp"; // Import this directly

export const useSuperadminApi = () => {
  const { postReq } = useHttp();
  const { showInfo } = useNotification(); // Get direct access to notification functions
  
  const signinSuperadmin = async (email, password) => {
    // Add manual notification to check if notistack is working
    // showInfo("Attempting to sign in..."); 
    
    const data = { email, password };
    console.log("Sending signin request:", data);
    
    const response = await postReq("api/superadmin/signin", "", data);
    console.log("Signin response:", response);
    
    return response;
  };
  
  return { signinSuperadmin };
};