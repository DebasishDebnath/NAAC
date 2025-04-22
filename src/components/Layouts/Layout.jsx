import React, { useState } from 'react'
import { 
  Menubar, 
  MenubarMenu, 
  MenubarTrigger, 
  MenubarContent, 
  MenubarItem 
} from '../ui/menubar'

function Layout({ menus = [] }) {
  // Default example menus if none provided
  const defaultMenus = ['File', 'Edit', 'View', 'Help'];
  const menuItems = menus.length > 0 ? menus : defaultMenus;
  
  // Generate some example submenu items for each menu
  const getSubmenuItems = (menuName) => {
    switch(menuName) {
      case 'File':
        return ['New', 'Open', 'Save', 'Export'];
      case 'Edit':
        return ['Undo', 'Redo', 'Cut', 'Copy', 'Paste'];
      case 'View':
        return ['Zoom In', 'Zoom Out', 'Full Screen', 'Split View'];
      case 'Help':
        return ['Documentation', 'About', 'Support'];
      default:
        return ['Option 1', 'Option 2', 'Option 3'];
    }
  };

  const [activeItem, setActiveItem] = useState(null);

  return (
    <div className="w-full">
      {/* Header with menubar */}
      <header className="flex items-center bg-slate-800 text-white p-2">
        <div className="font-bold text-xl mr-4">AppName</div>
        
        {/* Dynamic Menubar */}
        <Menubar className="bg-slate-800 border-0">
          {menuItems.map((menu, index) => (
            <MenubarMenu key={index}>
              <MenubarTrigger 
                className="text-white hover:bg-slate-700 rounded px-3 py-1.5 text-sm font-medium transition-colors"
                onClick={() => setActiveItem(menu)}
              >
                {menu}
              </MenubarTrigger>
              <MenubarContent className="bg-slate-700 border-slate-600 text-white rounded-md min-w-40 p-1">
                {getSubmenuItems(menu).map((item, idx) => (
                  <MenubarItem 
                    key={idx}
                    className="flex items-center px-3 py-2 text-sm rounded hover:bg-slate-600 focus:bg-slate-600 cursor-pointer"
                  >
                    {item}
                  </MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>
          ))}
        </Menubar>
      </header>

      {/* Main content area */}
      <main className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-6 min-h-64">
          <h2 className="text-2xl font-bold mb-4">Content Area</h2>
          <p className="mb-2">This is where your main content would go.</p>
          {activeItem && (
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <p className="text-blue-800">
                You clicked on the <strong>{activeItem}</strong> menu.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Layout