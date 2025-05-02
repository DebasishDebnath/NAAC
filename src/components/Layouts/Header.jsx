import React, { memo, useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, PanelRightOpen } from "lucide-react";
import Dropdown from "./Sidebar/Dropdown";
import { IoMdNotifications } from "react-icons/io";
import NotificationShortView from "../ui/Notifications/NotificationShortView";

const Header = memo(({ toggleSidebar, toggleDropdown, showDropdown }) => {
  const [notificationDropdown, setNotificationDropdown] = useState(false);
  const notificationRef = useRef(null);
  const notificationDropdownRef = useRef(null);
  const profileRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const role = sessionStorage.getItem("role");
  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));

  const toggleNotificationDropdown = useCallback(() => {
    setNotificationDropdown((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside notification icon and notification dropdown
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(event.target)
      ) {
        setNotificationDropdown(false);
      }

      // Check if click is outside profile icon and profile dropdown
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        if (showDropdown) {
          toggleDropdown(); // Close profile dropdown
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
          {role === "user" && (
            <div
              ref={notificationRef}
              className="cursor-pointer duration-150 hover:bg-gray-200 rounded-full p-2"
              onClick={toggleNotificationDropdown}
            >
              <IoMdNotifications size={26} />
            </div>
          )}

          {/* Profile Icon */}
          <div
            ref={profileRef}
            className="flex items-center gap-2 cursor-pointer group"
            onClick={toggleDropdown}
          >
            <div className="bg-[#004E77] text-white w-11 h-11 rounded-full flex items-center justify-center font-medium text-[18px] shadow-sm group-hover:shadow transition-shadow">
              {userDetails?.name
                ? userDetails.name
                    .trim()
                    .split(" ")
                    .map((n, i, arr) =>
                      i === 0 || i === arr.length - 1 ? n[0] : ""
                    )
                    .join("")
                    .toUpperCase()
                : role === "superadmin"
                ? "SA"
                : role === "user"
                ? "U"
                : "PA"}
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
        {notificationDropdown && (
          <div
            ref={notificationDropdownRef}
            className="absolute top-0 right-0 w-[500px]"
          >
            <NotificationShortView
              toggleNotificationDropdown={toggleNotificationDropdown}
            />
          </div>
        )}

        {/* Profile dropdown */}
        {showDropdown && (
          <div ref={profileDropdownRef} className="absolute  top-0 right-6">
            <Dropdown />
          </div>
        )}
      </div>
    </header>
  );
});

export default Header;
