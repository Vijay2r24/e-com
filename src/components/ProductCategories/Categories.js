import React, { useEffect, useState } from 'react';
import { Combobox } from "@headlessui/react";
import { FaCaretDown } from 'react-icons/fa';
import ProductCard from "../product_card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import axios from 'axios';


function Home({ errors = {} }) {
    const [query, setQuery] = useState("");
    const [formData, setFormData] = useState({
        productName: "",
        category: "",
        price: "",
        quantity: "",
        description: "",
    });
    const categories = [
        "Smartphones",
        "Laptops",
        "Tablets",
        "Cameras",
        "Headphones",
        "Smartwatches",
        "Accessories",
    ];
    const { categoryID } = useParams();
    const [categoryData, setCategoryData] = useState(null);
    const filteredCategories = !query
        ? categories
        : categories.filter((category) =>
            category.toLowerCase().includes(query.toLowerCase())
        );

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log("Input Value:", value);  // Debugging log to check entered value
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,  // Update the specific field
        }));
    };
    React.useEffect(() => {
        console.log("Category ID from URL:", categoryID); // Log to verify
        // Fetch or load data based on categoryID if needed
    }, [categoryID]);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const [editMode, setEditMode] = useState(false);
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageToDelete, setImageToDelete] = useState(null);

    const handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        addImages(files);
    };

    const handleBrowse = (event) => {
        const files = Array.from(event.target.files);
        addImages(files);
    };

    const addImages = (files) => {
        const newImages = files.map((file) => ({
            file,
            name: file.name,
            date: new Date().toLocaleDateString(),
            size: (file.size / 1024).toFixed(2) + " KB",
        }));

        // Filter out duplicates based on the file name
        const uniqueImages = newImages.filter(
            (newImage) => !images.some((image) => image.name === newImage.name)
        );

        if (uniqueImages.length === 0) {
            alert("Image already exists.");
            return;
        }

        setImages((prevImages) => [...prevImages, ...uniqueImages]);
        setPreviewImages((prevImages) => [...prevImages, ...uniqueImages]);
    };
    useEffect(() => {
        if (!categoryID) return;
        const token = localStorage.getItem("token");
        axios
            .get(`https://electronic-ecommerce.onrender.com/api/getCategoryById/${categoryID}`, {
                headers: {
                  Authorization: `Bearer ${token}`, // Pass token in Authorization header
                 
                },})
            .then((response) => {
                // Function to clean all string fields in the response data
                const cleanString = (str) => {
                    if (typeof str === 'string') {
                        // Remove unwanted characters like double quotes and extra spaces
                        return str.replace(/"/g, '').trim();
                    }
                    return str;
                };

                // Recursively clean the entire response data object
                const cleanData = (data) => {
                    if (Array.isArray(data)) {
                        return data.map(item => cleanData(item));  // Clean each item in an array
                    }
                    if (typeof data === 'object' && data !== null) {
                        const cleanedObj = {};
                        for (const key in data) {
                            cleanedObj[key] = cleanData(data[key]);  // Recursively clean each property
                        }
                        return cleanedObj;
                    }
                    return cleanString(data);  // Clean individual strings
                };

                // Clean the data before setting it to the state
                const cleanedCategoryData = cleanData(response.data.Data);

                setCategoryData(cleanedCategoryData);

                console.log("Cleaned Category Data:", cleanedCategoryData);
            })
            .catch((error) => {
                console.error('Error fetching category data:', error);
            });
    }, [categoryID]);
    useEffect(() => {
        if (categoryData) {
            setEditMode(Boolean(categoryData?.CategoryID)); // Set editMode based on categoryData
        }
    }, [categoryData]);
    useEffect(() => {
        if (editMode) {
            setFormData({
                category: categoryData.CategoryName || "",
                price: "", // Add logic to fetch price if needed
                quantity: "", // Add logic to fetch quantity if needed
                description: categoryData.CategoryDescription || "",
            });
    
            // Check if the image is already added by using a flag instead of including `images` in the dependency array
            if (categoryData.CategoryImage && !images.find((image) => image.file === categoryData.CategoryImage)) {
                const newImage = {
                    file: categoryData.CategoryImage, // Treat the image URL as a file for consistency
                    date: new Date().toLocaleDateString(),
                    size: 'N/A', // Size is not available, you can set it accordingly
                };
    
                setImages((prevImages) => [...prevImages, newImage]);
                setPreviewImages((prevImages) => [...prevImages, newImage]);
            }
        }
        // Removed `images` from dependency array to prevent re-renders
    }, [editMode, categoryData]);    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Create a FormData object and append necessary data
        const data = new FormData();
        images.forEach((image) => {
            data.append('UploadCategoryImages', image.file);
        });
        data.append('TenantID', 1);
        data.append('CategoryName', formData.category);
        data.append('CategoryDescription', formData.description);
        data.append('CreatedBy',"Admin");
    
        // Log form data for debugging
        for (let [key, value] of data.entries()) {
            console.log(key, value);
        }
        const token = localStorage.getItem("token");
        try {
            const response = await fetch('https://electronic-ecommerce.onrender.com/api/categoryWithImages', {
                method: 'POST',
                body: data,
                Authorization: `Bearer ${token}`, 
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log('Response:', result);
    
                if (result.message === "Category created successfully!") {
                    toast.success(result.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
    
                    // Optionally reset the form data or images
                    setFormData({
                        category: '',
                        description: ''
                    });
                    setImages([]);
                    setPreviewImages([]);
                    setEditMode(false);
                } else {
                    toast.error("An unexpected error occurred. Please try again.", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            } else {
                console.error('Error:', response.statusText);
                toast.error("Failed to upload category. Please try again.", {
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
            console.error('Error:', error);
            toast.error("File upload failed. Please try again.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };    
const updateCategory = async () => {
    const token = localStorage.getItem("token");
    const apiUrl = `https://electronic-ecommerce.onrender.com/api/updateCategory/${categoryID}`;

    // Create a new FormData object
    const data = new FormData();

    // Append each image file to the FormData object
    images.forEach((image) => {
        data.append("UploadCategoryImages", image.file);
    });

    // Add other fields to FormData
    data.append("TenantID", "1");
    data.append("CategoryName", formData.category);
    data.append("CategoryDescription", formData.description);
    data.append("UpdatedBy", "Admin");

    // Log the form data entries (for debugging purposes)
    for (let pair of data.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
        const response = await fetch(apiUrl, {
            method: "PUT", // Assuming POST method for update; adjust to PUT if required
            body: data,
            Authorization: `Bearer ${token}`, 
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Category updated:", result);

        // Display success message from API response or a default message
        toast.success(result.message || "Category updated successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } catch (error) {
        console.error("Error updating category:", error);

        // Display a generic error message
        toast.error("Failed to update category. Please try again.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
};   
    const categori = [
        { id: 1, name: 'Electronics', image: 'https://via.placeholder.com/50', description: 'Various electronic gadgets and devices.' },
        { id: 2, name: 'Clothing', image: 'https://via.placeholder.com/50', description: 'Apparel including men and women clothing.' },
        { id: 3, name: 'Furniture', image: 'https://via.placeholder.com/50', description: 'Indoor and outdoor furniture for homes and offices.' },
        // Add more categories as needed
    ];


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [searchQuery, setSearchQuery] = useState("");
    const filteredCategories1 = categori.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCategories = filteredCategories1.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCategories1.length / itemsPerPage);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const openModal = (type, category) => {
        // Open modal logic for edit or delete actions
    };


    const handleEdit = (index) => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const isDuplicate = previewImages.some(
                    (image) => image.name === file.name && image !== previewImages[index]
                );

                if (isDuplicate) {
                    alert("Image already exists.");
                    return;
                }
                const updatedImages = [...previewImages];
                updatedImages[index] = {
                    file,
                    name: file.name,
                    date: new Date().toLocaleDateString(),
                    size: (file.size / 1024).toFixed(2) + " KB",
                };
                setPreviewImages(updatedImages);
            }
        };
        fileInput.click();
    };

    const openDeleteModal = (index) => {
        setImageToDelete(index);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        const updatedImages = previewImages.filter((_, i) => i !== imageToDelete);
        setPreviewImages(updatedImages);
        setImages(updatedImages);
        setIsModalOpen(false);
        setImageToDelete(null);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setImageToDelete(null);
    };

    return (
        <div>
            <div className="sm:w-full md:w-full flex flex-col lg:flex-row gap-6 p-8 ">
                <ToastContainer />
                <div className="bg-white shadow-lg rounded-lg p-8 w-full lg:w-1/2 mx-auto h-1/2">
                    <div className="space-y-6">
                        <label className="block text-sm font-medium text-gray-700 p-1">
                            Category
                        </label>
                        <input
                            name="category"
                            type="text"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            placeholder="Enter Category"
                        />
                        {errors.category && (
                            <p className="text-red-500 text-sm text-center mt-1">
                                {errors.category}
                            </p>
                        )}

                        <label className="block text-sm font-medium text-gray-700 p-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Add product description"
                            className="w-full border border-gray-300 rounded-md p-2"
                            rows="4"
                        ></textarea>
                        {errors.description && (
                            <p className="text-red-500 text-sm text-center mt-1">
                                {errors.description}
                            </p>
                        )}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold mb-4">Add Images</h2>
                            <div
                                className="border-dashed border-2 border-gray-300 p-6 text-center cursor-pointer"
                                onDrop={handleDrop}
                                onDragOver={(event) => event.preventDefault()}
                                onClick={() => document.getElementById("fileInput").click()}
                            >
                                <p>
                                    Drag and drop or <span className="text-purple-600">browse</span>
                                </p>
                                <input
                                    id="fileInput"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleBrowse}
                                    className="hidden"
                                />
                            </div>
                            <div className="space-y-4">
                                {previewImages.map((image, index) => (
                                    <ProductCard
                                        key={index}
                                        name={image.name}
                                        date={image.date}
                                        size={image.size}
                                        image={image.file}
                                        onEdit={() => handleEdit(index)}
                                        onDelete={() => openDeleteModal(index)}
                                    />
                                ))}
                            </div>

                            {/* Modal for Delete Confirmation */}
                            {isModalOpen && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                    <div className="bg-white p-6 rounded shadow-md w-80">
                                        <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
                                        <p>Are you sure you want to delete this image?</p>
                                        <div className="flex justify-end space-x-2 mt-4">
                                            <button onClick={closeModal} className="bg-gray-300 p-2 rounded">
                                                Cancel
                                            </button>
                                            <button
                                                onClick={confirmDelete}
                                                className="bg-red-500 text-white p-2 rounded"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Submit Button */}
                        <button
                            type="button"
                            className="w-full bg-blue-500 text-white p-2 rounded-md"
                            onClick={editMode ? updateCategory : handleSubmit} // Conditionally call updateCategory if in editMode
                        >
                            {editMode ? 'Update' : 'Submit'} {/* Change button text based on editMode */}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

