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
          className={`flex items-center gap-3 px-5 py-2 rounded-lg shadow-sm border transition-all duration-300 w-full sm:w-auto ${
            activeTab === tab.id
              ? `bg-blue-500 text-white border-blue-500 hover:bg-blue-600`
              : `bg-white text-gray-600 border-gray-300 hover:bg-gray-100`
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