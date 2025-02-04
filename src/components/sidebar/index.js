import {React,useState} from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaShoppingCart,
  FaCog,
  FaInbox,
  FaChartBar,
  FaTimes,
  FaTabletAlt,
  FaBoxOpen,
  FaTh,
  FaUser,
  FaCartPlus,
  FaStore,
  FaBell,
  FaHome,
  FaFolder,
  FaClipboardList,
  FaThList,
} from "react-icons/fa";
import { MdOutlineBusiness,MdAssessment } from 'react-icons/md';
import { GiShoppingBag } from 'react-icons/gi';
import { AiOutlineUsergroupAdd } from 'react-icons/ai'; 
import Logo from "../../assets/images/logo.png";
import { MdOutlineEditNotifications } from "react-icons/md";
import { MdOutlineDynamicFeed } from "react-icons/md";

const Sidebar = ({ user, isOpen, setIsOpen, onSelectItem, toggleSidebar }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const sidebarItems = [
    { icon: <FaHome />, label: "Dashboard", path: "/dashboard" },
    { icon: <FaFolder />, label: "Browse", path: "/Browse/step1/create" },
    { icon: <FaClipboardList />, label: "Orders", path: "/orders" },
    { icon: <FaCartPlus />, label: "Add Products", path: "/products" },
    { icon: <FaThList />, label: "Products", path: "/all-products" },
    { icon: <FaUser />, label: "Profile", path: "/Profile" },
    { icon: <FaUsers />, label: "Users", path: "/UserList" },
    { icon: <FaStore />, label: "Stores", path: "/storeList" },
    { icon: <FaBell />, label: "Notifications", path: "/Notifications/pushNotification" },
    { icon: <MdOutlineDynamicFeed />, label: "Dynamic UI", path: "/dynamicui" },
    { icon: <MdAssessment />, label: "Banners", path:"/bannerlist" },
  ];

  return (
<>
      {/* Sidebar overlay for small screens */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={toggleSidebar}
      />

      {/* Sidebar component */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen p-2 w-64 bg-white text-gray-600 z-20 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:translate-x-0`}
      >
        {/* Logo and Close Icon for small screens */}
        <div className="flex justify-between items-center p-2.5 border-b-2">
          <img src={Logo} alt="Logo" className="w-14 h-11 object-contain" />
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-gray-500 hover:text-gray-800"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <ul className="space-y-2 mx-2 mt-2 p-1">
          {sidebarItems.map((item, index) => (
            <li key={index} className="text-sm">
              <Link
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-200 ${
                  selectedItem === item.label
                    ? "bg-pacific-500 text-white"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => {
                  setSelectedItem(item.label);
                  onSelectItem(item.label);
                  setIsOpen(false);
                }}
              >
                {item.icon} <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
