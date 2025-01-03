import React, { useState, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import { FaEye, FaEyeSlash, FaChevronDown } from "react-icons/fa";
import { FiTrash, FiEye } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useParams } from "react-router-dom";
import { userCreateOrUpdate, getUserById } from "../../Constants/apiRoutes"
const UserRegistrationPage = () => {
  const [formData1, setFormData1] = useState({
    FirstName: "",
    LastName: "",
    PinCode: "",
    CityID: "",
    StateID: "",
    CountryID: "",
    AddressLine1: "",
    PhoneNumber: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    imagePreview: null,
    imageFile: null,
  });
  useEffect(() => {
    console.log("Form Data:", formData1.FirstName);
  }, [formData1]);
  const { userId } = useParams();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData1((prevState) => ({
          ...prevState,
          imageFile: file,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    setFormData1((prevState) => ({
      ...prevState,
      imagePreview: null,
    }));
  };

  const handleView = () => {
    setIsModalOpen(true);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [countries] = useState([
    { CountryID: 1, CountryName: "USA" },
    { CountryID: 2, CountryName: "India" },
  ]);

  const [states] = useState([
    { StateID: 1, StateName: "California", CountryID: 1 },
    { StateID: 2, StateName: "Texas", CountryID: 1 },
    { StateID: 3, StateName: "Maharashtra", CountryID: 2 },
    { StateID: 4, StateName: "Karnataka", CountryID: 2 },
  ]);

  const [cities] = useState([
    { CityID: 1, CityName: "Los Angeles", StateID: 1 },
    { CityID: 2, CityName: "Houston", StateID: 2 },
    { CityID: 3, CityName: "Mumbai", StateID: 3 },
    { CityID: 4, CityName: "Bangalore", StateID: 4 },
  ]);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleSelectionChange = (field, value) => {
    setFormData1((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "CountryID" ? { StateID: null, CityID: null } : {}),
      ...(field === "StateID" ? { CityID: null } : {}),
    }));
  };

  const filteredStates = states.filter(
    (state) => state.CountryID === formData1.CountryID
  );

  const filteredCities = cities.filter(
    (city) => city.StateID === formData1.StateID
  );


  const inputClassName =
    "w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm hover:shadow-md";

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData1({ ...formData1, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleValidation = () => {
    const newErrors = {};
    if (!formData1.FirstName) newErrors.FirstName = "First Name is required.";
    if (!formData1.PinCode || isNaN(formData1.PinCode))
      newErrors.PinCode = "Valid Pin Code is required.";
    if (!formData1.PhoneNumber || isNaN(formData1.PhoneNumber))
      newErrors.PhoneNumber = "Valid Phone Number is required.";
    if (!formData1.Email) newErrors.Email = "Email is required.";
    if (!formData1.Password) newErrors.Password = "Password is required.";
    if (formData1.Password !== formData1.ConfirmPassword)
      newErrors.ConfirmPassword = "Passwords do not match.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const [user, setUser] = useState(null);  // for storing user brand data
  const [editMode, setEditMode] = useState(false);  // for managing edit mode
  useEffect(() => {
    if (userId) {
      axios.get(`${getUserById}/${userId}`)
        .then(response => {
          console.log("API Response:", response.data);  // Log the entire response for inspection
          console.log("StatusCode:", response.data.StatusCode); // Log the actual statusCode

          // Check for a successful statusCode (handle potential variations)
          if (response.data.StatusCode == "SUCCESS") {
            setUser(response.data.data);
            console.log("setUser", response.data.data);  // Log the data directly here
          } else {
            // Log the error message directly if the statusCode is not as expected
            console.error("Failed to fetch user:", response.data.message || "Unknown error");
          }
        })
        .catch(error => {
          // Log the network or other errors directly
          console.error('Error fetching data:', error.message);
        });
    }
  }, [userId]);

  useEffect(() => {
    if (user) {
      setEditMode(Boolean(user.UserID)); // Set editMode based on userBrand data
    }
  }, [user]);
  useEffect(() => {
    console.log("editMode", editMode)
    if (editMode) {
      setFormData1({
        FirstName: user.FirstName,
        LastName: user.LastName,
        PinCode: user.Pincode,
        CityID: user.CityID,
        StateID: user.StateID,
        CountryID: user.CountryID,
        AddressLine1: user.AddressLine,
        PhoneNumber: user.PhoneNumber,
        Email: user.Email,
        Password: "",
        ConfirmPassword: "",
        imagePreview: user.ProfileImageUrl,
        imageFile: null,
      });
    }
  }, [editMode]);
  const handleSubmit = async (e) => {
    if (handleValidation()) {
      console.log("Form submitted:", formData1);
    }
    const apiUrl = userCreateOrUpdate;

    // Prepare FormData object
    const formData = new FormData();
    console.log("imageFile: file,", formData.FirstName)
    // User data
    const userData = {
      TenantID: "1", // Always a string
      FirstName: formData1.FirstName,
      LastName: formData1.LastName,
      Email: formData1.Email, // Replace with actual form input value
      Password: formData1.Password, // Replace with actual form input value
      PhoneNumber: formData1.PhoneNumber, // Replace with actual form input value
      AddressLine: formData1.AddressLine1, // Replace with actual form input value
      CityID: formData1.CityID, // Always a number
      StateID:formData1.StateID, // Always a number
      CountryID: formData1.CountryID, // Always a number
      Pincode: formData1.PinCode, // Replace with actual form input value
      ...(editMode && { UserID: user.UserID }) // Conditionally add UserID if editMode is true
    };

    // Append the entire object as a JSON string
    formData.append("data", JSON.stringify(userData));
    formData.append("ProfileImage", formData1.imageFile)

    try {
      // Make the API request
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the request is recognized as multipart/form-data
        },
      });

      // Handle the response
      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message || "User created/updated successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Failed to create or update user.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      // Handle errors gracefully
      toast.error(
        error.response?.data?.message || "An error occurred while creating/updating the user.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };
  const comboboxButtonClassName =
    "absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500";
  const comboboxOptionsClassName =
    "absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-40 overflow-auto";

  return (
    <div className="flex flex-col space-y-6 p-6 max-w-6xl mx-auto bg-white rounded-lg border border-gray-300">
      <ToastContainer />
      <h1 className="text-xl font-semibold text-gray-800 mb-4">Add Users</h1>

      <div className="flex gap-4">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="FirstName"
            value={formData1.FirstName}
            onChange={handleFormChange}
            className={inputClassName}
            placeholder="First Name"
          />
          {errors.FirstName && (
            <p className="text-red-500 text-sm mt-1">{errors.FirstName}</p>
          )}
        </div>

        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            name="LastName"
            value={formData1.LastName}
            onChange={handleFormChange}
            className={inputClassName}
            placeholder="Last Name"
          />
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Address Line <span className="text-red-500">*</span>
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
            Pin Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="PinCode"
            value={formData1.PinCode}
            onChange={handleFormChange}
            className={inputClassName}
            placeholder="Pin Code"
          />
          {errors.PinCode && (
            <p className="text-red-500 text-sm mt-1">{errors.PinCode}</p>
          )}
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        {/* Country Combobox */}
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Country
          </label>
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
                  <Combobox.Option
                    key={country.CountryID}
                    value={country.CountryID}
                    className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                  >
                    {country.CountryName}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </div>
          </Combobox>
        </div>

        {/* State Combobox */}
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            State
          </label>
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
                  <Combobox.Option
                    key={state.StateID}
                    value={state.StateID}
                    className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                  >
                    {state.StateName}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </div>
          </Combobox>
        </div>

        {/* City Combobox */}
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            City
          </label>
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
                  <Combobox.Option
                    key={city.CityID}
                    value={city.CityID}
                    className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                  >
                    {city.CityName}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </div>
          </Combobox>
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
          {errors.Email && (
            <p className="text-red-500 text-sm mt-1">{errors.Email}</p>
          )}
        </div>
      </div>

      {/* Phone Number Field */}
      <div className="flex gap-4 mt-4">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="PhoneNumber"
            value={formData1.PhoneNumber}
            onChange={handleFormChange}
            className={inputClassName}
            placeholder="Phone Number"
          />
          {errors.PhoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.PhoneNumber}</p>
          )}
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="Password"
              value={formData1.Password}
              onChange={handleFormChange}
              className={inputClassName}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {/* {showPassword ? <FaEyeSlash /> : <FaEye />} */}
            </button>
          </div>
          {errors.Password && (
            <p className="text-red-500 text-sm mt-1">{errors.Password}</p>
          )}
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="ConfirmPassword"
            value={formData1.ConfirmPassword}
            onChange={handleFormChange}
            className={inputClassName}
            placeholder="Confirm Password"
          />
          {errors.ConfirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.ConfirmPassword}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Upload Profile Image
        </label>
        <input
          type="file"
          accept="image/*"
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          onChange={handleFileChange}
        />
        {formData1.imagePreview && (
          <div className="relative w-24 h-24 z-28 group overflow-hidden border rounded-md mt-4">
            <img
              src={formData1.imagePreview}
              alt="Preview"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button
                onClick={handleDelete}
                className="text-white bg-red-600 p-1 rounded-full mr-2"
              >
                <FiTrash size={14} title="Delete" />
              </button>
              <button
                onClick={handleView}
                className="text-white bg-blue-600 p-1 rounded-full"
              >
                <FiEye size={14} />
              </button>
            </div>
          </div>
        )}
        {/* Modal to view image */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center z-10 justify-center bg-black bg-opacity-50">
            <div
              className="bg-white p-4 rounded-md relative"
              style={{ width: "500px", height: "500px" }}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 flex items-center justify-center text-red-600 bg-red-50 rounded-md hover:bg-red-100 p-2"
              >
                <RiCloseLine size={18} />
              </button>
              <img
                src={formData1.imagePreview}
                alt="Full View"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-6">
        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full py-2 px-4 bg-pacific-500 text-white text-lg font-semibold rounded-lg hover:bg-pacific-600 transition duration-300"
        >
          {editMode ? 'Update' : 'Submit'}
        </button>

      </div>
    </div>


  );
};

export default UserRegistrationPage;
