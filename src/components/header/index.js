import React, { useState, useEffect } from 'react';
import { FaBell, FaCog } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import axios from 'axios';
import {

  getUserById,
} from "../../Constants/apiRoutes";
const Header = ({ title, toggleSidebar }) => {
  const navigate = useNavigate();
  const [UserId, setUserId] = useState(null);
  const [loginData, setLogindata] = useState(null);
  const handleSignOut = () => {
    navigate("/");
  };
  const  handleProfil=()=>{
    navigate("/Profile");
  }
  useEffect(() => {
    const storedUserId = localStorage.getItem("UserID");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);
  useEffect(() => {
    if (!UserId) return;

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage.");
      return;
    }

    axios
      .get(`${getUserById}/${UserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data && response.data.StatusCode === "SUCCESS") {
          setLogindata(response.data.user); // Update with user data
          console.log("LoginData", response.data.user); // Log user data for debugging
        } else {
          console.error("Unexpected response format or status code:", response.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching user details:", err);
      });
  }, [UserId]); // Dependency array includes UserId
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <span className="text-2xl">☰</span>
        </button>
        <h1 className="text-xl font-bold ml-2">{title}</h1>
      </div>
      <div className="flex items-center space-x-4">
        {/* Profile Section */}
        <div className="relative flex items-center space-x-2">
          <img
            src={
              loginData?.ProfileImageUrl
                ? loginData.ProfileImageUrl
                : "https://via.placeholder.com/150/000000/FFFFFF/?text=Unknown+User"
            }
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border border-gray-300 cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          <span className="text-sm font-medium text-gray-700">
            {loginData && loginData.FirstName && loginData.LastName
              ? `${loginData.FirstName} ${loginData.LastName}`
              : "Loading..."}
          </span>
          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute top-12 z-20 left-0 w-40 bg-white border border-gray-300 rounded-lg shadow-xl">
              <button
                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition duration-150 ease-in-out"
                onClick={() => {
                handleProfil();
                  setIsDropdownOpen(false); // Close dropdown
                }}
              >
                <FaUser className="mr-2 text-blue-500" /> Your Profile
              </button>
              <button
                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-100 hover:text-red-700 transition duration-150 ease-in-out"
                onClick={() => {
                  handleSignOut();
                  setIsDropdownOpen(false); // Close dropdown
                }}
              >
                <FaSignOutAlt className="mr-2 text-red-500" /> Logout
              </button>
            </div>
          )}

        </div>


        {/* Notifications Button */}
        <button className="relative">
          <FaBell size={24} className="text-gray-600" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </button>

        {/* Settings Button */}
        <button>
          <FaCog size={20} className="text-gray-600" />
        </button>
      </div>

    </header>
  );
};

export default Header;
