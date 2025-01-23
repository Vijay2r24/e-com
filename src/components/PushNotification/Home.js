import React from "react";
import { FaBell, FaVolumeMute } from "react-icons/fa";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Define the tabs
  const tabs = [
    {
      id: "pushNotification",
      label: "Push Notification",
      Icon: FaBell,
      activeColorClass: "text-blue-500",
      inactiveColorClass: "text-gray-600",
    },
    {
      id: "silentNotification",
      label: "Silent Notification",
      Icon: FaVolumeMute,
      activeColorClass: "text-blue-500",
      inactiveColorClass: "text-gray-600",
    },
  ];

  // Determine the active tab based on the current path
  const activeTab = location.pathname.split("/")[2] || "pushNotification";

  // Handle tab change
  const handleTabChange = (id) => {
    navigate(`/Notifications/${id}`);
  };

  return (
    <div className="p-6 min-h-screen">
    {/* Tabs Navigation */}
    <div className="flex flex-wrap gap-3 mb-4 ml-2 w-full">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabChange(tab.id)}
          className={`flex items-center gap-3 px-5 py-2 rounded-lg shadow-lg border transition-all duration-300 w-full sm:w-auto ${
            activeTab === tab.id
              ? `bg-gradient-to-r from-green-300 via-emerald-400 to-teal-500 text-white border-transparent hover:shadow-xl`
              : `bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:shadow-md`
          }`}
>          
          <tab.Icon className="text-lg" />
          <span className="font-medium text-sm sm:text-base">{tab.label}</span>
        </button>
      ))}
    </div>
  
    {/* Render Tab Content */}
    <div className="bg-white shadow rounded-lg p-6">
      <Outlet />
    </div>
  </div>
  
  
  
  );
};

export default Home;