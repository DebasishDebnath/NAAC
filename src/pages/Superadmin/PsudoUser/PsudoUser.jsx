import { Button } from "@/components/ui/button";
import people from "../../../constant/people.json";
import { MailIcon, BriefcaseIcon } from "lucide-react";
import { TiPlus } from "react-icons/ti";
function PsudoUser() {
  return (
    <>
      <div className="flex items-center justify-end">
        <div className="bg-black gap-1 text-white space-x-4 flex justify-center py-2 rounded-3xl cursor-pointer w-[160px]">
          <div className="flex items-center justify-center">
            <TiPlus size={20}/>
          </div>
          Add Psedu User
        </div>
      </div>
      <div className=" py-10 px-4 sm:px-8">
        <div className=" mx-auto flex flex-wrap gap-6 justify-start">
          {people.map((person) => (
            <div
              key={person.id}
              className="w-[400px] rounded-xl  bg-white 
                       transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center p-6 space-x-4">
                <img
                  src={person.profilePic}
                  alt={person.name}
                  className="w-16 h-16 rounded-full object-cover border border-gray-300"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {person.name}
                  </h3>
                  {/* <div className="flex items-center text-sm text-gray-500 mt-1">
                  <BriefcaseIcon className="w-4 h-4 mr-1" />
                  {person.designation}
                </div> */}
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MailIcon className="w-4 h-4 mr-1" />
                    {person.email}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PsudoUser;
