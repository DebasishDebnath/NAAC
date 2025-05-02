import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom"; // <-- Import useParams

const Notification = ({
  id,
  toggleNotificationDropdown,
  title,
  message,
  time,
  status = "accepted", // 'accepted' or 'rejected'
  bgcolor = "bg-white",
}) => {
  const isAccepted = status === "accepted";
  const navigate = useNavigate();
  const { id: routeId } = useParams(); // <-- Get id from URL params

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (routeId) {
      if (routeId === id.toString()) {
        setIsDropdownOpen(true);
      }
    }
  }, [routeId]);

  const handleOpenView = () => {
    navigate(`/user/notifications/${id}`);
    setIsDropdownOpen(!isDropdownOpen); // Also open dropdown when clicking "View"
  };

  return (
    <div
      className={`${bgcolor} rounded-xl p-4 w-full min-w-[600px] transition-all hover:shadow-md cursor-pointer border border-gray-200`}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col w-full gap-2">
          <div className="flex gap-2 items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-gray-800">{title}</h3>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${isAccepted
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
                  }`}
              >
                {isAccepted ==="success"? (
                  <>
                    <FaCheckCircle className="text-green-600" />
                    Accepted
                  </>
                ) : (
                  <>
                    <FaTimesCircle className="text-red-500" />
                    Rejected
                  </>
                )}
              </span>
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {time}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">{message}</p>
            <span
              onClick={() => {
                if (toggleNotificationDropdown) {
                  toggleNotificationDropdown(); // Close ShortView first
                }
                handleOpenView(); // Then navigate
              }}
              className="text-sm text-blue-600 hover:underline cursor-pointer"
            >
              View
            </span>
          </div>

          {/* Dropdown content */}
          {isDropdownOpen && (
            <div className="mt-2 bg-gray-100 rounded-md p-3 shadow-inner text-sm text-gray-700 border border-gray-300">
              <p>This is additional information or action related to this notification {id}</p>
              {/* <ul className="mt-2 list-disc list-inside text-gray-600">
                <li>View Details</li>
                <li>Mark as Read</li>
                <li>Archive</li>
              </ul> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
