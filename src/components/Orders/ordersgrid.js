import React, { useEffect, useState,useContext } from 'react';
import { getOrderById, updateOrderItemStatus } from '../../Constants/apiRoutes';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Combobox } from '@headlessui/react';
import { HiChevronDown } from 'react-icons/hi'; // React Icon for dropdown
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash, FaTable } from "react-icons/fa";
import { LocationDataContext } from "../Context/DataContext";
import  StatusBadge from "./Statusbudbesmall"
const OrderDetailsScreen = () => {
    // Dummy dynamic data
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { orderId } = useParams();
    const [query, setQuery] = useState('');
    const { orderStatusData } = useContext(LocationDataContext);
    const fetchOrderData = async () => {
        try {
            const response = await axios.get(`${getOrderById}/${orderId}`);
            if (response.data.status === 'SUCCESS') {
                setOrderData(response.data.data);
                console.log("setOrderData", response.data.data);
            } else {
                setError('Failed to fetch order data.');
            }
        } catch (err) {
            setError('Failed to fetch order data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (orderId) {
            fetchOrderData();
        }
    }, [orderId]);
    const orderData1 = {
        orderId: "1",
        orderCreated: "1",
        status: "Delivered",
        customer: {
            name: "Shahnewaz Sakil",
            email: "support@mail.com",
            phone: "+9458 785 014",
            profileImage: "https://via.placeholder.com/48", // Dummy profile image
        },
        orderSummary: {
            orderDate: "04/05/2023",
            paymentMethod: "Online",
            paymentLogo: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Visa_Logo.png", // Visa logo
            shippingMethod: "Cash On Delivery",
        },
        deliveryAddress: {
            house: "7765 Spring Circle Chicago, IL 60621",
            street: "3169 Hamilton Drive",
            state: "Texas",
        },
    };
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [statusId, setStatusId] = useState("");
    const [remarks, setRemarks] = useState("");

    // Sample status options with ID and name
    const statusOptions = [
        { id: 1, name: "Pending" },
        { id: 2, name: "Processing" },
        { id: 3, name: "Shipped" },
        { id: 4, name: "Delivered" },
        { id: 5, name: "Canceled" },
    ];

    const openDialog = (item) => {
        setCurrentItem(item);
        const currentStatus = statusOptions.find(
            (option) => option.name === item?.orderItems?.orderHistory?.status
        );
        setStatusId(currentStatus?.id || 1); // Default to "Pending" ID
        setRemarks("");
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setCurrentItem(null);
        setStatusId("");
        setRemarks("");
    };

    const handleUpdate = async () => {
        const payload = {
            OrderItemID: currentItem?.orderItemId,
            StatusID: statusId,
            remarks,
        };

        try {
            const response = await fetch(`${updateOrderItemStatus}/${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                toast.success("Order item status updated successfully!");
                closeDialog();

                // Call the fetchOrderData function to reload the order data
                fetchOrderData();
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Failed to update order item status.");
            }
        } catch (error) {
            toast.error("An error occurred while updating the status.");
        }
    };
    const statuses = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];
    const [selectedStatus, setSelectedStatus] = useState(orderData?.status || 'N/A');
    const filteredStatuses =
        query === ''
            ? statuses
            : statuses.filter((status) =>
                status.toLowerCase().includes(query.toLowerCase())
            );
    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <ToastContainer />
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                    <div>
                        <h1 className="text-sm sm:text-lg font-semibold">
                            Order ID: {orderData?.orderId || 'N/A'}
                        </h1>
                        <p className="text-sm text-gray-500">
                            Order Created: {orderData?.orderDate
                                ? new Intl.DateTimeFormat('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    second: 'numeric',
                                }).format(new Date(orderData.orderDate))
                                : 'N/A'}
                        </p>

                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
                        <Combobox value={selectedStatus} onChange={setSelectedStatus}>
                            <div className="relative w-40 sm:w-32"> {/* Reduced width */}
                                <div className="relative">
                                    <Combobox.Input
                                        className="border border-gray-300 rounded-md px-1 py-2 text-sm focus:outline-none w-full pr-10"
                                        onChange={(event) => setQuery(event.target.value)}
                                        displayValue={(status) => status}
                                    />
                                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <HiChevronDown className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                    </Combobox.Button>
                                </div>
                                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg z-10">
                                     {orderStatusData.map((status) => (
                                        <Combobox.Option
                                            key={status.OrderStatus}
                                            value={status.OrderStatus}
                                            className={({ active }) =>
                                                `cursor-pointer select-none px-4 py-2 ${active ? 'bg-blue-500 text-white' : 'text-gray-900'}`
                                            }
                                        >
                                            {status.OrderStatus}
                                        </Combobox.Option>
                                    ))}
                                </Combobox.Options>
                            </div>
                        </Combobox>

                        <button className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-700 w-full sm:w-auto">
                            Save
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8">
                {/* Customer Details */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-sm font-semibold mb-4">Customer Details</h2>
                    <div className="space-y-2">
                        <div className="flex items-center flex-nowrap">
                            <p className="w-1/2 text-sm text-gray-600 font-medium truncate">Name</p>
                            <p className="w-6 text-center text-sm text-gray-600">:</p>
                            <p className="w-1/2 text-sm text-gray-800 truncate">
                                {orderData?.customerDetails?.name || 'N/A'}
                            </p>
                        </div>
                        <div className="flex items-center flex-nowrap">
                            <p className="w-1/2 text-sm text-gray-600 font-medium truncate">Email</p>
                            <p className="w-6 text-center text-sm text-gray-600">:</p>
                            <p className="w-1/2 text-sm text-gray-800 truncate">
                                {orderData?.customerDetails?.email || 'N/A'}
                            </p>
                        </div>
                        <div className="flex items-center flex-nowrap">
                            <p className="w-1/2 text-sm text-gray-600 font-medium truncate">Phone</p>
                            <p className="w-6 text-center text-sm text-gray-600">:</p>
                            <p className="w-1/2 text-sm text-gray-800 truncate">
                                {orderData?.customerDetails?.phoneNumber || 'N/A'}
                            </p>
                        </div>
                    </div>

                </div>

                {/* Order Summary */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-sm font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-2">
                        <div className="flex items-center flex-nowrap">
                            <p className="w-1/2 text-sm text-gray-600 font-medium truncate">
                                Order Date
                            </p>
                            <p className="w-6 text-center text-sm text-gray-600">:</p>
                            <p className="w-1/2 text-sm text-gray-800 truncate">
                                {orderData?.orderDate
                                    ? new Intl.DateTimeFormat('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                    }).format(new Date(orderData.orderDate))
                                    : 'N/A'}
                            </p>
                        </div>
                        <div className="flex items-center flex-nowrap">
                            <p className="w-1/2 text-sm text-gray-600 font-medium truncate">
                                Payment Method
                            </p>
                            <p className="w-6 text-center text-sm text-gray-600">:</p>
                            <div className="w-1/2 flex items-center truncate">
                                <span className="text-sm text-gray-800 truncate">
                                    {orderData1.orderSummary?.paymentMethod || "NA"}
                                </span>
                                {/* <img
                                    src={orderData1.orderSummary?.paymentLogo || "NA"}
                                    alt="Payment Logo"
                                    className="w-6 ml-2"
                                /> */}
                            </div>
                        </div>
                        <div className="flex items-center flex-nowrap">
                            <p className="w-1/2 text-sm text-gray-600 font-medium truncate">
                                Shipping Method
                            </p>
                            <p className="w-6 text-center text-sm text-gray-600">:</p>
                            <p className="w-1/2 text-sm text-gray-800 truncate">
                                {orderData1.orderSummary?.shippingMethod || "NA"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Deliver To */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-sm font-semibold mb-4">Deliver To</h2>
                    <div className="space-y-2">
                        <div className="flex items-center flex-nowrap">
                            <p className="w-1/2 text-sm text-gray-600 font-medium truncate">
                                House
                            </p>
                            <p className="w-6 text-center text-sm text-gray-600">:</p>
                            <p className="w-1/2 text-sm text-gray-800 truncate">
                                {orderData?.address?.addressLine1 || "Na"}
                            </p>
                        </div>
                        <div className="flex items-center flex-nowrap">
                            <p className="w-1/2 text-sm text-gray-600 font-medium truncate">
                                State
                            </p>
                            <p className="w-6 text-center text-sm text-gray-600">:</p>
                            <p className="w-1/2 text-sm text-gray-800 truncate">
                                {orderData?.address?.state || "Na"}
                            </p>
                        </div>
                        <div className="flex items-center flex-nowrap">
                            <p className="w-1/2 text-sm text-gray-600 font-medium truncate">
                                country
                            </p>
                            <p className="w-6 text-center text-sm text-gray-600">:</p>
                            <p className="w-1/2 text-sm text-gray-800 truncate">
                                {orderData?.address?.country || "Na"}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                {/* Left Column: Product Table Card */}
                <div className="w-full bg-white p-6 rounded-lg shadow-sm md:col-span-2">
                    <h2 className="text-sm font-semibold mb-4">Product Details</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-4 py-2 text-left text-sm text-gray-600">Product</th>
                                    <th className="px-4 py-2 text-left text-sm text-gray-600">Unit Price</th>
                                    <th className="px-4 py-2 text-left text-sm text-gray-600">Quantity</th>
                                    <th className="px-4 py-2 text-left text-sm text-gray-600">Total</th>
                                    <th className="px-4 py-2 text-left text-sm text-gray-600">Status</th>
                                    <th className="px-4 py-2 text-left text-sm text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderData?.orderItems?.length > 0 ? (
                                    orderData.orderItems.map((item) => (
                                        <tr key={item.orderItemId} className="border-b">
                                            <td className="px-4 py-2 text-sm text-gray-800 flex items-center">
                                                <img
                                                    src={item.product?.images[0] || 'https://via.placeholder.com/50'}
                                                    alt={item.product?.productName}
                                                    className="w-12 h-12 object-cover mr-2 rounded"
                                                />
                                                <span className="block truncate" title={item.product?.productName || 'N/A'}>
                                                    {item.product?.productName || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 text-sm text-gray-800">
                                                ₹{parseFloat(item.price || 0).toFixed(2)}
                                            </td>
                                            <td className="px-4 py-2 text-sm text-gray-800">
                                                {item.quantity || 0}
                                            </td>
                                            <td className="px-4 py-2 text-sm text-gray-800">
                                                ₹{(item.quantity * parseFloat(item.price || 0)).toFixed(2)}
                                            </td>
                                            <td className="px-4 py-2 text-sm text-gray-800">
                                            <StatusBadge status={item.product?.orderHistory?.status }/>
                                            </td>

                                            <td className="px-4 py-2 text-sm text-gray-800">
                                                <button
                                                    onClick={() => openDialog(item)}
                                                    className="button edit-button flex items-center space-x-1"
                                                >
                                                    <FaEdit aria-hidden="true" className="h-4 w-4" />
                                                    <span>Edit</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-4 py-2 text-center text-gray-500">
                                            No order items found.
                                        </td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>

                    {/* Dialog Box */}
                    {isDialogOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                                <h3 className="text-lg font-semibold mb-4">Edit Item</h3>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                    <select
                                        value={statusId}
                                        onChange={(e) => setStatusId(Number(e.target.value))}
                                        className="w-full border rounded p-2"
                                    >
                                        {orderStatusData.map((status) =>  (
                                            <option key={status.StatusID} value={status.StatusID}>
                                                {status.OrderStatus}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
                                    <input
                                        type="text"
                                        value={remarks}
                                        onChange={(e) => setRemarks(e.target.value)}
                                        className="w-full border rounded p-2"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        onClick={closeDialog}
                                        className="text-sm text-white bg-red-500 px-4 py-2 mr-2 rounded-lg shadow hover:bg-red-600 transition duration-200"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={handleUpdate}
                                        className="text-sm text-white bg-pacific-500 px-4 py-2 rounded-lg hover:bg-pacific-600"
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>



                {/* // Right Column: Order Price Card */}
                <div className="w-full bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-sm font-semibold mb-4">Order Price</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <p className="text-sm text-gray-600">Subtotal:</p>
                            <p className="text-sm text-gray-800">₹{orderData?.totalAmount || "NA"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-sm text-gray-600">Shipping cost:</p>
                            <p className="text-sm text-gray-800">₹{10.00}</p>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <p className="text-sm text-gray-600">Grand total:</p>
                            <p className="text-sm text-gray-800">₹{orderData?.totalAmount + 10.00 || "NA"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default OrderDetailsScreen;
