import { useHttp } from "../../hooks/useHttp";
import { useNotification } from "../../hooks/useHttp"; // Assuming notification is also from useHttp

export const useUserDraft = () => {
  const { patchReq } = useHttp();
  const { showInfo } = useNotification(); // Get direct access to notification functions
  const token = sessionStorage.getItem('token');

  const updateDraft = async (endpoint,id, data) => {
    // Optional notification for debug or user feedback
    // showInfo("Fetching user draft...");

    const response = await patchReq(`api/v2/${endpoint}/${id}`, token, data);
    console.log("User Draft Fetch:", response);

    return response;
  };

  return { updateDraft };
};
