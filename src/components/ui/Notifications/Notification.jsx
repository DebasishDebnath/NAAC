import React from "react";

const Notification = ({ title, message, time }) => {
  return (
    <div className="bg-white rounded-xl  p-4 mb-4 w-full transition-all hover:shadow-lg cursor-pointer">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{message}</p>
        </div>
        <span className="text-xs text-gray-400">{time}</span>
      </div>
    </div>
  );
};

export default Notification;
