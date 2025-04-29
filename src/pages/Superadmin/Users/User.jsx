import people from "../../../constant/people.json"; // adjust path based on your structure
import { MailIcon, BriefcaseIcon } from "lucide-react";
import { UserFetch } from "@/Apis/Superadmin/AllUserFetch/UserFetch";
import { useEffect, useState } from "react";
function PeopleList() {
  const { GetAllsuperadmin } = UserFetch();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchAllUsers = async () => {
      const email = "";
      const response = await GetAllsuperadmin(email);

      if (response?.success) {
        setUsers(response.data);
        console.log(response.data);
      } else {
        console.error("Failed to fetch users");
      }
    };

    fetchAllUsers();
  }, []);

  return (
    <div className="py-10 px-4 sm:px-8">
      <div className="mx-auto flex flex-wrap gap-6 justify-start">
        {users.map((user) => (
          <div
            key={user.id}
            className="w-[400px] rounded-xl bg-white shadow-sm 
                       transition-transform hover:-translate-y-1"
          >
            <div className="flex items-center p-6 space-x-4">
              <img
                src={user.profilePic || "/default-avatar.png"}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover border border-gray-300"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {user.name}
                </h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <BriefcaseIcon className="w-4 h-4 mr-1" />
                  {user.designation}
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MailIcon className="w-4 h-4 mr-1" />
                  {user.emailId}
                </div>
              </div>
            </div>
          </div>
        ))}
        {users.length === 0 && (
          <div className="text-gray-500 text-center w-full mt-4">
            No users found.
          </div>
        )}
      </div>
    </div>
  );
}

export default PeopleList;
