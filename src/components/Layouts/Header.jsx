import React, { memo, useState, useRef, useEffect, useCallback } from "react";
import { Menu, ChevronDown, PanelRightOpen } from "lucide-react";
import Dropdown from "./Sidebar/Dropdown";
import { IoMdNotifications } from "react-icons/io";
import NotificationShortView from "../ui/Notifications/NotificationShortView";

const Header = memo(({ toggleSidebar, toggleDropdown, showDropdown }) => {
  const [notificationDropdown, setNotificationDropdown] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const toggleNotificationDropdown = useCallback(() => {
    setNotificationDropdown((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setNotificationDropdown(false);
        if (showDropdown) {
          toggleDropdown(); // This will close the profile dropdown if open
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown, toggleDropdown]);

  return (
    <header className="">
      <div className="flex items-center justify-between px-6 py-4">
        <button
          className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          onClick={toggleSidebar}
        >
          <PanelRightOpen className="w-5 h-5 text-slate-700" />
        </button>

        <div className="relative flex gap-10 items-center">
          {/* Notification Icon */}
          <div
            ref={notificationRef}
            className="cursor-pointer duration-150 hover:bg-gray-200 rounded-full p-2"
            onClick={toggleNotificationDropdown}
          >
            <IoMdNotifications size={26} />
          </div>

          {/* Profile Icon */}
          <div
            ref={profileRef}
            className="flex items-center gap-2 cursor-pointer group"
            onClick={toggleDropdown}
          >
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm shadow-sm group-hover:shadow transition-shadow">
              SN
            </div>
            <ChevronDown
              size={16}
              className={`text-slate-400 transform transition-transform ${
                showDropdown ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {/* Notification dropdown */}
        {notificationDropdown && <NotificationShortView />}

        {/* Profile dropdown */}
        {showDropdown && <Dropdown />}
      </div>
    </header>
  );
});

export default Header;
