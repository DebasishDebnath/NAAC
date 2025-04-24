import React, { memo } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const MenuItem = memo(
  ({
    menu,
    isActive,
    icon,
    hasSubmenu,
    isSubmenuOpen,
    onClick,
    onSubmenuToggle,
    isParentOfActive,
  }) => {
    const handleClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Always toggle submenu if it has one
      if (hasSubmenu) {
        onSubmenuToggle();
      }
      
      // Also trigger the menu selection
      onClick(menu, false);
    };

    // Use active state if this item is active or is parent of active submenu item
    const isActiveStyle = isActive || isParentOfActive;

    return (
      <button
        className={`flex items-center justify-between w-full text-left py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
          isActiveStyle ? "bg-blue-600 text-white" : "hover:bg-blue-100"
        }`}
        onClick={handleClick}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-6 h-6 flex items-center justify-center ${
              isActiveStyle ? "text-white" : "text-slate-700"
            }`}
          >
            {icon}
          </div>
          <span>{menu}</span>
        </div>
        {hasSubmenu && (
          <span className={`ml-auto text-xs ${isActiveStyle ? "text-white" : "text-slate-500"}`}>
            {isSubmenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        )}
      </button>
    );
  }
);

export default MenuItem;