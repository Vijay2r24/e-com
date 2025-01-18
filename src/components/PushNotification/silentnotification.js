import React, { useState, useRef } from "react";
import { FiTrash, FiEye } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import { RiCloseLine } from 'react-icons/ri';
import { Editor } from "primereact/editor";
import pushnotification from '../../assets/images/icons8-push-notifications-48.png'
import { ImageAspectRatioOutlined } from "@mui/icons-material";
import pushNotification from "../../assets/image (4).png"
const AddProject = () => {
    const [formData1, setFormData1] = useState({
        projectName: "",
        description: "",
        imageFile: "",
        imagePreview: null,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData1((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Create a FormData object
        const formData = new FormData();
        formData.append('title', formData1.projectName);
        formData.append('body', formData1.description);
        formData.append('Notificationimage', formData1.imageFile);
        try {
            const response = await fetch('http://156.67.111.32:3050/api/sendnotifications', {
                method: 'POST',
                body: formData, // Pass FormData directly
            });
    
            if (response.ok) {
                toast.success('Notification sent successfully!');
            } else {
                toast.error('Error sending notification');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            toast.error('An error occurred while sending notification');
        }
    };    
    const validateForm = () => {
        const formErrors = {};
        if (!formData1.projectName.trim()) {
            formErrors.projectName = "Project Name is required.";
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData1((prevData) => ({
                    ...prevData,
                    imagePreview: reader.result,
                }));
            };
            reader.readAsDataURL(file);
            setFormData1((prevData) => ({ ...prevData, imageFile: file }));
        }
    };

    const clearImageInput = () => {
        setFormData1((prevData) => ({
            ...prevData,
            imageFile: null,
            imagePreview: null,
        }));
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };
    const handleDelete = () => {
        setFormData1((prevData) => ({
            ...prevData,
            imagePreview: null,
            imageFile: null,
        }));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleView = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="flex flex-col space-y-4 p-4 max-w-6xl mx-auto bg-white rounded-lg border border-gray-300 items-start">
            <ToastContainer />
            {/* {loading && <LoadingAnimation />} */}
            <div className="flex items-center mb-4">
                <img src={pushnotification} alt="Notification Icon" className="w-8 h-8 mr-2" />
                <h1 className="text-xl font-semibold text-gray-800">silent Notification </h1>
            </div>
            <div className="mt-8 w-full">
                <label className="block font-semibold mb-4 text-left">
                    Component Name <span className="text-red-500">*</span>:
                    <input
                        type="text"
                        name="projectName"
                        value={formData1.projectName}
                        onChange={handleInputChange}
                        className={`border p-2 rounded-md w-full mt-2 ${errors.projectName ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    <span className="text-red-500 text-sm">{errors.projectName}</span>
                </label>
                {/* Description */}
                <div>
                    <label className="block font-semibold mb-4 text-left">
                        json:
                    </label>
                    <textarea
                        name="description"
                        value={formData1.description}
                        onChange={(e) => handleInputChange(e)}
                        rows="5"
                        className="w-full p-2 border border-gray-300 rounded"
                        style={{ height: '130px' }}
                    />
                </div>
                {/* Upload Image */}
                {/* <div className="mb-4 flex flex-col items-start">
                    <label className="block font-semibold text-right mb-2">
                        Upload Image:
                    </label>
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                            ref={fileInputRef}
                        />
                        {formData1.imagePreview && (
                            <div className="relative w-24 h-24 z-28 group overflow-hidden border rounded-md mt-2">
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
                                        onClick={() => handleView()}
                                        className="text-white bg-blue-600 p-1 rounded-full"
                                    >
                                        <FiEye size={14} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div> */}


                {/* Modal to view image */}
                {/* {isModalOpen && (
                    <div className="fixed inset-0 flex items-center z-10 justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-4 rounded-md relative" style={{ width: '500px', height: '500px' }}>
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-2 right-2 flex items-center justify-center text-red-600 bg-red-50 rounded-md hover:bg-red-100 p-2"
                            >
                                <RiCloseLine size={18} />
                            </button>
                            <img
                                src={formData1.imagePreview}
                                // alt="Full View"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                )} */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`bg-green-500 text-white px-4 mt-4 ml-4 py-2 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    Send
                </button>


            </div>
        </div>

    );
};

export default AddProject;