import React, { useState, useRef, useEffect } from "react";
import { FiTrash, FiEye } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import { RiCloseLine } from 'react-icons/ri';
import { Editor } from "primereact/editor";
import pushnotification from '../../assets/images/icons8-push-notifications-48.png'
import { ImageAspectRatioOutlined } from "@mui/icons-material";
import pushNotification from "../../assets/image (4).png";
import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper } from "@mui/material";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { Switch } from '@mui/material'; // Import the Switch component
import {
    StyledTableCell,
    StyledTableRow,
    TablePaginationActions,
} from "../CustomTablePagination";
import { Silent_Notification, getAllDynamicUI } from "../../Constants/apiRoutes"
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
    const [isEditing, setIsEditing] = useState(false); // Track if in edit mode
    const [editData, setEditData] = useState(null); // Track the data of the component being edited
    const handleToggleStatus = (componentId, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active'; // Toggle logic
        console.log(`Component ID: ${componentId}, Status changed to: ${newStatus}`);

        // Update your data state or make an API call to save the status change
        // setDummyData(prevData => prevData.map(item => item.componentId === componentId ? { ...item, status: newStatus } : item));
    };
      // Handle the toggle status change
   

    // Handle the edit button click
    const handleEditstatus = (componentId) => {
        setIsEditing(true);
        setEditData(dummyData.find(item => item.componentId === componentId)); // Set the item to edit
    };

    // Handle the save button click
    const handleSave = () => {
        setIsEditing(false);
        setEditData(null); // Reset editing data
        // You can add further logic to save changes (e.g., API call)
    };

    // Handle the cancel button click
    const handleCancel = () => {
        setIsEditing(false);
        setEditData(null); // Reset editing data
    };
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

        let parsedDataPayload;

        try {
            const token = localStorage.getItem("token");
            // Parse description to ensure it's a valid JSON object
            parsedDataPayload = JSON.parse(formData1.description);
        } catch (error) {
            console.error('Invalid JSON in description:', error);
            toast.error('Invalid JSON format in the description field');
            return;
        }

        const payload = {
            componentName: formData1.projectName, // Assign projectName to componentName
            dataPayload: parsedDataPayload,      // Use parsed description as dataPayload
        };

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(Silent_Notification, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json', // Specify JSON content type
                },
                body: JSON.stringify(payload), // Convert payload to JSON string
            });

            if (response.ok) {
                toast.success('Notification sent successfully!');
                setFormData1({
                    projectName: '', description: '', imageFile: "",
                    imagePreview: null,
                });
            } else {
                toast.error('Error sending notification');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            toast.error('An error occurred while sending notification');
        }
    };
    const handleEdit = () => {
    }
    const [dummyData, setDummyData] = useState([
        // Your data array here
        { componentId: 1, componentName: 'Component 1', description: 'Description 1', status: 'active' },
        { componentId: 2, componentName: 'Component 2', description: 'Description 2', status: 'inactive' }
    ]);
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
    const [options, setOptions] = useState([]);
    const [query, setQuery] = useState("");
    useEffect(() => {
        const fetchOptions = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(getAllDynamicUI, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Pass token in Authorization header
                    }
                });
                const data = await response.json();
                if (data.success) {
                    setOptions(data.data);
                } else {
                    console.error("Failed to fetch component names");
                }
            } catch (error) {
                console.error("Error fetching component names:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOptions();
    }, []);

    const filteredOptions =
        query === ""
            ? options
            : options.filter((option) =>
                option.ComponentName.toLowerCase().includes(query.toLowerCase())
            );
    return (
        <div>
            <div className="flex flex-col space-y-4 p-4 max-w-6xl mx-auto bg-white rounded-lg  items-start">
                <ToastContainer />
                {/* {loading && <LoadingAnimation />} */}
                <div className="flex items-center">
                    <img src={pushnotification} alt="Notification Icon" className="w-8 h-8 mr-2" />
                    <h1 className="text-xl font-semibold text-gray-800">silent Notification </h1>
                </div>
                <div className="mt-8 w-full">
                    <div className="block font-semibold mb-4 text-left">
                        <label>
                            Component Name <span className="text-red-500">*</span>:
                        </label>
                        <Combobox
                            value={formData1.projectName}
                            onChange={(value) =>
                                handleInputChange({ target: { name: "projectName", value } })
                            }
                        >
                            <div className="relative mt-2">
                                <div
                                    className={`relative w-full cursor-default overflow-hidden rounded-lg border text-left 
                  ${errors.projectName
                                            ? "border-red-500 focus-within:ring-2 focus-within:ring-red-500"
                                            : "border-gray-300 focus-within:ring-2 focus-within:ring-black"
                                        }`}
                                >
                                    <Combobox.Input
                                        className={`w-full border-none py-2.5 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none focus:ring-0`}
                                        onChange={(event) => setQuery(event.target.value)}
                                        placeholder="Search Component Name"
                                    />
                                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </Combobox.Button>
                                </div>
                                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {loading ? (
                                        <div className="px-4 py-2 text-gray-500">Loading...</div>
                                    ) : filteredOptions.length === 0 ? (
                                        <div className="px-4 py-2 text-gray-500">No results found</div>
                                    ) : (
                                        filteredOptions.map((option) => (
                                            <Combobox.Option
                                                key={option.ComponentID}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-teal-500 text-white" : "text-gray-900"
                                                    }`
                                                }
                                                value={option.ComponentName}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${selected ? "font-medium" : "font-normal"
                                                                }`}
                                                        >
                                                            {option.ComponentName}
                                                        </span>
                                                        {selected && (
                                                            <span
                                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-blue-500"
                                                                    }`}
                                                            >
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            </Combobox.Option>
                                        ))
                                    )}
                                </Combobox.Options>
                            </div>
                        </Combobox>

                        <span className="text-red-500 text-sm">{errors.projectName}</span>
                    </div>
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
                    <div className="flex justify-end">
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className={`bg-green-500 text-white px-4 mt-4 py-2 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>

            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="component table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Component ID</StyledTableCell>
                        <StyledTableCell>Component Name</StyledTableCell>
                        <StyledTableCell>Description</StyledTableCell>
                        <StyledTableCell>Status</StyledTableCell>
                        <StyledTableCell>Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dummyData.map((row) => (
                        <StyledTableRow key={row.componentId}>
                            <StyledTableCell>{row.componentId}</StyledTableCell>
                            <StyledTableCell>{row.componentName}</StyledTableCell>
                            <StyledTableCell>{row.description}</StyledTableCell>
                            <StyledTableCell>
                                {isEditing && editData && editData.componentId === row.componentId ? (
                                    <Switch
                                        checked={row.status === 'active'}
                                        onChange={() => handleToggleStatus(row.componentId, row.status)}
                                        color="primary"
                                    />
                                ) : (
                                    <span>{row.status}</span> // Display status when not editing
                                )}
                            </StyledTableCell>
                            <StyledTableCell>
                                <div className="flex justify-start space-x-2">
                                    {!isEditing || editData.componentId !== row.componentId ? (
                                        <button
                                            onClick={() => handleEditstatus(row.componentId)}
                                            className="button edit-button flex items-center space-x-1"
                                        >
                                            <AiOutlineEdit aria-hidden="true" className="h-4 w-4" />
                                            <span>Edit</span>
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                onClick={handleSave}
                                                className="button save-button flex items-center space-x-1"
                                            >
                                                <span>Save</span>
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className="button cancel-button flex items-center space-x-1"
                                            >
                                                <span>Cancel</span>
                                            </button>
                                        </>
                                    )}
                                    <button
                                        onClick={() => handleDelete(row.componentId)}
                                        className="button delete-button flex items-center space-x-1"
                                    >
                                        <MdOutlineCancel aria-hidden="true" className="h-4 w-4 font-small" />
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>



        </div>
    );
};

export default AddProject;