import { useHttp } from "@/hooks/useHttp";

export const RejectRequest = () => {
  const { postReq } = useHttp();
  const accessToken = sessionStorage.getItem("token");

  const reject = async (userId, reason) => {
    console.log("user", userId);
    try {
      const body = { reason };
      const json = await postReq(
        `api/v2/superAdmin/Reject/${userId}`,
        accessToken,
        body
      );
      // console.log(json)
      return json;
    } catch (error) {
      console.log("Error Rejecting Request!", error);
    }
  };
  return { reject };
};
