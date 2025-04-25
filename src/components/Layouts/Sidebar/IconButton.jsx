import React, { memo } from "react";

const IconButton = memo(({ menu, icon, isActive, onClick, hasSubmenu, isParentOfActive }) => {
  // Use active state if this item is active or is parent of active submenu item
  const isActiveStyle = isActive || isParentOfActive;
  
  // Create a specific handler for icon button clicks
  const handleIconClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick(menu, true); // Pass true to indicate this is from icon button
  };
  
  return (
    <button
      onClick={handleIconClick}
      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors relative ${
        isActiveStyle
          ? "bg-[#94DCFF] text-black"
          : "text-white hover:bg-[#94dbff56] hover:text-black"
      } ${hasSubmenu ? "after:content-[''] after:absolute after:right-1 after:bottom-1 after:w-2 after:h-2 after:rounded-full after:bg-blue-400" : ""}`}
      title={menu}
    >
      {icon}
    </button>
  );
});

export default IconButton;