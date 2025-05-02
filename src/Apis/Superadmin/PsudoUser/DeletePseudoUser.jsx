import { useHttp } from "../../../hooks/useHttp.jsx";
import { useNotification } from "../../../hooks/useHttp.jsx";

export const deletePseudoUser = () => {
  const { deleteReq } = useHttp();
  const { showInfo } = useNotification();

  const deleteSuperadminPseudoUser = async (id) => {
    const token = sessionStorage.getItem("token");
    console.log("deleting pseudoUser:", id);

    try {
      const response = await deleteReq(
        `api/v2/superAdmin/delete/${id}`,
        token,
        {}
      );

      console.log("Deleting pseudoUser response:", response);

      if (response && response.data && response.data.token) {
        sessionStorage.setItem("token", response.data.token);
      }

      return response;
    } catch (error) {
      console.error("Error deleting pseudoUser:", error);
      return { success: false, message: "Error deleting pseudoUser" };
    }
  };

  return { deleteSuperadminPseudoUser };
};
