import React, { useState, useEffect, useRef, memo } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Grid,
  Download,
  Users,
  MessageSquare,
  Bug,
  Settings,
  HelpCircle,
  House,
  UsersRound,
  BookType,
} from "lucide-react";
import { FiGitPullRequest } from "react-icons/fi";
import Header from './Header';
import Footer from './Footer';
import Sidebar from "./Sidebar";

function Layout({ menus = [], submenu = {} }) {
  const defaultMenus = [
    "Home",
    "Emails",
    "Pseudo Superadmin Add",
    "Reports",
    "Psudo",
    "Manage",
    "Settings",
    "Requests"
  ];
  const menuItems = menus.length > 0 ? menus : defaultMenus;

  const iconMap = {
    Home: <House size={20} />,
    Emails: <Download size={20} />,
    Forms: <BookType size={20} />,
    "Pseudo Superadmin Add": <Users size={20} />,
    Reports: <MessageSquare size={20} />,
    Psudo: <Users size={20} />,
    Manage: <Bug size={20} />,
    Settings: <Settings size={20} />,
    Help: <HelpCircle size={20} />,
    Users: <UsersRound size={20} />,
    Requests: <FiGitPullRequest size={20} />,
    Dashboard: <House size={20} />,
  };

  const role = sessionStorage.getItem("role") || "User";
  const navigate = useNavigate();
  const location = useLocation();

  const [activeItem, setActiveItem] = useState("Home");
  const [activeSubmenuItem, setActiveSubmenuItem] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showBelowDropdown, setShowBelowDropdown] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const dropdownRef = useRef(null);

  const getBasePath = () => {
    const parts = location.pathname.split("/");
    return parts.length >= 2 ? `/${parts[1]}` : "/";
  };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     // if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //     //   setShowDropdown(false);
  //     //   setShowBelowDropdown(false);
  //     // }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    
    // Handle nested routes for submenus
    if (pathParts.length >= 4) {
      // This might be a submenu route
      const parentMenu = pathParts[2];
      const submenuPath = pathParts[3];
      
      // Find the corresponding parent menu
      const matchedParentMenu = menuItems.find(
        (menu) => menu.toLowerCase().replace(/\s+/g, "") === parentMenu.toLowerCase()
      );
      
      if (matchedParentMenu && submenu[matchedParentMenu]) {
        // Find the matching submenu item
        const matchedSubmenuItem = submenu[matchedParentMenu].find(
          (sub) => sub.toLowerCase().replace(/\s+/g, "-") === submenuPath.toLowerCase()
        );
        
        if (matchedSubmenuItem) {
          setActiveItem(matchedParentMenu);
          setActiveSubmenuItem(matchedSubmenuItem);
          // Make sure the submenu is open
          setOpenSubmenus(prev => ({
            ...prev,
            [matchedParentMenu]: true
          }));
          return;
        }
      }
    }
    
    // Handle regular routes
    if (pathParts.length >= 3) {
      const currentPage = pathParts[2];
      const match = menuItems.find(
        (menu) =>
          menu.toLowerCase().replace(/\s+/g, "") === currentPage.toLowerCase()
      );
      
      if (match) {
        setActiveItem(match);
        setActiveSubmenuItem("");
      } else {
        setActiveItem(menuItems[0]);
        setActiveSubmenuItem("");
      }
    } else {
      setActiveItem(menuItems[0]);
      setActiveSubmenuItem("");
    }
  }, [location.pathname, menuItems, submenu]);

  const toggleSubmenu = (menu) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const handleMenuClick = React.useCallback(
    (menu, fromIconButton = false) => {
      setActiveItem(menu);
  
      // Remove "table_name" from session storage when Forms is clicked
      if (menu === "Forms") {
        sessionStorage.removeItem("table_name");
      }
  
      if (fromIconButton && submenu[menu] && submenu[menu].length > 0) {
        setOpenSubmenus((prev) => ({
          ...prev,
          [menu]: true
        }));
      }
  
      if (!submenu[menu] || submenu[menu].length === 0) {
        const basePath = getBasePath();
        const routeMap = {
          Home: `${basePath}/dashboard`,
          Emails: `${basePath}/emails`,
          "Pseudo Superadmin Add": `${basePath}/pseudosuperadminadd`,
          Forms: `${basePath}/forms`,
          Reports: `${basePath}/reports`,
          Requests: `${basePath}/reports`,
          Psudo: `${basePath}/psudo`,
          Manage: `${basePath}/manage`, 
          Settings: `${basePath}/settings`,
          Requests: `${basePath}/requests`
        };
        const route = routeMap[menu] || `${basePath}/dashboard`;
        navigate(route);
  
        setActiveSubmenuItem("");
      }
    },
    [navigate, getBasePath, submenu]
  );
  

  const handleSubmenuClick = React.useCallback(
    (parentMenu, submenuItem) => {
      setActiveItem(parentMenu);
      setActiveSubmenuItem(submenuItem);
      
      const basePath = getBasePath();
      navigate(
        `${basePath}/${parentMenu.toLowerCase().replace(/\s+/g, "")}/${submenuItem
          .toLowerCase()
          .replace(/\s+/g, "-")}`
      );
    },
    [navigate, getBasePath]
  );

  const toggleDropdown = React.useCallback(() => {
    setShowDropdown((prev) => !prev);
    setShowBelowDropdown(false);
  }, []);

  const toggleBelowDropdown = React.useCallback(() => {
    setShowBelowDropdown((prev) => !prev);
    setShowDropdown(false);
  }, []);

  const toggleSidebar = React.useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  // Check if a menu is parent of the active submenu item
  const isParentOfActive = (menu) => {
    return activeSubmenuItem && submenu[menu]?.includes(activeSubmenuItem);
  };

  return (
    <div className="flex min-h-screen  text-slate-800 bg-[#e7e7e777]">
      {/* Sidebar */}
      <div ref={dropdownRef}>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          menuItems={menuItems}
          iconMap={iconMap}
          activeItem={activeItem}
          activeSubmenuItem={activeSubmenuItem}
          openSubmenus={openSubmenus}
          submenu={submenu}
          handleMenuClick={handleMenuClick}
          handleSubmenuClick={handleSubmenuClick}
          toggleSubmenu={toggleSubmenu}
          toggleBelowDropdown={toggleBelowDropdown}
          showBelowDropdown={showBelowDropdown}
          role={role}
          isParentOfActive={isParentOfActive}
        />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <Header
          toggleSidebar={toggleSidebar}
          role={role}
          toggleDropdown={toggleDropdown}
          showDropdown={showDropdown}
        />

        <main className="flex-1 px-6 py-4">
          <Outlet />
        </main>

        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default memo(Layout);