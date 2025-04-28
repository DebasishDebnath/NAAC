import { useHttp } from "../../../hooks/useHttp.jsx";
import { useNotification } from "../../../hooks/useHttp.jsx";

export const fetchEmails = () => {
  const { getReq } = useHttp();
  const { showInfo, showError } = useNotification();

  const fetchEmailsuperadmin = async () => {
    const token = sessionStorage.getItem("token");
    console.log("Fetching email list with token:", token);

    try {
      // Make GET request to fetch the email list
      const response = await getReq("api/v2/superAdmin/emaillist", token, {});
      console.log("Fetched emails response:", response);

      if (response && response.data && response.data.token) {
        sessionStorage.setItem("token", response.data.token); // Update token if necessary
      }

      if (response.success && response.data && response.data.emails) {
        console.log("Fetched emails:", response.data.emails);
        return response.data.emails; // Assuming `response.data.emails` contains the list of emails
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

  return { fetchEmailsuperadmin };
};
