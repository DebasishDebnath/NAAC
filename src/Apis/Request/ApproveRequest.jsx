import { useHttp } from "@/hooks/useHttp";

export const ApproveRequest = ()=>{
    const {postReq} = useHttp();
    const accessToken = sessionStorage.getItem("token");

    const approve = async(userId)=>{
        console.log("user",userId)
        try {
            
            const json= await postReq(`Approve/${userId}`, {}, accessToken);
            // console.log(json)
            return json;
        } catch (error) {
            console.log("Error Approving Request!", error)
        }
    }
    return {approve}
}