import { useHttp } from "../../../hooks/useHttp.jsx";
import { useNotification } from "../../../hooks/useHttp.jsx";

export const useAddPseudoUser = () => {
  const { postReq } = useHttp();
  const { showInfo, showError } = useNotification();

  const addPseudoUserSuperadmin = async ({ name, email, campus, contact }) => {
    const token = sessionStorage.getItem("token");
    console.log("Adding pseudo user with token:", token);

    try {
      const payload = {
        name,
        email,
        campus,
        contact,
      };

      const response = await postReq(
        "api/v2/superAdmin/addPseudoUser",
        token,
        payload
      );

      if (response && response.data && response.data.token) {
        sessionStorage.setItem("token", response.data.token);
      }

      if (response.success && response.data) {
        showInfo("Pseudo user added successfully!");
        return response.data;
      } else {
        showError(
          "Failed to add user: " + (response.message || "Unknown error")
        );
        return null;
      }
    } catch (error) {
      console.error("Error adding pseudo user:", error);
      showError("Error adding user: " + error.message);
      return null;
    }
  };

  return { addPseudoUserSuperadmin };
};
