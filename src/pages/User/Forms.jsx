import React, { useState } from 'react';

function Forms() {
  const [urls, setUrls] = useState([
    { id: 1, url: 'https://shadcn.com' },
    { id: 2, url: 'http://twitter.com/shadcn' }
  ]);

  const addUrl = () => {
    setUrls([...urls, { id: urls.length + 1, url: '' }]);
  };

  return (
    <div className="mx-auto p-6">
      <h1 className="text-2xl font-bold mb-1">Settings</h1>
      <p className="text-gray-500 mb-8">Manage your account settings and set e-mail preferences.</p>
      
      <div className="border-t border-gray-200"></div>
      
      <div className="flex mt-6">
        {/* Sidebar */}
        <div className="w-64 pr-8">
          <nav className="space-y-1">
            <div className="flex items-center px-3 py-2 bg-gray-100 rounded-md">
              <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-medium">Profile</span>
            </div>
            
            <div className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <span>Account</span>
            </div>
            
            <div className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Appearance</span>
            </div>

            <div className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span>Notifications</span>
            </div>

            <div className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Display</span>
            </div>
          </nav>
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          <div className="pb-6">
            <h2 className="text-lg font-medium">Profile</h2>
            <p className="text-sm text-gray-500">This is how others will see you on the site.</p>
          </div>
          
          <div className="space-y-6">
            {/* Username field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue="shadcn"
              />
              <p className="mt-1 text-sm text-gray-500">
                This is your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days.
              </p>
            </div>
            
            {/* Email field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <select className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-md pr-10">
                  <option>Select a verified email to display</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                You can manage verified email addresses in your email settings.
              </p>
            </div>
            
            {/* Bio field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                defaultValue="I own a computer."
              ></textarea>
              <p className="mt-1 text-sm text-gray-500">
                You can @mention other users and organizations to link to them.
              </p>
            </div>
            
            {/* URLs section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URLs</label>
              <p className="text-sm text-gray-500 mb-2">
                Add links to your website, blog, or social media profiles.
              </p>
              
              <div className="space-y-2">
                {urls.map((urlItem) => (
                  <input
                    key={urlItem.id}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    defaultValue={urlItem.url}
                  />
                ))}
              </div>
              
              <button
                onClick={addUrl}
                className="mt-2 px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Add URL
              </button>
            </div>
            
            {/* Update profile button */}
            <div className="pt-2">
              <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                Update profile
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Windows activation banner */}
      <div className="mt-8 flex justify-end">
        <div className="text-right text-gray-400 text-sm">
          <div>Activate Windows</div>
          <div>Go to Settings to activate Windows.</div>
        </div>
      </div>
    </div>
  );
}

export default Forms;