import { useHttp } from "../../../hooks/useHttp.jsx";
import { useNotification } from "../../../hooks/useHttp.jsx";

export const UserFetch = () => {
  const { getReq } = useHttp();
  const { showInfo } = useNotification();

  const GetAllsuperadmin = async (email) => {
    const token = sessionStorage.getItem("token");
    console.log("Adding User:", email);

    try {
      const response = await getReq("api/v2/superAdmin/getAllUser", token);
      console.log("Adding User response:", response);
      return response;
    } catch (error) {
      console.error("Error getting User:", error);
      return { success: false, message: "Error getting User" };
    }
  };

  return { GetAllsuperadmin };
};
