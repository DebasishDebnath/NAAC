import people from "../../../constant/people.json"; // adjust path based on your structure
import { MailIcon, BriefcaseIcon } from "lucide-react";

function PeopleList() {
  return (
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
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <BriefcaseIcon className="w-4 h-4 mr-1" />
                  {person.designation}
                </div>
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
  );
}

export default PeopleList;
