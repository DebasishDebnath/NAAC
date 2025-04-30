import { useHttp } from "@/hooks/useHttp";


export const GetRequests = () => {
    const { getReq } = useHttp();
    const accessToken = sessionStorage.getItem("token");

    const fetchData = async () => {
        try {
            const json = await getReq(`api/v2/superAdmin/getContribution?status=Review`, accessToken)
            console.log(json?.data?.data)
            return json?.data?.data;
        } catch (error) {
            console.log("Error fetching data in Request page", error)
        }
    }
    return { fetchData }

}