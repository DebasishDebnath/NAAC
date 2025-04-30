import { useHttp } from "../../../hooks/useHttp.jsx";
import { useNotification } from "../../../hooks/useHttp.jsx";

export const fetchPseudoUser = () => {
  const { getReq } = useHttp();
  const { showInfo, showError } = useNotification();

  const fetchPseudoUserSuperadmin = async () => {
    const token = sessionStorage.getItem("token");
    console.log("Fetching email list with token:", token);

    try {
      const response = await getReq(
        "api/v2/superAdmin/getAllPseudoUser",
        token,
        {}
      );

      if (response && response.data && response.data.token) {
        sessionStorage.setItem("token", response.data.token);
      }

      if (response.success && response.data) {
        return response.data;
      } else {
        showError(
          "Failed to fetch emails: " + (response.message || "Unknown error")
        );
        return [];
      }
    } catch (error) {
      console.error("Error fetching emails:", error);
      showError("Error fetching emails: " + error.message);
      return [];
    }
  };

  return { fetchPseudoUserSuperadmin };
};
