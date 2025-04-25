import React from "react";
import Notification from "../../components/ui/Notifications/Notification.jsx";

const Notificatons = () => {
  return (
    <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8 py-10">
      <div className="w-full ">
        <h1 className="text-4xl font-semibold text-black mb-8">Notifications</h1>
        <div className="flex flex-col gap-3">
          <Notification
            title="Monthly Performance Review Report Approved"
            message="Congratulations ! Your report 'Monthly Performance Review' has been approved."
            time="2 hours ago"
            status="accepted"
          />

          <Notification
            title="'Marketing Campaign Results' Report Rejected"
            message="Your report 'Marketing Campaign Results' has been rejected. Review the evaluation summary."
            time="3 hours ago"
            status="rejected"
          />
        </div>
      </div>
    </div>
  );
};

export default Notificatons;
