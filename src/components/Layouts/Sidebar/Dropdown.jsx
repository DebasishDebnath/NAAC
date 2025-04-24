import React, { memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, Bell, Mail, LogOut } from "lucide-react";

const Dropdown = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = sessionStorage.getItem("role") || "user";
  
  const getBasePath = () => {
    const parts = location.pathname.split("/");
    return parts.length >= 2 ? `/${parts[1]}` : "/";
  };
  
  const handleLogout = () => {
    const cachedRole = sessionStorage.getItem("role") || "user";
    sessionStorage.clear();
    console.log("clickeddd");
    navigate(`/login/${cachedRole.toLowerCase()}`);
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-64 bg-white shadow-lg rounded-lg border border-slate-200 py-2 overflow-hidden">
      <div className="px-4 py-2 border-b border-slate-100">
        <div className="font-medium">Sarah Newman</div>
        <div className="text-xs text-slate-500">eml@domain.com</div>
      </div>
      
      <div className="py-1">
        <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-left hover:bg-blue-50 transition-colors"
        onClick={() => navigate(`${getBasePath()}/profile`)}
        >
          <User size={16} className="text-slate-500" />
          <span>Your Profile</span>
        </button>
        <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-left hover:bg-blue-50 transition-colors">
          <Bell size={16} className="text-slate-500" />
          <span>Notifications</span>
        </button>
        <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-left hover:bg-blue-50 transition-colors">
          <Mail size={16} className="text-slate-500" />
          <span>Messages</span>
        </button>
      </div>
      
      <div className="border-t border-slate-100 py-1">
        <button 
          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 transition-colors"
          onClick={handleLogout}
        >
          <LogOut size={16} />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );
});

export default Dropdown;