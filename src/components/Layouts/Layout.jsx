import React, { useState, useEffect, useRef } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet"
import { Menu } from "lucide-react"

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

  const role = sessionStorage.getItem("role")
  const navigate = useNavigate()
  const location = useLocation()

  const [activeItem, setActiveItem] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)
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
          menu.toLowerCase().replace(/\s+/g, "") ===
          currentPage.toLowerCase()
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
    navigate(`/login/${(role || "user").toLowerCase()}`)
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 text-slate-800">

      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur-md bg-white/30 shadow-sm border-b border-slate-200">
        <div className="flex items-center justify-between px-6 py-4">

          {/* Sidebar Trigger */}
          <Sheet>
            <SheetTrigger className="p-2 bg-white border border-slate-300 rounded hover:bg-slate-100">
              <Menu className="w-5 h-5 text-slate-700" />
            </SheetTrigger>

            <SheetContent side="left" className="w-64 bg-white text-slate-900 p-4 flex flex-col justify-between">

              {/* Sidebar Header */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-slate-800 text-white p-2 rounded-full">⌘</div>
                  <div>
                    <h1 className="text-lg font-semibold">Shadcn Admin</h1>
                    <p className="text-xs text-muted-foreground">React Router</p>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                  {menuItems.map((menu, index) => (
                    <button
                      key={index}
                      className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition ${
                        activeItem === menu
                          ? "bg-slate-700 text-white"
                          : "hover:bg-slate-100"
                      }`}
                      onClick={() => handleMenuClick(menu)}
                    >
                      {menu}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Footer / Role */}
              <div className="border-t pt-4 mt-4 flex items-center gap-3">
                <div className="bg-slate-200 text-slate-700 rounded-full px-2 py-1 text-sm font-semibold">SN</div>
                <div className="text-sm">
                  <div className="font-semibold">{role}</div>
                  <div className="text-xs text-muted-foreground">email@domain.com</div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

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

      {/* Main content */}
      <main className="flex-1 px-6 py-4">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-300 bg-white/60 backdrop-blur-md py-3 text-center text-sm text-slate-600 shadow-inner">
        © {new Date().getFullYear()} Built with IEM-UEM GROUP
      </footer>
    </div>
  )
}

export default Layout
