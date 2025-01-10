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
        imageFile: {pushNotification},
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
    
        // Create the data object
        const data = {
            title: formData1.projectName,
            body: formData1.description,
            imageUrl: "https://www.b2yinfy.com/static/media/logoPinkTransperant.c6af2d1c926f2e4ba7f1.png",
        };
    
        try {
            const response = await fetch('https://electronic-ecommerce.onrender.com/api/sendnotifications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
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

    // const handleSubmit = () => {
    //     if (!validateForm()) return;
    //     setLoading(true);

    //     setTimeout(() => {
    //         toast.success("Project added successfully!");
    //         setFormData({
    //             projectName: "",
    //             isActive: false,
    //             imageFile: null,
    //             imagePreview: null,
    //         });
    //         clearImageInput();
    //         setLoading(false);
    //     }, 2000);
    // };
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
                <h1 className="text-xl font-semibold text-gray-800">Push Notification</h1>
            </div>
            <div className="mt-8 w-full">
                <label className="block font-semibold mb-4 text-left">
                    Title <span className="text-red-500">*</span>:
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
                        Message:
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
