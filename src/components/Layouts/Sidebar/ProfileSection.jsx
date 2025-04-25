import React, { memo } from "react";
import { ChevronUp } from "lucide-react";
// import BelowDropdown from "./BelowDropdown";

const ProfileSection = memo(({ role, onClick, showDropdown }) => {
  return (
    <div
      className="border-t pt-4 mt-4 px-4 pb-4 flex items-center gap-3 cursor-pointer relative hover:bg-slate-50 transition-colors"
      onClick={onClick}
    >
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
        SN
      </div>
      <div className="text-sm flex-1">
        <div className="font-semibold">{role}</div>
        <div className="text-xs text-slate-500">email@domain.com</div>
      </div>
      <ChevronUp size={16} className={`text-slate-400 transform transition-transform ${showDropdown ? "" : "rotate-180"}`} />

      {/* {showDropdown && <BelowDropdown />} */}
    </div>
  );
});

export default ProfileSection;