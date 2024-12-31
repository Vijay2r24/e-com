import React, { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon, VisibilityIcon, EyeOffIcon } from '@heroicons/react/20/solid';
import { FaEyeSlash,FaEye } from 'react-icons/fa';


const UserRegistrationPage = () => {
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    AddressLine1: '',
    AddressLine2: '',
    Email: '',
    CountryID: '',
    StateID: '',
    PhoneNumber: '',
    Password: ''
  });
  const [errors, setErrors] = useState({});
  const inputClassName = "w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm hover:shadow-md";
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [countries, setCountries] = useState([{ CountryID: 1, CountryName: 'USA' }, { CountryID: 2, CountryName: 'India' }]); // Example countries
  const [states, setStates] = useState([{ StateID: 1, StateName: 'California' }, { StateID: 2, StateName: 'Texas' }]); // Example states
  const [query, setQuery] = useState('');
  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      console.log('Selected file:', file.name);
      // Optionally, you can perform validations (e.g., file type, size) or upload the file
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        alert('File size exceeds 2MB limit.');
        return;
      }
      // Further handling logic (e.g., setting the file to state or sending it to a server)
    }
  };
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setFormData({ ...formData, CountryID: country.CountryID });
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    setFormData({ ...formData, StateID: state.StateID });
  };

  return (
<div className='flex flex-col space-y-6 p-6 max-w-6xl mx-auto bg-white rounded-lg border border-gray-300'>
<h1 className="text-xl font-semibold text-gray-800 mb-4">Add Users</h1>
  <div className="flex gap-4">
    {/* First Name */}
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        First Name <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="FirstName"
        name="FirstName"
        value={formData.FirstName || ""}
        onChange={handleFormChange}
        required
        className={inputClassName}
        placeholder="First Name"
      />
      {errors.FirstNameError && (
        <p className="text-red-500 text-sm mt-1">{errors.FirstNameError}</p>
      )}
    </div>

    {/* Last Name */}
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Last Name
      </label>
      <input
        type="text"
        id="LastName"
        name="LastName"
        value={formData.LastName || ""}
        onChange={handleFormChange}
        className={inputClassName}
        placeholder="Last Name"
      />
    </div>
  </div>

  {/* Address Line 1 and Address Line 2 */}
  <div className="flex gap-4 mt-4">
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Address Line 1 <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="AddressLine1"
        name="AddressLine1"
        value={formData.AddressLine1 || ""}
        onChange={handleFormChange}
        required
        className={inputClassName}
        placeholder="Address Line 1"
      />
    </div>

    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Address Line 2
      </label>
      <input
        type="text"
        id="AddressLine2"
        name="AddressLine2"
        value={formData.AddressLine2 || ""}
        onChange={handleFormChange}
        className={inputClassName}
        placeholder="Address Line 2"
      />
    </div>
  </div>

  {/* Phone Number and Email */}
  <div className="flex gap-4 mt-4">
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Phone Number <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="PhoneNumber"
        name="PhoneNumber"
        value={formData.PhoneNumber || ""}
        onChange={handleFormChange}
        required
        className={inputClassName}
        placeholder="Phone Number"
      />
    </div>

    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Email <span className="text-red-500">*</span>
      </label>
      <input
        type="email"
        id="Email"
        name="Email"
        value={formData.Email || ""}
        onChange={handleFormChange}
        required
        className={inputClassName}
        placeholder="Email"
      />
    </div>
  </div>

  {/* Password and Confirm Password */}
  <div className="flex gap-4 mt-4">
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Password <span className="text-red-500">*</span>
      </label>
      <input
        type="password"
        id="Password"
        name="Password"
        value={formData.Password || ""}
        onChange={handleFormChange}
        required
        className={inputClassName}
        placeholder="Password"
      />
    </div>

    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Confirm Password <span className="text-red-500">*</span>
      </label>
      <input
        type="password"
        id="ConfirmPassword"
        name="ConfirmPassword"
        value={formData.ConfirmPassword || ""}
        onChange={handleFormChange}
        required
        className={inputClassName}
        placeholder="Confirm Password"
      />
    </div>
  </div>

  {/* Upload Image */}
  <div className="mt-4">
  <label
    htmlFor="UploadImage"
    className="block text-sm font-semibold text-gray-700 mb-2"
  >
    Upload Image
  </label>
  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
    <div className="relative w-full sm:w-80">
      <input
        type="file"
        id="UploadImage"
        name="UploadImage"
        accept="image/*"
        onChange={handleImageUpload}
        className={`block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 hover:file:bg-gray-200 focus:ring-blue-500 ${inputClassName}`}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      </div>
    </div>
  </div>
</div>
  {/* Submit Button */}
  <div className="flex-auto flex flex-row-reverse gap-3 mt-4">
  <button
    type="button"
    className="text-base hover:scale-105 transition transform duration-200 ease-in-out px-4 py-2 rounded font-semibold bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300"
  >
    Cancel
  </button>
  <button
    type="submit"
    className="text-base hover:scale-105 transition transform duration-200 ease-in-out px-4 py-2 rounded font-semibold bg-pacific-500 hover:bg-pacific-600 text-white border border-pacific-500"
  >
    Submit
  </button>
</div>
</div>

  );
};

export default UserRegistrationPage;
