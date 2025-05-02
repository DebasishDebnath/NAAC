import React, { useEffect, useState } from "react";
import Notification from "./Notification";
import { FetchNotifications } from "@/Apis/User/FetchNotifications";

const NotificationShortView = ({ toggleNotificationDropdown }) => {
  const [notifications, setnotifications] = useState()
 const { Notifications } = FetchNotifications();
 const formattime = (isoString) =>{
  const date = new Date(isoString);

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
  const FetchNotificationsFunc = async () => {
    try {
      const response = await Notifications();
setnotifications(response.data.notifications)
      console.log(response)
    } catch (error) {
      console.log("Error Approving Request!");
    }
  };
  useEffect(() => {
    FetchNotificationsFunc()
  }, [])
  
  // const notifications = [
  //   {
  //     _id: 1,
  //     title: "Welcome!",
  //     message: "Thanks for joining our platform.",
  //     time: "2h ago",
  //     bgcolor: "bg-[#ddefff]",
  //   },
  //   {
  //     _id: 2,
  //     title: "Update",
  //     message: "Your profile has been updated successfully.",
  //     time: "4h ago",
  //     bgcolor: "bg-[#ddefff]",
  //   },
  //   {
  //     _id: 3,
  //     title: "Reminder",
  //     message: "Don't forget your upcoming meeting tomorrow.",
  //     time: "1d ago",
  //   },
  //   {
  //     _id: 4,
  //     title: "New Feature",
  //     message: "We've added dark mode to your dashboard!",
  //     time: "2d ago",
  //   },
  // ];

  return (
    <div className="absolute top-18 right-28 mt-2 bg-white rounded-md shadow-lg py-1 z-30">
      <div className="flex flex-col gap-1 p-4">
        <h2 className="text-lg font-semibold">Notifications</h2>
        {notifications?.map((notif, index) => (
          <Notification
            id={notif._id}
            key={index}
            title={notif.header}
            status={notif.type}
            message={notif.message}
            time={formattime(notif.createdAt)}
            // bgcolor={notif.bgcolor}
            toggleNotificationDropdown={toggleNotificationDropdown}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationShortView;
