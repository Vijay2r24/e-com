import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa'; // Importing camera icon from react-icons
import coverImage from "../../assets/images/undraw_web_shopping_re_owap.svg"
const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    bio: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  // Save Basic Information
  const handleSave = () => {
    // Handle save logic for Basic Information
    console.log('Saving Basic Information...', profileData);
    // You can make API calls here to save the data
  };

  // Save Notification Settings
  const handleSaveNotification = () => {
    // Handle save logic for Notification Settings
    console.log('Saving Notification Settings...');
    // You can make API calls here to save the notification settings
  };

  // Save Security Settings
  const handleSaveSecurity = () => {
    // Handle save logic for Security Settings
    console.log('Saving Security Settings...');
    // You can make API calls here to save the security settings
  };
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
  const [coverImage, setCoverImage] = useState('https://via.placeholder.com/1500x400');
  const [name, setName] = useState('Shahnewaz Sakil');

  // Handle image upload for profile and cover photo
  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'profile') {
          setProfileImage(reader.result);
        } else {
          setCoverImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="body-content px-8 py-8">
      <div className="flex justify-between mb-10">
        <div className="page-title">
          <h3 className="mb-0 text-[28px]">My Profile</h3>
        </div>
      </div>

      <div className="bg-white rounded-lg w-full h-auto border border-gray-200">
        {/* Cover Photo Section */}
        <div className="relative">
          <img
            src={coverImage || 'https://via.placeholder.com/1500x400'}
            alt="Cover Photo"
            className="w-full h-48 object-cover"
          />
          <button className="absolute top-4 right-4 bg-white border-2 border-gray-300 text-sm text-gray-700 px-4 py-2 rounded-lg flex items-center">
            <label htmlFor="cover-upload" className="flex items-center cursor-pointer">
              <FaCamera className="mr-2 text-gray-600" /> Upload Cover Photo
            </label>
            <input
              id="cover-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, 'cover')}
            />
          </button>
        </div>

        {/* Profile Picture and Name Section */}
        <div className="flex items-center -mt-16 ml-6">
          <div className="relative w-40 h-40 rounded-full border-4 border-white overflow-hidden">
            <img
              src={profileImage || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-full h-full object-cover transition-transform duration-200 ease-in-out transform hover:scale-105"
            />
            <button
              className="absolute bottom-2 right-2 bg-white p-1.5 rounded-full shadow-md flex items-center justify-center focus:outline-none hover:shadow-lg"
              style={{ width: '40px', height: '40px' }}
            >
              <label htmlFor="profile-upload" className="flex items-center justify-center w-full h-full cursor-pointer">
                <FaCamera className="text-gray-600" style={{ fontSize: '18px' }} />
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e, 'profile')}
              />
            </button>
          </div>

        </div>

        {/* Name and Description */}
        <div className="ml-6 mt-2 flex flex-col items-start">
          <p className="text-lg ml-8 font-semibold text-gray-800">{name || "Your Name"}</p>
          <p className="text-gray-600 text-sm mt-1">
            Bringing knowledge to your fingertips with AI assistance
          </p>
          <br />
          <br />

        </div>
      </div>
      <div className="mt-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Basic Information Section (Left side) */}
          <div className="col-span-12 lg:col-span-8">
            <div className="py-10 px-10 bg-white rounded-md border border-gray-200">
              <h5 className="text-xl font-semibold mb-6">Basic Information</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="mb-5">
                  <p className="mb-0 text-base text-black">First Name</p>
                  <input
                    className="input w-full h-[49px] rounded-md border border-gray-300 px-6 text-base text-black"
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-5">
                  <p className="mb-0 text-base text-black">Last Name</p>
                  <input
                    className="input w-full h-[49px] rounded-md border border-gray-300 px-6 text-base text-black"
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="mb-5">
                <p className="mb-0 text-base text-black">Email</p>
                <input
                  className="input w-full h-[49px] rounded-md border border-gray-300 px-6 text-base text-black"
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="mb-5">
                  <p className="mb-0 text-base text-black">Phone</p>
                  <input
                    className="input w-full h-[49px] rounded-md border border-gray-300 px-6 text-base text-black"
                    type="text"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-5">
                  <p className="mb-0 text-base text-black">Gender</p>
                  <select
                    className="input w-full h-[49px] rounded-md border border-gray-300 px-6 text-base text-black"
                    name="gender"
                    value={profileData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>

              <div className="mb-5">
                <p className="mb-0 text-base text-black">Bio</p>
                <textarea
                  className="input w-full h-[200px] py-4 rounded-md border border-gray-300 px-6 text-base resize-none text-black"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                />
              </div>

              <div className="text-end mt-5">
                <button
                  onClick={handleSave}
                  className="tp-btn px-10 py-2 bg-pacific-500 text-white rounded-md hover:bg-pacific-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* Notification and Security Section (Right side) */}
          <div className="col-span-12 lg:col-span-4">
            <div className="space-y-6">
              {/* Notification Section */}
              <div className="py-10 px-10 bg-white rounded-md border border-gray-200">
                <h5 className="text-xl font-semibold mb-6">Notification</h5>
                <div className="space-y-3">
                  <div className="tp-checkbox flex items-center mb-3">
                    <input id="follows" type="checkbox" />
                    <label htmlFor="follows" className="ml-2 text-base text-black whitespace-nowrap">Like & Follows Notifications</label>
                  </div>
                  <div className="tp-checkbox flex items-center mb-3">
                    <input id="comments" type="checkbox" />
                    <label htmlFor="comments" className="ml-2 text-base text-black whitespace-nowrap">Post, Comments & Replies Notifications</label>
                  </div>
                  <div className="tp-checkbox flex items-center mb-3">
                    <input id="order" type="checkbox" />
                    <label htmlFor="order" className="ml-2 text-base text-black whitespace-nowrap">New Order Notifications</label>
                  </div>
                </div>
                <div className="text-end mt-5">
                  <button onClick={handleSaveNotification} className="tp-btn px-10 py-2 bg-pacific-500 text-white rounded-md hover:bg-pacific-600">
                    Save
                  </button>
                </div>
              </div>

              {/* Security Section */}
              <div className="py-10 px-10 bg-white rounded-md border border-gray-200">
                <h5 className="text-xl font-semibold mb-6">Security</h5>
                <div className="mb-5">
                  <p className="mb-0 text-base text-black">Current Password</p>
                  <input
                    className="input w-full h-[49px] rounded-md border border-gray-300 px-6 text-base text-black"
                    type="password"
                    name="currentPassword"
                    value={profileData.currentPassword}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-5">
                  <p className="mb-0 text-base text-black">New Password</p>
                  <input
                    className="input w-full h-[49px] rounded-md border border-gray-300 px-6 text-base text-black"
                    type="password"
                    name="newPassword"
                    value={profileData.newPassword}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-5">
                  <p className="mb-0 text-base text-black">Confirm Password</p>
                  <input
                    className="input w-full h-[49px] rounded-md border border-gray-300 px-6 text-base text-black"
                    type="password"
                    name="confirmPassword"
                    value={profileData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="text-end mt-5">
                  <button onClick={handleSaveSecurity} className="tp-btn px-10 py-2 bg-pacific-500 text-white rounded-md hover:bg-pacific-600">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default ProfilePage;

