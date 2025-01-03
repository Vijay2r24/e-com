
import React , { useState }from 'react';
import cloudeUploade from "../../assets/images/icons8-upload-to-cloud.gif"

const AddProductPhoto = () => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("black");

  const sizes = ["S", "M", "XL", "XXL"];
  const colors = ["black", "yellow", "white", "red"];
  return (
    <div>
      <div className="flex justify-between items-start min-h-scree pt-4">
        {/* Left Side */}
        <div className="w-[25%] bg-gray-200 p-8">
          {/* You can add content here for the left side */}
          <h3 className="text-lg font-medium text-gray-800">Left Side</h3>
      
        </div>

        {/* Right Side */}
        <div className="w-[75%] bg-white p-8 rounded-lg border border-gray-200">
          {/* Header */}
          <h2 className="text-lg font-medium text-gray-800">Add Product Photo</h2>

          {/* Drop Area */}
          <div className="mt-6 border-2 border-dashed border-gray-300 rounded-lg p-16 text-center">
            {/* Cloud Upload Icon */}
            <div className="flex justify-center text-orange-500 mb-6">
              <img
                src={cloudeUploade}
                alt="Your Image"
                className="w-16 h-16"
              />
            </div>

            {/* Drop Text */}
            <p className="text-gray-800 text-lg font-medium">
              Drop your images here, or{' '}
              <span className="text-orange-500 font-semibold cursor-pointer">
                click to browse
              </span>
            </p>

            {/* Description */}
            <p className="mt-4 text-sm text-gray-500">
              1600 x 1200 (4:3) recommended. PNG, JPG, and GIF files are allowed
            </p>
          </div>
        </div>

      </div>
      <div className="flex justify-between items-start min-h-scree pt-4">
        {/* Left Side */}
        <div className="w-[25%] p-8">
          {/* You can add content here for the left side */}

        </div>
        <div className="w-[75%] bg-white p-8 rounded-lg mt-8 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Product Information</h2>

          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                placeholder="Items Name"
                className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Categories</label>
              <select className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option>Choose a categories</option>
              </select>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
              <input
                type="text"
                placeholder="Brand Name"
                className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
              <input
                type="text"
                placeholder="In gm & kg"
                className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option>Select Gender</option>
              </select>
            </div>
          </div>

          {/* Size and Colors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Size:</label>
              <div className="flex flex-wrap gap-3">
                {["XS", "S", "M", "XL", "XXL", "3XL"].map((size) => (
                  <button
                    key={size}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 hover:bg-blue-500 hover:text-white"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Colors:</label>
              <div className="flex flex-wrap gap-3">
                {["#1E3A8A", "#EAB308", "#10B981", "#F87171", "#0EA5E9", "#64748B"].map((color) => (
                  <div
                    key={color}
                    className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              placeholder="Short description about the product"
              rows="4"
              className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          {/* Tag Number, Stock, Tag */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tag Number</label>
              <input
                type="text"
                placeholder="#******"
                className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
              <input
                type="text"
                placeholder="Quantity"
                className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tag</label>
              <input
                type="text"
                placeholder="Add a tag"
                className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>

      </div>
      <div className="flex justify-between items-start min-h-scree pt-4">
        {/* Left Side */}
        <div className="w-[25%] p-8">
          {/* You can add content here for the left side */}

        </div>
        {/* Pricing Details Card */}
        <div className="w-[75%] bg-white p-8 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Pricing Details</h2>
          <div className="grid grid-cols-3 gap-4">
            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <div className="flex items-center border rounded-lg p-2 bg-gray-50">
                <span className="text-gray-500">$</span>
                <input
                  type="number"
                  className="ml-2 flex-1 outline-none bg-transparent"
                  defaultValue="4"
                />
              </div>
            </div>

            {/* Discount */}
            <div>
              <label className="block text-sm font-medium mb-1">Discount</label>
              <div className="flex items-center border rounded-lg p-2 bg-gray-50">
                <span className="text-gray-500">%</span>
                <input
                  type="number"
                  className="ml-2 flex-1 outline-none bg-transparent"
                  defaultValue="3"
                />
              </div>
            </div>

            {/* Tax */}
            <div>
              <label className="block text-sm font-medium mb-1">Tax</label>
              <div className="flex items-center border rounded-lg p-2 bg-gray-50">
                <span className="text-gray-500">TXT</span>
                <input
                  type="number"
                  className="ml-2 flex-1 outline-none bg-transparent"
                  defaultValue="2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Button Section */}
      <div className="flex justify-between items-start min-h-scree pt-4">
        {/* Left Side */}
        <div className="w-[25%] p-8">
        </div>
        <div className="flex justify-end items-center gap-4 mt-6 bg-blue-50 w-[75%] max-w-4xl p-6 rounded-lg border border-gray-200">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Create Product
          </button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddProductPhoto;

