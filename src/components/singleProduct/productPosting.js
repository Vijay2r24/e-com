
import React, { useState, useContext, useEffect } from 'react';
import cloudeUploade from "../../assets/images/icons8-upload-to-cloud.gif"
import { FiTrash, FiEye } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";
import { CategoriesContext } from '../Context/CategoriesContext'
import { Combobox } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi"; // Import an icon for the dropdown symbol
import { BrandsContext } from '../Context/BrandsContext'
import { DataContext } from '../Context/SizeContext'
import { ColorContext } from '../Context/ColorContext'
import Blueshirt from '../../assets/images/blushirt.jpg'

const AddProductPhoto = () => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("black");
  const { categories, fetchAndStoreCategories } = useContext(CategoriesContext)
  const { brands, fetchAndStoreBrands } = useContext(BrandsContext);
  const { data } = useContext(DataContext);// Access the sizes data from context
  const { colors } = useContext(ColorContext);
  useEffect(() => {
    // Log the data when it changes
    console.log("Data from DataContext:", data);
  }, [data]); // Dependency array ensures the effect runs when 'data' changes

  useEffect(() => {
    // Log the colors when they change
    console.log("Colors from ColorContext:", colors);
  }, [colors]); // Dependency array ensures the effect runs when 'colors' changes
  const sizes = ["S", "M", "XL", "XXL"];
  const [formData, setFormData] = useState({
    images: [], // Array to store images with preview
    categoryID: "",
    categoryName: "",
    brandID: "",
    brandName: "",
    colorID: null,

  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [errors, setErrors] = useState({});
  const handleUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const handleDelete = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleView = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };
  const handleCategoryChange = (value) => {
    setFormData({
      ...formData,
      categoryID: value,
      categoryName: categories.find((cat) => cat.CategoryID === value)?.CategoryName || "",
    });
    setErrors({ ...errors, category: "" }); // Clear errors on valid selection
  };
  const handleBrandChange = (selectedBrandID) => {
    // Update the formData state with the selected brand ID and name
    const selectedBrand = brands.find((brand) => brand.BrandID === selectedBrandID);
    setFormData({
      ...formData,
      brandID: selectedBrandID, // Update the brandID in formData
      brandName: selectedBrand ? selectedBrand.BrandName : "", // Set brandName based on the selected brand
    });
  };
  const handleColorSelect = (ColourID) => {
    setFormData((prevState) => ({
      ...prevState,
      colorID: ColourID, // Update the colorID in formData
    }));
    console.log("Form Data with Color ID:", formData);
    // You can now pass the formData object for further processing
  };
  const handleSizeSelect = (sizeID) => {
    setFormData((prevState) => ({
      ...prevState,
      sizeID: sizeID, // Update sizeID in formData
    }));
    console.log("Form Data with Selected Size ID:", formData);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };
  return (
    <div>
      <div className="flex justify-between items-start min-h-scree pt-4">
        {/* Left Side */}

        {/* You can add content here for the left side */}

        <div className="w-[25%] bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          {/* Image */}
          <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-md">
            <img
              src={Blueshirt}
              alt="Men Black Slim Fit T-shirt"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-800">
            Men Black Slim Fit T-shirt{" "}
            <span className="text-sm text-gray-500">(Fashion)</span>
          </h3>

          {/* Price */}
          <div className="text-gray-700 space-y-1">
            <p>
              <span className="line-through text-gray-400">$100</span>{" "}
              <span className="text-green-600 font-bold">$80</span>{" "}
              <span className="text-red-500">(30% Off)</span>
            </p>
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Size:</label>
            <div className="flex flex-wrap gap-3">
              {["S", "M", "L", "XL"].map((size, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 hover:bg-blue-500 hover:text-white ${formData.sizeID === index
                    ? 'border-2 border-blue-600 shadow-lg shadow-blue-200 scale-105 outline outline-2 outline-blue-400' // Refined border and subtle outline for selected size
                    : 'bg-gray-100 hover:scale-110 hover:bg-gray-200'} hover:outline hover:outline-1 hover:outline-blue-600`}
                  onClick={() => handleSizeSelect(index)} // Set selected size when clicked
                >
                  {size} {/* Display the size label */}
                </button>
              ))}
            </div>
          </div>


          {/* Colors */}
          <div>
            <p className="text-sm font-medium text-gray-700">Colors:</p>
            <div className="flex gap-4 mt-2">
              {["#1e3a8a", "#eab308", "#bbbb", "#ef4444"].map((color, index) => (
                <div
                  key={index}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition-all transform duration-300 ease-in-out ${formData.colorID === index
                    ? 'border-2 border-blue-600 shadow-lg shadow-blue-200 scale-105' // Subtle border and shadow for selected color
                    : 'bg-gray-100 hover:scale-110 hover:bg-gray-200'
                    }`} // Highlight selected color with border & shadow
                  onClick={() => handleColorSelect(index)} // Set selected color when clicked
                >
                  <div
                    className="w-5 h-5 rounded-full"
                    style={{ backgroundColor: color }} // Set color hex as background for the circle
                  ></div>
                </div>
              ))}
            </div>
          </div>


        </div>

        <div className="w-[74%]">
          {/* Right Side */}
          <div className=" bg-white p-8 rounded-lg border border-gray-200">
            {/* Header */}
            <h2 className="text-lg font-medium text-gray-800">Add Product Photos</h2>

            {/* Drop Area */}
            <div className="mt-6 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center relative">
              {/* Cloud Upload Icon */}
              <div className="flex justify-center text-orange-500 mb-4">
                <img
                  src={cloudeUploade}
                  alt="Upload Icon"
                  className="w-16 h-16"
                />
              </div>
              {/* Drop Text */}
              <p className="text-gray-800 text-lg font-medium">
                Drop your images here, or{" "}
                <span
                  className="text-orange-500 font-semibold cursor-pointer"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  click to browse
                </span>
              </p>

              {/* File Input */}
              <input
                id="fileInput"
                type="file"
                multiple
                className="hidden"
                onChange={handleUpload}
                accept="image/png, image/jpeg, image/gif"
              />

              {/* Description */}
              <p className="mt-4 text-sm text-gray-500">
                1600 x 1200 (4:3) recommended. PNG, JPG, and GIF files are allowed.
              </p>

              {/* Previews */}
              <div className="flex flex-wrap gap-4 mt-4 justify-center">
                {formData.images.map((img, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 group overflow-hidden border rounded-md"
                  >
                    <img
                      src={img.preview}
                      alt={`Preview ${index}`}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-white bg-red-600 p-1 rounded-full mr-2"
                      >
                        <FiTrash size={14} title="Delete" />
                      </button>
                      <button
                        onClick={() => handleView(img.preview)}
                        className="text-white bg-blue-600 p-1 rounded-full"
                      >
                        <FiEye size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal to View Image */}
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
                    src={modalImage}
                    alt="Full View"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>
          <div className=" bg-white p-8 rounded-lg mt-8 border border-gray-200">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <Combobox as="div" value={formData.categoryID} onChange={handleCategoryChange}>
                  <div className="relative">
                    <Combobox.Input
                      className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      placeholder="Select Category"
                      value={
                        categories.find((category) => category.CategoryID === formData.categoryID)?.CategoryName || ""
                      }
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          categoryID: "",
                          categoryName: e.target.value,
                        });
                      }}
                    />
                    <Combobox.Button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      {/* Dropdown symbol */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </Combobox.Button>

                    {/* Dropdown options below input */}
                    <Combobox.Options className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {categories.map((category) => (
                        <Combobox.Option key={category.CategoryID} value={category.CategoryID}>
                          {({ active }) => (
                            <div
                              className={`p-3 cursor-pointer transition duration-200 ease-in-out rounded-md ${active ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"}`}
                            >
                              {category.CategoryName}
                            </div>
                          )}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  </div>
                </Combobox>
                {errors.category && (
                  <p className="text-red-500 text-sm text-center mt-1">{errors.category}</p>
                )}
              </div>
            </div>


            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
              <input
                type="text"
                placeholder="Brand Name"
                className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div> */}
              {/* Brand Field with Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <Combobox as="div" value={formData.brandID} onChange={handleBrandChange}>
                  <div className="relative">
                    <Combobox.Input
                      className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      placeholder="Select Brand"
                      value={
                        brands.find((brand) => brand.BrandID === formData.brandID)?.BrandName || ""
                      }
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          brandID: "",
                          brandName: e.target.value,
                        });
                      }}
                    />
                    <Combobox.Button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      {/* Dropdown symbol */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </Combobox.Button>

                    {/* Dropdown options below input */}
                    <Combobox.Options className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {brands.map((brand) => (
                        <Combobox.Option key={brand.BrandID} value={brand.BrandID}>
                          {({ active }) => (
                            <div
                              className={`p-3 cursor-pointer transition duration-200 ease-in-out rounded-md ${active ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"}`}
                            >
                              {brand.BrandName}
                            </div>
                          )}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  </div>
                </Combobox>
                {errors.brand && (
                  <p className="text-red-500 text-sm text-center mt-1">{errors.brand}</p>
                )}
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
                  {data.map((size) => (
                    <button
                      key={size.SizeID}
                      className={`px-4 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 hover:bg-blue-500 hover:text-white ${formData.sizeID === size.SizeID ? 'border-2 border-blue-600 shadow-lg shadow-blue-200 scale-105 outline outline-2 outline-blue-400' // Refined border and subtle outline for selected size
                        : 'bg-gray-100 hover:scale-110 hover:bg-gray-200'} hover:outline hover:outline-1 hover:outline-blue-600`}
                      onClick={() => handleSizeSelect(size.SizeID)} // Set selected size when clicked
                    >
                      {size.Label} {/* Display the size label */}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 pl-6 mb-2">Colors:</label>
                <div
                  className="flex flex-wrap gap-3 overflow-y-auto max-h-48 scrollbar-thin scrollbar-thumb-blue-500 pl-8 pt-1 pb-8 scrollbar-track-gray-200" // Adds scroll and custom styles for scrollbar
                  style={{ maxHeight: '12rem' }} // Limit the height for scrollable container
                >
                  {colors.map((color) => (
                    <div
                      key={color.ColourID}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition-all transform duration-300 ease-in-out ${formData.colorID === color.ColourID
                        ? 'border-2 border-blue-600 shadow-lg shadow-blue-200 scale-105' // Subtle border and shadow for selected color
                        : 'bg-gray-100 hover:scale-110 hover:bg-gray-200'
                        }`} // Highlight selected color with border & shadow
                      onClick={() => handleColorSelect(color.ColourID)} // Set selected color when clicked
                    >
                      <div
                        className="w-5 h-5 rounded-full"
                        style={{ backgroundColor: color.HexCode }} // Set color hex as background for the circle
                      ></div>
                    </div>
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
      </div>
      <div className="flex justify-between items-start min-h-scree pt-4">
        {/* Left Side */}
        <div className="w-[25%] p-8">
          {/* You can add content here for the left side */}

        </div>
        {/* Pricing Details Card */}
        <div className="w-[74%] bg-white p-8 rounded-lg border border-gray-200">
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
