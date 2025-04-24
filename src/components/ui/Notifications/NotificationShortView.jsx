import React from "react"

const NotificationShortView = () => {
  return (
    <div className="absolute top-10 right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30">
    <button
      className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
      
    >
      Profile
    </button>
    <button
      className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
      
    >
  fghfghfgh
    </button>
    {/* <button
      className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
      onClick={() => navigate(`${getBasePath()}/forgot-password`)}
    >
      Forget Password
    </button> */}
    <button
      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100"
     
    >
      Logout
    </button>
  </div>
  )
}
export default NotificationShortView