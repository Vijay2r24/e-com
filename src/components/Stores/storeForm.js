import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Combobox } from "@headlessui/react";
import { ToastContainer } from "react-toastify";
import { FiTrash, FiEye } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";

const UserForm = () => {
  const [formData1, setFormData1] = useState({
    StoreID: null,
    StoreName: "",
    Email: "",
    Phone: "",
    AddressLine1: "",
    AddressLine2: "",
    CityID: "",
    StateID: "",
    CountryID: "",
    ZipCode: "",
    imagePreview: "",
    Password: "",
    ConfirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const countries = [{ CountryID: 1, CountryName: "USA" }, { CountryID: 2, CountryName: "Canada" }];
  const filteredStates = [{ StateID: 1, StateName: "California" }, { StateID: 2, StateName: "Ontario" }];
  const filteredCities = [{ CityID: 1, CityName: "Los Angeles" }, { CityID: 2, CityName: "Toronto" }];
  const inputClassName = "w-full px-4 py-2 border border-gray-300 rounded-md";
  const comboboxButtonClassName = "absolute right-3 top-1/2 transform -translate-y-1/2";
  const comboboxOptionsClassName = "absolute bg-white border rounded-md shadow-lg w-full z-10";

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData1((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectionChange = (name, value) => {
    setFormData1((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData1((prevData) => ({ ...prevData, imagePreview: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    setFormData1((prevData) => ({ ...prevData, imagePreview: "" }));
  };

  const handleView = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic and submit
  };

  return (
    <div className="flex flex-col space-y-6 p-6 max-w-6xl mx-auto bg-white rounded-lg border border-gray-300">
      <ToastContainer />
      <h1 className="text-xl font-semibold text-gray-800 mb-4">Add Store</h1>

      {/* Store Name */}
      <div className="flex gap-4">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Store Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="StoreName"
            value={formData1.StoreName}
            onChange={handleFormChange}
            className={inputClassName}
            placeholder="Store Name"
          />
          {errors.StoreName && <p className="text-red-500 text-sm mt-1">{errors.StoreName}</p>}
        </div>
      </div>

      {/* Email Field */}
      <div className="flex gap-4 mt-4">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="Email"
            value={formData1.Email}
            onChange={handleFormChange}
            className={inputClassName}
            placeholder="Email"
          />
          {errors.Email && <p className="text-red-500 text-sm mt-1">{errors.Email}</p>}
        </div>
      {/* Phone Number Field */}
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="Phone"
            value={formData1.Phone}
            onChange={handleFormChange}
            className={inputClassName}
            placeholder="Phone Number"
          />
          {errors.Phone && <p className="text-red-500 text-sm mt-1">{errors.Phone}</p>}
        </div>
      </div>

      {/* Address Fields */}
      <div className="flex gap-4 mt-4">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Address Line 1 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="AddressLine1"
            value={formData1.AddressLine1}
            onChange={handleFormChange}
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
            name="AddressLine2"
            value={formData1.AddressLine2}
            onChange={handleFormChange}
            className={inputClassName}
            placeholder="Address Line 2"
          />
        </div>
      </div>

      {/* Country, State, City Comboboxes */}
      <div className="flex gap-4 mt-4">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
          <Combobox
            value={formData1.CountryID}
            onChange={(value) => handleSelectionChange("CountryID", value)}
          >
            <div className="relative">
              <Combobox.Input
                className={inputClassName}
                displayValue={(id) =>
                  countries.find((country) => country.CountryID === id)?.CountryName || ""
                }
                placeholder="Select Country"
              />
              <Combobox.Button className={comboboxButtonClassName}>
                <FaChevronDown />
              </Combobox.Button>
              <Combobox.Options className={comboboxOptionsClassName}>
                {countries.map((country) => (
                  <Combobox.Option key={country.CountryID} value={country.CountryID}>
                    {country.CountryName}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </div>
          </Combobox>
        </div>

        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
          <Combobox
            value={formData1.StateID}
            onChange={(value) => handleSelectionChange("StateID", value)}
          >
            <div className="relative">
              <Combobox.Input
                className={inputClassName}
                displayValue={(id) =>
                  filteredStates.find((state) => state.StateID === id)?.StateName || ""
                }
                placeholder="Select State"
              />
              <Combobox.Button className={comboboxButtonClassName}>
                <FaChevronDown />
              </Combobox.Button>
              <Combobox.Options className={comboboxOptionsClassName}>
                {filteredStates.map((state) => (
                  <Combobox.Option key={state.StateID} value={state.StateID}>
                    {state.StateName}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </div>
          </Combobox>
        </div>

        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
          <Combobox
            value={formData1.CityID}
            onChange={(value) => handleSelectionChange("CityID", value)}
          >
            <div className="relative">
              <Combobox.Input
                className={inputClassName}
                displayValue={(id) =>
                  filteredCities.find((city) => city.CityID === id)?.CityName || ""
                }
                placeholder="Select City"
              />
              <Combobox.Button className={comboboxButtonClassName}>
                <FaChevronDown />
              </Combobox.Button>
              <Combobox.Options className={comboboxOptionsClassName}>
                {filteredCities.map((city) => (
                  <Combobox.Option key={city.CityID} value={city.CityID}>
                    {city.CityName}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </div>
          </Combobox>
        </div>
      </div>
   {/* Zip Code Field */}
   <div className="flex gap-4 mt-4">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Zip Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="ZipCode"
            value={formData1.ZipCode}
            onChange={handleFormChange}
            className={inputClassName}
            placeholder="Zip Code"
          />
          {errors.ZipCode && <p className="text-red-500 text-sm mt-1">{errors.ZipCode}</p>}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-pacific-500 text-white py-2 px-4 rounded-md hover:bg-pacific-600"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UserForm;
