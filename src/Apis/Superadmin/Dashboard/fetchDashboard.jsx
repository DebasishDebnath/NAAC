import { useHttp } from "../../../hooks/useHttp.jsx";
import { useNotification } from "../../../hooks/useHttp.jsx";

export const fetchDashboard = () => {
  const { getReq } = useHttp();
  const { showInfo, showError } = useNotification();

  const fetchDashboardsuperadmin = async () => {
    const token = sessionStorage.getItem("token");
    console.log("Fetching dashboard with token:", token);

    try {
      
      const response = await getReq("api/v2/superAdmin/getDashboard", token, {});
      console.log("Fetched dashboard response:", response);

      if (response.success ) {
        console.log("Fetched emails:", response.data);
        return response.data; // Assuming `response.data.emails` contains the list of emails
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

  return { fetchDashboardsuperadmin };
};
