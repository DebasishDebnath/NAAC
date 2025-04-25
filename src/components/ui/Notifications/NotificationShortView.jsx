import React from "react"
import Notification from "./Notification"

const NotificationShortView = () => {
  return (
    <div className="absolute top-18 right-28 mt-2  bg-white rounded-md shadow-lg py-1 z-30">
      <div className="flex flex-col gap-1 p-4">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <Notification title="Welcome!" message="Thanks for joining our platform." time="2h ago" bgcolor="bg-[#ddefff]" />
          <Notification title="Update" message="Your profile has been updated successfully." time="4h ago" bgcolor="bg-[#ddefff]" />
          <Notification title="Reminder" message="Don't forget your upcoming meeting tomorrow." time="1d ago" />
          <Notification title="New Feature" message="We've added dark mode to your dashboard!" time="2d ago"  />
      </div>
  </div>
  )
}
export default NotificationShortView