import React, { useState, useEffect, useRef } from 'react'
import { 
  Menubar, 
  MenubarMenu, 
  MenubarTrigger 
} from '../ui/menubar'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

function Layout({ menus = [] }) {
  const defaultMenus = ['File', 'Edit', 'View', 'Help']
  const menuItems = menus.length > 0 ? menus : defaultMenus
  const role = sessionStorage.getItem('role')
  const navigate = useNavigate()
  const location = useLocation()

  // Get the base path for the current role
  const getBasePath = () => {
    const pathParts = location.pathname.split('/')
    if (pathParts.length >= 2) {
      return `/${pathParts[1]}`
    }
    return '/'
  }

  // Set active item based on current path on component mount
  useEffect(() => {
    const currentPath = location.pathname
    const pathParts = currentPath.split('/')
    if (pathParts.length >= 3) {
      const currentPage = pathParts[2]
      const matchingMenu = menuItems.find(menu => 
        menu.toLowerCase().replace(/\s+/g, '') === currentPage.toLowerCase()
      )
      if (matchingMenu) {
        setActiveItem(matchingMenu)
      } else if (currentPage === 'dashboard') {
        // Default to first menu item if on dashboard
        setActiveItem(menuItems[0])
      }
    }
  }, [location.pathname, menuItems])

  const [activeItem, setActiveItem] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  // Handle clicks outside of the dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    // Add event listener if dropdown is shown
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDropdown])

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear()
    // Navigate to login page based on role
    const roleForLogin = role || 'user' 
    navigate(`/login/${roleForLogin.toLowerCase()}`)
  }

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const handleMenuClick = (menu) => {
    setActiveItem(menu)
    
    const basePath = getBasePath()
    
    const routeMap = {
      // Superadmin routes
      'Home': `${basePath}/dashboard`,
      'Email Request': `${basePath}/emailrequest`,
      'Pseudo Superadmin Add': `${basePath}/pseudosuperadmin-add`,
      'Reports': `${basePath}/reports`,
      
      // Psudo routes
      'File': `${basePath}/dashboard`,
      'Edit': `${basePath}/dashboard`,
      'View': `${basePath}/dashboard`,
      'Help': `${basePath}/dashboard`,
      
      // User routes
      'Home': `${basePath}/dashboard`,
      'Forms': `${basePath}/forms`,
      'Reports': `${basePath}/reports`,
    }
    
    const route = routeMap[menu] || `${basePath}/dashboard`
    navigate(route)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 text-slate-800">
      
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur-md bg-white/30 shadow-md border-b border-slate-200">
        <div className="flex items-center justify-between px-6 py-4">
          
          {/* Menubar */}
          <Menubar className="bg-white h-auto">
            {menuItems.map((menu, index) => (
              <MenubarMenu key={index}>
                <MenubarTrigger
                  className={`text-sm font-medium transition duration-150 px-4 py-2 ${
                    activeItem === menu 
                      ? "bg-slate-700 text-white" 
                      : "hover:bg-slate-200"
                  }`}
                  onClick={() => handleMenuClick(menu)}
                >
                  {menu}
                </MenubarTrigger>
              </MenubarMenu>
            ))}
          </Menubar>

          <div className="relative" ref={dropdownRef}>
            <span 
              className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full uppercase shadow-sm cursor-pointer hover:bg-blue-200 transition-colors"
              onClick={toggleDropdown}
            >
              {role}
            </span>

            {/* Logout dropdown */}
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

      {/* Main Content */}
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