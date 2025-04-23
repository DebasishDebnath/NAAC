import React, { useState, useEffect, useRef } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import {
  Home,
  Mail,
  FileText,
  BarChart,
  Settings,
  UserPlus,
  Users,
  Menu,
  LayoutDashboard,
} from "lucide-react"

function Layout({ menus = [] }) {
  const defaultMenus = [
    "Home",
    "Email Request",
    "Pseudo Superadmin Add",
    "Reports",
    "Psudo",
    "Manage",
    "Settings",
  ]
  const menuItems = menus.length > 0 ? menus : defaultMenus

  const iconMap = {
    "Home": <Home size={18} />,
    "Email Request": <Mail size={18} />,
    "Pseudo Superadmin Add": <UserPlus size={18} />,
    "Reports": <BarChart size={18} />,
    "Psudo": <LayoutDashboard size={18} />,
    "Manage": <Settings size={18} />,
    "Settings": <Settings size={18} />,
  }


  const role = sessionStorage.getItem("role") || "User"
  const navigate = useNavigate()
  const location = useLocation()

  const [activeItem, setActiveItem] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const dropdownRef = useRef(null)

  const getBasePath = () => {
    const parts = location.pathname.split("/")
    return parts.length >= 2 ? `/${parts[1]}` : "/"
  }

  useEffect(() => {
    const pathParts = location.pathname.split("/")
    if (pathParts.length >= 3) {
      const currentPage = pathParts[2]
      const match = menuItems.find(
        (menu) =>
          menu.toLowerCase().replace(/\s+/g, "") === currentPage.toLowerCase()
      )
      setActiveItem(match || menuItems[0])
    }
  }, [location.pathname, menuItems])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showDropdown])

  const handleLogout = () => {
    sessionStorage.clear()
    navigate(`/login/${role.toLowerCase()}`)
  }

  const handleMenuClick = (menu) => {
    setActiveItem(menu)
    const basePath = getBasePath()
    const routeMap = {
      "Home": `${basePath}/dashboard`,
      "Email Request": `${basePath}/emailrequest`,
      "Pseudo Superadmin Add": `${basePath}/pseudosuperadmin-add`,
      "Forms": `${basePath}/forms`,
      "Reports": `${basePath}/reports`,
      "Psudo": `${basePath}/dashboard`,
      "Manage": `${basePath}/panel`,
      "Settings": `${basePath}/panel`,
    }
    const route = routeMap[menu] || `${basePath}/dashboard`
    navigate(route)
  }

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800">

      {/* Sidebar */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-12'} bg-white border-r border-slate-200 flex flex-col justify-between items-center ml-4 mt-4 mb-4 rounded-lg shadow-2xl`}>
        <div className="p-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-slate-800 text-white px-2 py-1 mx-2 rounded-lg w-[70%]">⌘</div>
            {isSidebarOpen && (
              <div>
                <h1 className="text-lg font-semibold">Shadcn Admin</h1>
                <p className="text-xs text-muted-foreground">React Router</p>
              </div>
            )}
          </div>
          <nav className="space-y-2">
            {menuItems.map((menu, index) => (
              <button
              key={index}
              className={`flex items-center gap-3 w-[70%] h-[35px] text-left mx-2 py-2 rounded-md text-sm font-medium transition ${
                activeItem === menu
                  ? "bg-slate-300 text-white w-4"
                  : "hover:bg-slate-100"
              } ${!isSidebarOpen ? "justify-center" : ""}`}
              onClick={() => handleMenuClick(menu)}
            >
              <div className="w-6 h-6 flex items-center justify-center text-slate-700">
                {iconMap[menu]}
              </div>
              {isSidebarOpen && <span>{menu}</span>}
            </button>
            
            ))}
          </nav>
        </div>

        {/* Footer / Role */}
        <div className="border-t pt-4 mt-4 px-4 pb-4 flex items-center gap-3">
          <div className="bg-slate-200 text-slate-700 rounded-full px-2 py-1 text-sm font-semibold">SN</div>
          {isSidebarOpen && (
            <div className="text-sm">
              <div className="font-semibold">{role}</div>
              <div className="text-xs text-muted-foreground">email@domain.com</div>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* Header */}
        <header className="sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              className="p-2 bg-white border border-slate-300 rounded hover:bg-slate-100"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
            >
              <Menu className="w-5 h-5 text-slate-700" />
            </button>

            {/* Role Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <span
                className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full uppercase shadow-sm cursor-pointer hover:bg-blue-200 transition-colors"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {role}
              </span>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
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
  )
}

export default Layout
