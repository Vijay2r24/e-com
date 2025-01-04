import React, { useState } from "react";
import { FiTrash, FiEye } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";
import cloudeUploade from "../../assets/images/icons8-upload-to-cloud.gif"
const BannerUpload = () => {
  const [formData, setFormData] = useState({
    images: [],
    productName: "",
    categoryName: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [errors, setErrors] = useState({
    images: "",
    productName: "",
    categoryName: "",
  });

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(
      (file) => file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/gif"
    );

    if (validFiles.length < files.length) {
      setErrors((prev) => ({
        ...prev,
        images: "Some files are not in the allowed format. Only PNG, JPG, and GIF are allowed.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, images: "" }));
    }

    const updatedImages = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...updatedImages],
    }));
  };

  const handleDelete = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, images: updatedImages }));
  };

  const handleView = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        [name]: `${name === "productName" ? "Product Name" : "Category Name"} is required.`,
      }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (formData.productName.trim() === "") {
      newErrors.productName = "Product Name is required.";
    }
    if (formData.categoryName.trim() === "") {
      newErrors.categoryName = "Category Name is required.";
    }
    if (formData.images.length === 0) {
      newErrors.images = "Please upload at least one image.";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Handle form submission
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg border border-gray-200 w-full max-w-none mx-auto">
      {/* Header */}
      <h2 className="text-lg font-medium text-gray-800">Add Banner Details</h2>

      {/* Product Name Field */}
      <div className="mt-4">
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Product Name <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="productName"
        placeholder="Items Name"
        className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={formData.productName}
        onChange={handleChange}
      />
      {errors.productName && (
        <p className="text-red-500 text-sm mt-1">{errors.productName}</p>
      )}
    </div>

    {/* Category Name */}
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Category Name <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="categoryName"
        placeholder="Category Name"
        className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={formData.categoryName}
        onChange={handleChange}
      />
      {errors.categoryName && (
        <p className="text-red-500 text-sm mt-1">{errors.categoryName}</p>
      )}
    </div>
      </div>

      {/* Drop Area */}
      <div className="mt-6 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center relative">
        <div className="flex justify-center text-orange-500 mb-4">
          <img
            src={cloudeUploade}
            alt="Upload Icon"
            className="w-16 h-16"
          />
        </div>
        <p className="text-gray-800 text-lg font-medium">
          Drop your images here, or{" "}
          <span
            className="text-orange-500 font-semibold cursor-pointer"
            onClick={() => document.getElementById("fileInput").click()}
          >
            click to browse
          </span>
        </p>
        <input
          id="fileInput"
          type="file"
          multiple
          className="hidden"
          onChange={handleUpload}
          accept="image/png, image/jpeg, image/gif"
        />
        <p className="mt-4 text-sm text-gray-500">
          1600 x 1200 (4:3) recommended. PNG, JPG, and GIF files are allowed.
        </p>
        {errors.images && <p className="text-red-500 text-sm mt-2">{errors.images}</p>}

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

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-6 bg-pacific-500 hover:bg-pacific-600 text-white py-2 px-4 rounded-lg w-full"
      >
        Submit
      </button>

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
  );
};

export default BannerUpload;

