import React, { memo } from "react";

const SubmenuItem = memo(({ subItem, isActive, onClick, icon }) => {
  return (
    <button
      className={`w-full text-left flex items-center gap-2 pl-12 pr-3 py-2 text-sm rounded-md transition-all duration-200 ${
        isActive 
          ? "bg-[#94dbff56] font-medium text-white" 
          : "hover:bg-[#94dbff56] hover:text-black text-white font-[700]"
      }`}
      onClick={onClick}
    >
      <span>{subItem}</span>
    </button>
  );
});

export default SubmenuItem;