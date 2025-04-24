import React from "react";
import MenuItem from "./MenuItem";
import SubmenuItem from "./SubmenuItem";
import IconButton from "./IconButton";
import ProfileSection from "./ProfileSection";

const Sidebar = ({ 
  isSidebarOpen,
  menuItems,
  iconMap,
  activeItem,
  activeSubmenuItem,
  openSubmenus,
  submenu,
  handleMenuClick,
  handleSubmenuClick,
  toggleSubmenu,
  toggleBelowDropdown,
  showBelowDropdown,
  role,
  isParentOfActive
}) => {
  
  const renderExpandedSidebar = () => (
    <div className="h-full flex flex-col justify-between">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-6 pl-2">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-2 rounded-lg shadow-md">
            ⌘
          </div>
          <div>
            <h1 className="text-lg font-semibold">IEM UEM Group</h1>
            <p className="text-xs text-slate-500">API Project</p>
          </div>
        </div>

        <nav className="space-y-1.5">
          {menuItems.map((menu, index) => (
            <div key={index}>
              <MenuItem
                menu={menu}
                isActive={activeItem === menu && !activeSubmenuItem}
                isParentOfActive={isParentOfActive(menu)}
                icon={iconMap[menu]}
                hasSubmenu={!!submenu[menu] && submenu[menu].length > 0}
                isSubmenuOpen={openSubmenus[menu]}
                onClick={() => handleMenuClick(menu)}
                onSubmenuToggle={() => toggleSubmenu(menu)}
              />

              {submenu[menu] && openSubmenus[menu] && (
                <div className="mt-1 space-y-1 mb-1 bg-slate-50 rounded-md py-1">
                  {submenu[menu].map((sub, subIdx) => (
                    <SubmenuItem
                      key={subIdx}
                      subItem={sub}
                      isActive={activeSubmenuItem === sub}
                      onClick={() => handleSubmenuClick(menu, sub)}
                      icon={null} // You can pass appropriate icons here if needed
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      <ProfileSection
        role={role}
        onClick={toggleBelowDropdown}
        showDropdown={showBelowDropdown}
      />
    </div>
  );

  const renderCollapsedSidebar = () => (
    <div className="w-full h-full flex flex-col items-center py-4 justify-between">
      <div className="w-full flex flex-col items-center space-y-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
          ⌘
        </div>
        {menuItems.map((menu, index) => (
          <IconButton
            key={index}
            menu={menu}
            icon={iconMap[menu]}
            isActive={activeItem === menu && !activeSubmenuItem}
            isParentOfActive={isParentOfActive(menu)}
            hasSubmenu={!!submenu[menu] && submenu[menu].length > 0}
            onClick={handleMenuClick}
          />
        ))}
      </div>

      <div className="mt-auto">
        <div
          className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center font-medium text-sm shadow-sm cursor-pointer"
          title={role}
          onClick={toggleBelowDropdown}
        >
          SN
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`fixed transition-all duration-300 ease-in-out ${
        isSidebarOpen
          ? "w-64 h-screen shadow-md"
          : "w-16 h-[calc(100vh-2rem)] my-4 ml-4 rounded-xl shadow-lg"
      } bg-white overflow-hidden z-30`}
    >
      {isSidebarOpen ? renderExpandedSidebar() : renderCollapsedSidebar()}
    </div>
  );
};

export default Sidebar;