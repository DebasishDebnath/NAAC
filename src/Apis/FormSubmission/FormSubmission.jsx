import { useHttp } from "../../hooks/useHttp";
import { useNotification } from "../../hooks/useHttp"; // Import this directly

export const useFormSubmission = () => {
  const { postReq, patchReq } = useHttp();
  const { showInfo } = useNotification(); // Get direct access to notification functions
  const token = sessionStorage.getItem('token');

  const formSubmit = async (formData, endpoint, id) => {
    // Add manual notification to check if notistack is working
    // showInfo("Attempting to sign in..."); 
    let response;
    if (!id) response = await postReq(`api/v2/${endpoint}`, token, formData);
    else if(endpoint==="CategoryI/teaching_duties")
      response = await patchReq(`api/v2/${endpoint}`, token, formData);
    else
      response = await patchReq(`api/v2/${endpoint}/${id}`, token, formData);
    console.log("Form Submit:", response);

    return response;
  };

  return { formSubmit };
};