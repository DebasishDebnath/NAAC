import { useState, useEffect } from "react";
import { TiPlus } from "react-icons/ti";
import { MailIcon } from "lucide-react";
import { FaCopy } from "react-icons/fa";
import AddPseudoUser from "./AddPseudoUser";
import { fetchPseudoUser } from "@/Apis/Superadmin/PsudoUser/GetPseudoUser";
import { MdDelete } from "react-icons/md";
import { deletePseudoUser } from "@/Apis/Superadmin/PsudoUser/DeletePseudoUser";
function PseudoUser() {
  const [addPseudoUser, setAddPseudoUser] = useState(false);
  const [users, setUsers] = useState([]);
  const { fetchPseudoUserSuperadmin } = fetchPseudoUser();
  const { deleteSuperadminPseudoUser } = deletePseudoUser();
  const handleAddUserOpen = () => {
    setAddPseudoUser(true);
  };

  const truncate = (text, length = 20) =>
    text.length > length ? `${text.slice(0, length)}...` : text;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchPseudoUserSuperadmin();
        if (Array.isArray(res)) {
          setUsers(res);
        } else {
          console.error("Unexpected response format", res);
        }
      } catch (error) {
        console.error("Error fetching pseudo users:", error);
      }
    };
    getData();
  }, []);

  // 68121e04e47d8a53fe0e221f
  // 68121e04e47d8a53fe0e221f

  console.log(users, "users");
  return (
    <>
      {addPseudoUser && (
        <AddPseudoUser onClose={() => setAddPseudoUser(false)} />
      )}

      <div className="flex items-center justify-end">
        <div
          className="bg-black gap-1 text-white space-x-4 flex justify-center py-2 rounded-3xl cursor-pointer w-[160px]"
          onClick={handleAddUserOpen}
        >
          <div className="flex items-center justify-center">
            <TiPlus size={20} />
          </div>
          Add Psedu User
        </div>
      </div>

      <div className="py-10 px-4 sm:px-8">
        <div className="mx-auto flex flex-wrap gap-6 justify-start">
          {users.map((person) => (
            <div
              key={person._id}
              className="w-[400px] rounded-xl bg-white shadow-md transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center p-6 space-x-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xl font-bold border border-gray-300">
                  {person.name?.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 truncate max-w-[250px]">
                      {truncate(person.name, 25)}
                    </h3>
                    <FaCopy
                      className="text-gray-500 cursor-pointer hover:text-black"
                      onClick={() => copyToClipboard(person.name)}
                      title="Copy name"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 mt-1">
                    <div className="flex items-center truncate max-w-[250px]">
                      <MailIcon className="w-4 h-4 mr-1" />
                      {truncate(person.email, 28)}
                    </div>
                    <FaCopy
                      className="text-gray-500 cursor-pointer hover:text-black"
                      onClick={() => copyToClipboard(person.email)}
                      title="Copy email"
                    />
                  </div>
                </div>
                <div className="cursor-pointer rounded-full p-2 hover:bg-gray-200 transition-colors bg-gray-100">
                  <MdDelete
                    color="red"
                    className="cursor-pointer"
                    onClick={async () => {
                      try {
                        const res = await deleteSuperadminPseudoUser(
                          person._id
                        );
                        if (res.success !== false) {
                          setUsers((prev) =>
                            prev.filter((u) => u._id !== person._id)
                          );
                        } else {
                          console.error(
                            "Delete failed with message:",
                            res.message
                          );
                        }
                      } catch (error) {
                        console.error("Failed to delete pseudo user:", error);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
          {users.length === 0 && (
            <div className="text-gray-500 text-center w-full mt-10">
              No pseudo users found.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PseudoUser;
