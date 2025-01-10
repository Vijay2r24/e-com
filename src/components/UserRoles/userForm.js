import React from "react";

const AddRoleForm = () => {
  return (
    <div className="flex flex-col space-y-6 p-6 max-w-6xl mx-auto bg-white rounded-lg border border-gray-300">
    <div>
      <h2 className="text-2xl font-semibold mb-4">Add Role</h2>
      <hr className="border-gray-300 my-4" />
  
      {/* Store Name */}
      <div className="mb-4 flex flex-col sm:flex-row justify-center items-center w-full">
        <label className="block font-semibold mr-[14px]">
          Store Name <span className="text-red-500">*</span>
        </label>
        <select className="w-full sm:w-1/2 border rounded-md p-2">
          {/* Replace with store options */}
          <option>Store 1</option>
          <option>Store 2</option>
        </select>
      </div>
  
      {/* Role Name */}
      <div className="mb-4 flex flex-col sm:flex-row justify-center items-center w-full">
        <label className="block font-semibold mr-[14px]">
          Role Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="border p-2 w-full sm:w-1/2 rounded-md"
          placeholder="Enter Role Name"
        />
      </div>
  
      {/* <hr className="border-gray-300 my-4" /> */}
  
      {/* Permissions */}
      <div className="grid grid-cols-1 mt-14 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example for a permission module */}
        <div className="border p-4 rounded-lg bg-[#e5efff] border-gray-300">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Module Name</h2>
            <label className="text-sm">
              <input
                type="checkbox"
                className="mr-2 form-checkbox h-[12px] w-[12px] text-blue-600"
              />
              Select All
            </label>
          </div>
          <hr className="border-gray-300 my-4 mt-2 mb-4" />
          {/* Example permission */}
          <div className="flex items-center mb-2">
            <label>
              <input
                type="checkbox"
                className="mr-2 form-checkbox h-[12px] w-[12px] text-blue-600"
              />
              Permission Name
            </label>
          </div>
        </div>
      </div>
  
      {/* Action Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
        <button className="bg-gray-200 px-4 py-2 rounded border border-gray-300 w-full sm:w-auto">
          Close
        </button>
        <button className="bg-pacific-500 text-white px-4 py-2 rounded border w-full sm:w-auto hover:bg-pacific-600 hover:shadow-lg">
          Save Role
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default AddRoleForm;

