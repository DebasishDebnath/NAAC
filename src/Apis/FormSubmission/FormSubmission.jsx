import { useHttp } from "../../hooks/useHttp";
import { useNotification } from "../../hooks/useHttp"; // Import this directly

export const useFormSubmission = () => {
  const { postReq } = useHttp();
  const { showInfo } = useNotification(); // Get direct access to notification functions
  const token= sessionStorage.getItem('token');
  
  const formSubmit = async (formData, endpoint) => {
    // Add manual notification to check if notistack is working
    // showInfo("Attempting to sign in..."); 
    
    
    const response = await postReq(`api/v2/${endpoint}`, token, formData);
    console.log("Form Submit:", response);
    
    return response;
  };
  
  return { formSubmit };
};