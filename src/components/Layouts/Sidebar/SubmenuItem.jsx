import React, { memo } from "react";

const SubmenuItem = memo(({ subItem, isActive, onClick, icon }) => {
  return (
    <button
      className={`w-full text-left flex items-center gap-2 pl-12 pr-3 py-2 text-sm rounded-md transition-all duration-200 ${
        isActive 
          ? "bg-blue-200 text-blue-800 font-medium" 
          : "hover:bg-blue-50 text-slate-700"
      }`}
      onClick={onClick}
    >
      <div className="w-4 h-4 flex items-center justify-center text-slate-500">
        {icon}
      </div>
      <span>{subItem}</span>
    </button>
  );
});

export default SubmenuItem;