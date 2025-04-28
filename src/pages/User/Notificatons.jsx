import React from "react";
import Notification from "../../components/ui/Notifications/Notification.jsx";

const Notificatons = () => {
  const notifications = [
    {
      _id: 1,
      title: "Welcome!",
      message: "Thanks for joining our platform.",
      time: "2h ago",
      bgcolor: "bg-[#ddefff]",
    },
    {
      _id: 2,
      title: "Update",
      message: "Your profile has been updated successfully.",
      time: "4h ago",
      bgcolor: "bg-[#ddefff]",
    },
    {
      _id: 3,
      title: "Reminder",
      message: "Don't forget your upcoming meeting tomorrow.",
      time: "1d ago",
    },
    {
      _id: 4,
      title: "New Feature",
      message: "We've added dark mode to your dashboard!",
      time: "2d ago",
    },
  ];

  return (
    <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8 py-10">
      <div className="w-full ">
        <h1 className="text-4xl font-semibold text-black mb-8">Notifications</h1>
        <div className="flex flex-col gap-3">
           {notifications.map((notif, index) => (
          <Notification
            id={notif._id}
           
            key={index}
            title={notif.title}
            message={notif.message}
            time={notif.time}
            bgcolor={notif.bgcolor}
          />
        ))}
        </div>
      </div>
    </div>
  );
};

export default Notificatons;
