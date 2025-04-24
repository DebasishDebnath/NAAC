import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Dropdown() {
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
    console.log("clickeddd")
    navigate(`/login/${cachedRole.toLowerCase()}`);
  };

  return (
    <div className="absolute top-10 right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30">
      <button
        className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
        onClick={() => navigate(`${getBasePath()}/profile`)}
      >
        Profile
      </button>
      <button
        className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
        onClick={() => navigate(`${getBasePath()}/settings`)}
      >
        Settings
      </button>
      {/* <button
        className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
        onClick={() => navigate(`${getBasePath()}/forgot-password`)}
      >
        Forget Password
      </button> */}
      <button
        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Dropdown;
