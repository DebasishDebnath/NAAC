import React from "react";
import Notification from "../../components/ui/Notifications/Notification.jsx";

const Notificatons = () => {
  return (
    <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8 py-10">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-semibold text-black mb-8">Notifications</h1>
        <div className="flex flex-col gap-3">
          <Notification title="Welcome!" message="Thanks for joining our platform." time="2h ago" />
          <Notification title="Update" message="Your profile has been updated successfully." time="4h ago" />
          <Notification title="Reminder" message="Don't forget your upcoming meeting tomorrow." time="1d ago" />
          <Notification title="New Feature" message="We've added dark mode to your dashboard!" time="2d ago" />
        </div>
      </div>
    </div>
  );
};

export default Notificatons;
