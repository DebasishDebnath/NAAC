import { useHttp } from "../../hooks/useHttp";
import { useNotification } from "../../hooks/useHttp"; // Assuming notification is also from useHttp

export const useUserDraft = () => {
  const { getReq } = useHttp();
  const { showInfo } = useNotification(); // Get direct access to notification functions
  const token = sessionStorage.getItem('token');

  const fetchDraft = async (endpoint) => {
    // Optional notification for debug or user feedback
    // showInfo("Fetching user draft...");

    const response = await getReq(`api/v2/${endpoint}`, token);
    console.log("User Draft Fetch:", response);

    return response;
  };

  return { fetchDraft };
};
