import React, { useState } from 'react'
import { 
  Menubar, 
  MenubarMenu, 
  MenubarTrigger 
} from '../ui/menubar'
import { Outlet } from 'react-router-dom'

function Layout({ menus = [] }) {
  const defaultMenus = ['File', 'Edit', 'View', 'Help']
  const menuItems = menus.length > 0 ? menus : defaultMenus
  const role = sessionStorage.getItem('role')

  const [activeItem, setActiveItem] = useState(null)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 text-slate-800">
      
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur-md bg-white/30 shadow-md border-b border-slate-200">
        <div className="flex items-center justify-between px-6 py-4">
          
          {/* Menubar */}
          <Menubar className="bg-[#fff] h-[16%]">
            {menuItems.map((menu, index) => (
              <MenubarMenu key={index}>
                <MenubarTrigger
                  className="text-sm font-medium hover:bg-slate-700 hover:text-white transition duration-150 px-4 py-2"
                  onClick={() => setActiveItem(menu)}
                >
                  {menu}
                </MenubarTrigger>
              </MenubarMenu>
            ))}
          </Menubar>

          {/* Role badge */}
          <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full uppercase shadow-sm">
            {role}
          </span>
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
