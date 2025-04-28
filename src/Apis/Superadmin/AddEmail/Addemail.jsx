import { useHttp } from "../../../hooks/useHttp.jsx";
import { useNotification } from "../../../hooks/useHttp.jsx";

export const addEmail = () => {
  const { postReq } = useHttp();
  const { showInfo } = useNotification();

  const addEmailsuperadmin = async (email) => {
    const token = sessionStorage.getItem("token"); 
    console.log("Adding email:", email);

    try {
      const response = await postReq(
        "api/v2/superAdmin/addEmail",
        token, 
        email 
      );

      console.log("Adding email response:", response);

      if (response && response.data && response.data.token) {
        sessionStorage.setItem("token", response.data.token);
      }

      return response; 
    } catch (error) {
      console.error("Error adding email:", error);
      return { success: false, message: "Error adding email" }
    }
  };

  return { addEmailsuperadmin };
};
