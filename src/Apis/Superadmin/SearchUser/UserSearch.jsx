import { useHttp } from "../../../hooks/useHttp.jsx";
import { useNotification } from "../../../hooks/useHttp.jsx";

export const fetchUserSearch = () => {
  const { postReq } = useHttp();
  const { showInfo, showError } = useNotification();

  const fetchUserSearchsuperadmin = async (searchTerm) => {
    const token = sessionStorage.getItem("token");
    console.log("Fetching Users with token:", token, "Search:", searchTerm);

    try {
      const response = await postReq("api/v2/superAdmin/searchuser", token, {
        search: searchTerm,
      });

      console.log("Fetched users response:", response);

      if (response.success) {
        console.log("Fetched users:", response.data);
        return response.data;
      } else {
        showError(
          "Failed to fetch users: " + (response.message || "Unknown error")
        );
        return [];
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      showError("Error fetching users: " + error.message);
      return [];
    }
  };

  return { fetchUserSearchsuperadmin };
};
