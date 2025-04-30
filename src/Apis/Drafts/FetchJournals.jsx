import { useHttp } from "@/hooks/useHttp";

export const FetchJournals = () => {
  const { getReq } = useHttp();
  const accessToken = sessionStorage.getItem("token");

  const fetchJournals = async () => {
    try {
      const json = await getReq(`api/v2/user/tempContribution`, accessToken);
      console.log(json?.data);
      return json?.data; // Don't use setDraftData here
    } catch (error) {
      console.log("Error fetching journal publication!", error);
    }
  };

  return { fetchJournals };
};
