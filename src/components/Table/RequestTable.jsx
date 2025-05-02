import { FaCheck, FaTimes, FaEye } from 'react-icons/fa'
import { ApproveRequest } from '@/Apis/Request/ApproveRequest';
import { useNavigate } from 'react-router-dom';
import { RejectRequest } from '@/Apis/Request/RejectRequest';
const RequestTable = ({ requests, onApprove, onReject, onView }) => {
    const {approve} = ApproveRequest()
    const {reject} = RejectRequest()
    console.log(requests)
    const navigate = useNavigate();
    const getBasePath = () => {
        const parts = location.pathname.split("/");
        return parts.length >= 2 ? `/${parts[1]}` : "/";
      };
    const ApproveRequestfunc = async (userId) => {
      
        try {
            const response = await approve(userId)
           
            // console.log(response)
        } catch (error) {
            console.log("Error Approving Request!")
        }
    }
    const RejectRequestfunc = async (userId) => {
      console.log(userId)
        try {
            const response = await reject(userId)
           
            // console.log(response)
        } catch (error) {
            console.log("Error Rejecting Request!")
        }
    }
    return (
        <div className="overflow-x-auto">


<table className="w-full min-w-[600px] table-auto bg-gray-50 rounded-lg shadow-md">
<thead className="text-white" style={{ backgroundColor: '#002946' }}>
    <tr>
        <th className="px-4 py-3 text-center rounded-tl-xl rounded-bl-xl">Name</th>
        <th className="px-4 py-3 text-center">Email</th>
        <th className="px-4 py-3 text-center">Department</th>
        <th className="px-4 py-3 text-center">Campus</th>
        <th className="px-4 py-3 text-center">Score</th>
        <th className="px-4 py-3 text-center rounded-tr-xl rounded-br-xl">Actions</th>
    </tr>
</thead>
{requests&& requests.length >0?(
<tbody className="overflow-hidden rounded-b-xl">
    {Array.isArray(requests) && requests.map((request, index) =>
     {
        const user = request.user || {};
        return (
            <tr key={index} className="hover:bg-gray-100 transition duration-200">
                <td className="px-4 py-3 text-center capitalize">{user.name}</td>
                <td className="px-4 py-3 text-center">{user.emailId}</td>
                <td className="px-4 py-3 text-center">{user.department}</td>
                <td className="px-4 py-3 text-center">{user.campus}</td>
                <td className="px-4 py-3 text-center">{request.obtainedScore ?? 0}</td>
                <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-3">
                        <button
                           onClick={() => ApproveRequestfunc(request.UserId)}
                            className="text-green-600 hover:text-green-800 transition-transform hover:scale-110"
                            title="Approve"
                        >
                            <FaCheck />
                        </button>
                        <button
                            onClick={() => RejectRequestfunc(request.UserId)}
                            className="text-red-600 hover:text-red-800 transition-transform hover:scale-110"
                            title="Reject"
                        >
                            <FaTimes />
                        </button>
                        <button
                            onClick={() => {
                                sessionStorage.setItem("userInfo", JSON.stringify(request.user));
                                navigate(`/superadmin/reports/${request.UserId}`)
                            }}
                            className="text-blue-600 hover:text-blue-800 transition-transform hover:scale-110"
                            title="View"
                        >
                            <FaEye />
                        </button>
                    </div>
                </td>
            </tr>
        );
    })}
</tbody>
  ):(<tbody className='w-full h-[300px] justify-center items-center flex '><tr ><td colSpan="6" rowSpan="6">no reports found</td></tr></tbody>)}
</table>

          
          
            
        </div>
    );
};

export default RequestTable;
