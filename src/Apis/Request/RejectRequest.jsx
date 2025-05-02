import { useHttp } from "@/hooks/useHttp";

export const RejectRequest = ()=>{
    const {postReq} = useHttp();
    const accessToken = sessionStorage.getItem("token");

    const reject = async(userId)=>{
        console.log("user",userId)
        try {
            
            const json= await postReq(`api/v2/superAdmin/Reject/${userId}`,accessToken, {} );
            // console.log(json)
            return json;
        } catch (error) {
            console.log("Error Rejecting Request!", error)
        }
    }
    return {reject}
}