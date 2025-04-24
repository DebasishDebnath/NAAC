import React, { memo } from "react";
import { User, Settings, LogOut } from "lucide-react";

const BelowDropdown = memo(() => {
  return (
    <div className="absolute bottom-full left-0 mb-2 w-full bg-white shadow-lg rounded-lg border border-slate-200 py-2">
      <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-left hover:bg-blue-50 transition-colors">
        <User size={16} className="text-slate-500" />
        <span>View Profile</span>
      </button>
      <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-left hover:bg-blue-50 transition-colors">
        <Settings size={16} className="text-slate-500" />
        <span>Account Settings</span>
      </button>
      <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 transition-colors">
        <LogOut size={16} />
        <span>Sign out</span>
      </button>
    </div>
  );
});

export default BelowDropdown;