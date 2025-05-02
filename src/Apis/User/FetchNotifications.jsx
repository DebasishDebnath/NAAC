import { useHttp } from "@/hooks/useHttp";

export const FetchNotifications = ()=>{
    const {getReq} = useHttp();
    const accessToken = sessionStorage.getItem("token");

    const Notifications = async()=>{
        
        try {
        
            const json= await getReq(`api/v2/user/getnotification`,accessToken);
            // console.log(json)
            return json;
        } catch (error) {
            console.log("Error Fetching Notifications", error)
        }
    }
    return {Notifications}
}