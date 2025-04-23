// import React, { useState, useEffect, useRef } from "react";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import {
//   Grid,
//   Download,
//   Users,
//   MessageSquare,
//   Bug,
//   Settings,
//   HelpCircle,
//   Menu,
//   House,
//   UsersRound,
//   BookType,
// } from "lucide-react";
// import Dropdown from "./Dropdown";
// import BelowDropDown from "./BelowDropDown";
// function Layout({ menus = [], submenu = {} }) {
//   const defaultMenus = [
//     "Home",
//     "Emails",
//     "Pseudo Superadmin Add",
//     "Reports",
//     "Psudo",
//     "Manage",
//     "Settings",
//   ];
//   const menuItems = menus.length > 0 ? menus : defaultMenus;

//   const iconMap = {
//     Home: <House size={20} />,
//     Emails: <Download size={20} />,
//     Forms: <BookType size={20} />,
//     "Pseudo Superadmin Add": <Users size={20} />,
//     Reports: <MessageSquare size={20} />,
//     Psudo: <Users size={20} />,
//     Manage: <Bug size={20} />,
//     Settings: <Settings size={20} />,
//     Help: <HelpCircle size={20} />,
//     Users: <UsersRound size={20} />,
//   };

//   const role = sessionStorage.getItem("role") || "User";
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [activeItem, setActiveItem] = useState("Home");
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [openSubmenus, setOpenSubmenus] = useState({});
//   const dropdownRef = useRef(null);

//   const getBasePath = () => {
//     const parts = location.pathname.split("/");
//     return parts.length >= 2 ? `/${parts[1]}` : "/";
//   };

//   useEffect(() => {
//     const pathParts = location.pathname.split("/");
//     if (pathParts.length >= 3) {
//       const currentPage = pathParts[2];
//       const match = menuItems.find(
//         (menu) =>
//           menu.toLowerCase().replace(/\s+/g, "") === currentPage.toLowerCase()
//       );
//       setActiveItem(match || menuItems[0]);
//     } else {
//       setActiveItem(menuItems[0]);
//     }
//   }, [location.pathname, menuItems]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };
//     if (showDropdown) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showDropdown]);

//   const toggleSubmenu = (menu) => {
//     setOpenSubmenus((prev) => ({
//       ...prev,
//       [menu]: !prev[menu],
//     }));
//   };

//   const handleMenuClick = (menu) => {
//     setActiveItem(menu);
//     const basePath = getBasePath();
//     const routeMap = {
//       Home: `${basePath}/dashboard`,
//       Emails: `${basePath}/emails`,
//       "Pseudo Superadmin": `${basePath}/pseudosuperadmin`,
//       Forms: `${basePath}/forms`,
//       Reports: `${basePath}/reports`,
//       Psudo: `${basePath}/dashboard`,
//       Manage: `${basePath}/panel`,
//       Settings: `${basePath}/panel`,
//     };
//     const route = routeMap[menu] || `${basePath}/dashboard`;
//     navigate(route);
//   };

//   return (
//     <div className="flex min-h-screen bg-[#f5f5f5] text-slate-800">
//       {/* Sidebar */}
//       <div
//         className={`fixed transition-all duration-300 ease-in-out ${
//           isSidebarOpen
//             ? "w-64 h-screen"
//             : "w-16 h-[calc(100vh-2rem)] my-4 ml-4 rounded-lg shadow-lg"
//         } bg-white overflow-hidden`}
//       >
//         {isSidebarOpen ? (
//           <div className="h-full flex flex-col justify-between">
//             <div className="p-4">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="bg-blue-600 text-white px-2 py-1 mx-2 rounded-lg">
//                   ⌘
//                 </div>
//                 <div>
//                   <h1 className="text-lg font-semibold">Shadcn Admin</h1>
//                   <p className="text-xs text-muted-foreground">React Router</p>
//                 </div>
//               </div>

//               <nav className="space-y-2">
//                 {menuItems.map((menu, index) => (
//                   <div key={index}>
//                     <button
//                       className={`flex items-center justify-between w-full text-left py-2 px-2 rounded-md text-sm font-medium transition ${
//                         activeItem === menu
//                           ? "bg-blue-600 text-white"
//                           : "hover:bg-blue-100"
//                       }`}
//                       onClick={() => {
//                         if (submenu[menu]) {
//                           toggleSubmenu(menu);
//                         } else {
//                           handleMenuClick(menu);
//                         }
//                       }}
//                     >
//                       <div className="flex items-center gap-3">
//                         <div
//                           className={`w-6 h-6 flex items-center justify-center ${
//                             activeItem === menu
//                               ? "text-white"
//                               : "text-slate-700"
//                           }`}
//                         >
//                           {iconMap[menu]}
//                         </div>
//                         <span>{menu}</span>
//                       </div>
//                       {submenu[menu] && (
//                         <span className="ml-auto text-xs">
//                           {openSubmenus[menu] ? "▲" : "▼"}
//                         </span>
//                       )}
//                     </button>

//                     {submenu[menu] && openSubmenus[menu] && (
//                       <div className="ml-8 mt-1 space-y-1">
//                         {submenu[menu].map((sub, subIdx) => (
//                           <button
//                             key={subIdx}
//                             className={`w-full text-left px-2 py-1 text-sm rounded-md ${
//                               activeItem === sub
//                                 ? "bg-blue-100 text-blue-800"
//                                 : "hover:bg-blue-50"
//                             }`}
//                             onClick={() => {
//                               setActiveItem(sub);
//                               navigate(
//                                 `${getBasePath()}/${menu.toLowerCase()}/${sub
//                                   .toLowerCase()
//                                   .replace(/\s+/g, "-")}`
//                               );
//                             }}
//                           >
//                             {sub}
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </nav>
//             </div>

//             <div
//               className="border-t pt-4 mt-4 px-4 pb-4 flex items-center gap-3 cursor-pointer relative"
//               ref={dropdownRef}
//               onClick={() => setShowDropdown(!showDropdown)}
//             >
//               <div className="bg-slate-200 text-slate-700 rounded-full px-2 py-1 text-sm font-semibold">
//                 SN
//               </div>
//               <div className="text-sm">
//                 <div className="font-semibold">{role}</div>
//                 <div className="text-xs text-muted-foreground">
//                   email@domain.com
//                 </div>
//               </div>

//               {/* Dropdown */}
//               {showDropdown && (
//                 <div
//                   className="absolute left-0 top-full mt-2 w-48 z-30 bg-white shadow-md rounded-md"
//                   style={{
//                     bottom: "100%", // Position the dropdown below the profile section
//                     left: "1000", // Align dropdown to the left edge of the profile section
//                   }}
//                 >
//                   <BelowDropDown />
//                 </div>
//               )}
//             </div>
//           </div>
//         ) : (
//           <div className="w-full h-full flex flex-col items-center py-4 justify-between">
//             <div className="w-full flex flex-col items-center space-y-3">
//               <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center mb-4">
//                 ⌘
//               </div>
//               {menuItems.map((menu, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleMenuClick(menu)}
//                   className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
//                     activeItem === menu
//                       ? "bg-blue-600 text-white"
//                       : "text-slate-700 hover:bg-slate-100"
//                   }`}
//                   title={menu}
//                 >
//                   {iconMap[menu]}
//                 </button>
//               ))}
//             </div>

//             <div className="mt-auto">
//               <div
//                 className="w-8 h-8 bg-slate-200 text-slate-700 rounded-full flex items-center justify-center font-medium text-sm"
//                 title={role}
//               >
//                 SN
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Main Content */}
//       <div
//         className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
//           isSidebarOpen ? "ml-64" : "ml-20"
//         }`}
//       >
//         {/* Header */}
//         <header className="sticky top-0 z-20 backdrop-blur-md">
//           <div className="flex items-center justify-between px-6 py-4">
//             <button
//               className="p-2 bg-white border border-slate-300 rounded hover:bg-slate-100"
//               onClick={() => setIsSidebarOpen((prev) => !prev)}
//             >
//               <Menu className="w-5 h-5 text-slate-700" />
//             </button>
//             <div className="relative" ref={dropdownRef}>
//               <span
//                 className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full uppercase shadow-sm cursor-pointer hover:bg-blue-200 transition-colors"
//                 onClick={() => setShowDropdown(!showDropdown)}
//               >
//                 {role}
//               </span>
//               {showDropdown && <Dropdown />}
//             </div>
//           </div>
//         </header>

//         <main className="flex-1 px-6 py-4">
//           <Outlet />
//         </main>

//         <footer className="border-t border-slate-300 bg-white/60 backdrop-blur-md py-3 text-center text-sm text-slate-600 shadow-inner">
//           © {new Date().getFullYear()} Built with IEM-UEM GROUP
//         </footer>
//       </div>
//     </div>
//   );
// }

// export default Layout;

import React, { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Grid,
  Download,
  Users,
  MessageSquare,
  Bug,
  Settings,
  HelpCircle,
  Menu,
  House,
  UsersRound,
  BookType,
} from "lucide-react";
import Dropdown from "./Dropdown";
import BelowDropDown from "./BelowDropDown";

function Layout({ menus = [], submenu = {} }) {
  const defaultMenus = [
    "Home",
    "Emails",
    "Pseudo Superadmin Add",
    "Reports",
    "Psudo",
    "Manage",
    "Settings",
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
  };

  const role = sessionStorage.getItem("role") || "User";
  const navigate = useNavigate();
  const location = useLocation();

  const [activeItem, setActiveItem] = useState("Home");
  const [showDropdown, setShowDropdown] = useState(false); 
  const [showBelowDropdown, setShowBelowDropdown] = useState(false); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const dropdownRef = useRef(null);

  const getBasePath = () => {
    const parts = location.pathname.split("/");
    return parts.length >= 2 ? `/${parts[1]}` : "/";
  };

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    if (pathParts.length >= 3) {
      const currentPage = pathParts[2];
      const match = menuItems.find(
        (menu) =>
          menu.toLowerCase().replace(/\s+/g, "") === currentPage.toLowerCase()
      );
      setActiveItem(match || menuItems[0]);
    } else {
      setActiveItem(menuItems[0]);
    }
  }, [location.pathname, menuItems]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
        setShowBelowDropdown(false); // Hide both dropdowns if clicked outside
      }
    };

    if (showDropdown || showBelowDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown, showBelowDropdown]);

  const toggleSubmenu = (menu) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const handleMenuClick = (menu) => {
    setActiveItem(menu);
    const basePath = getBasePath();
    const routeMap = {
      Home: `${basePath}/dashboard`,
      Emails: `${basePath}/emails`,
      "Pseudo Superadmin": `${basePath}/pseudosuperadmin`,
      Forms: `${basePath}/forms`,
      Reports: `${basePath}/reports`,
      Psudo: `${basePath}/dashboard`,
      Manage: `${basePath}/panel`,
      Settings: `${basePath}/panel`,
    };
    const route = routeMap[menu] || `${basePath}/dashboard`;
    navigate(route);
  };

  return (
    <div className="flex min-h-screen bg-[#f5f5f5] text-slate-800">
      {/* Sidebar */}
      <div
        className={`fixed transition-all duration-300 ease-in-out ${
          isSidebarOpen
            ? "w-64 h-screen"
            : "w-16 h-[calc(100vh-2rem)] my-4 ml-4 rounded-lg shadow-lg"
        } bg-white overflow-hidden`}
      >
        {isSidebarOpen ? (
          <div className="h-full flex flex-col justify-between">
            <div className="p-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-600 text-white px-2 py-1 mx-2 rounded-lg">
                  ⌘
                </div>
                <div>
                  <h1 className="text-lg font-semibold">IEM UEM Group</h1>
                  <p className="text-xs text-muted-foreground">API Project</p>
                </div>
              </div>

              <nav className="space-y-2">
                {menuItems.map((menu, index) => (
                  <div key={index}>
                    <button
                      className={`flex items-center justify-between w-full text-left py-2 px-2 rounded-md text-sm font-medium transition ${
                        activeItem === menu
                          ? "bg-blue-600 text-white"
                          : "hover:bg-blue-100"
                      }`}
                      onClick={() => {
                        if (submenu[menu]) {
                          toggleSubmenu(menu);
                        } else {
                          handleMenuClick(menu);
                        }
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 flex items-center justify-center ${
                            activeItem === menu
                              ? "text-white"
                              : "text-slate-700"
                          }`}
                        >
                          {iconMap[menu]}
                        </div>
                        <span>{menu}</span>
                      </div>
                      {submenu[menu] && (
                        <span className="ml-auto text-xs">
                          {openSubmenus[menu] ? "▲" : "▼"}
                        </span>
                      )}
                    </button>

                    {submenu[menu] && openSubmenus[menu] && (
                      <div className="ml-8 mt-1 space-y-1">
                        {submenu[menu].map((sub, subIdx) => (
                          <button
                            key={subIdx}
                            className={`w-full text-left px-2 py-1 text-sm rounded-md ${
                              activeItem === sub
                                ? "bg-blue-100 text-blue-800"
                                : "hover:bg-blue-50"
                            }`}
                            onClick={() => {
                              setActiveItem(sub);
                              navigate(
                                `${getBasePath()}/${menu.toLowerCase()}/${sub
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`
                              );
                            }}
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            <div
              className="border-t pt-4 mt-4 px-4 pb-4 flex items-center gap-3 cursor-pointer relative hover:bg-[#0000ff1d]"
              ref={dropdownRef}
              onClick={() => {
                setShowBelowDropdown(!showBelowDropdown); 
                setShowDropdown(false);
              }}
            >
              <div className="bg-slate-200 text-slate-700 rounded-full px-2 py-1 text-sm font-semibold">
                SN
              </div>
              <div className="text-sm">
                <div className="font-semibold">{role}</div>
                <div className="text-xs text-muted-foreground">
                  email@domain.com
                </div>
              </div>

              {/* Below Dropdown */}
              {showBelowDropdown && <BelowDropDown />}
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center py-4 justify-between">
            <div className="w-full flex flex-col items-center space-y-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center mb-4">
                ⌘
              </div>
              {menuItems.map((menu, index) => (
                <button
                  key={index}
                  onClick={() => handleMenuClick(menu)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    activeItem === menu
                      ? "bg-blue-600 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                  title={menu}
                >
                  {iconMap[menu]}
                </button>
              ))}
            </div>

            <div className="mt-auto">
              <div
                className="w-8 h-8 bg-slate-200 text-slate-700 rounded-full flex items-center justify-center font-medium text-sm"
                title={role}
              >
                SN
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              className="p-2 bg-white border border-slate-300 rounded hover:bg-slate-100"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
            >
              <Menu className="w-5 h-5 text-slate-700" />
            </button>
            <div className="relative" ref={dropdownRef}>
              <span
                className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full uppercase shadow-sm cursor-pointer hover:bg-blue-200 transition-colors"
                onClick={() => {
                  setShowDropdown(!showDropdown);
                  setShowBelowDropdown(false); 
                }}
              >
                {role}
              </span>
              {showDropdown && <Dropdown />}
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 py-4">
          <Outlet />
        </main>

        <footer className="border-t border-slate-300 bg-white/60 backdrop-blur-md py-3 text-center text-sm text-slate-600 shadow-inner">
          © {new Date().getFullYear()} Built with IEM-UEM GROUP
        </footer>
      </div>
    </div>
  );
}

export default Layout;
