import { useHttp } from "../../../hooks/useHttp.jsx";
import { useNotification } from "../../../hooks/useHttp.jsx";

export const UserFetch = () => {
  const { getReq } = useHttp();
  const { showInfo } = useNotification();

  const GetAllsuperadmin = async (email, page = 1, limit = 12) => {
    const token = sessionStorage.getItem("token");
    console.log("Fetching Users - Page:", page, "Limit:", limit);

    try {
      const url = `api/v2/superAdmin/getAllUser?page=${page}&limit=${limit}`;
      const response = await getReq(url, token);
      console.log("User fetch response:", response);
      return response;
    } catch (error) {
      console.error("Error getting users:", error);
      return { success: false, message: "Error getting users" };
    }
  };

  return { GetAllsuperadmin };
};
