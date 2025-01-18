import React, { useEffect, useState } from 'react';
import { getOrderById } from '../../Constants/apiRoutes';
import axios from 'axios';
import { useParams } from "react-router-dom";
const OrderDetailsScreen = () => {
    // Dummy dynamic data
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { orderId } = useParams();
    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                // Assuming you have an API function like this
                const response = await axios.get(`${getOrderById}/${orderId}`);
                if (response.data.status === 'SUCCESS') {
                    setOrderData(response.data.data); // Set the order data
                    console.log("setOrderData", response.data.data); // Log the updated data immediately
                } else {
                    setError('Failed to fetch order data.');
                }
            } catch (err) {
                setError('Failed to fetch order data.');
            } finally {
                setLoading(false);
            }
        };

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

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                    <div>
                        <h1 className="text-sm sm:text-lg font-semibold">
                            Order ID: {orderData?.orderId || 'N/A'}
                        </h1>
                        <p className="text-sm text-gray-500">
                            Order Created: {orderData?.orderDate || 'N/A'}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
                        <select
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none w-full sm:w-auto"
                            defaultValue={orderData?.status || 'N/A'}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
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
                                {orderData?.customer?.firstName || 'N/A'}
                            </p>
                        </div>
                        <div className="flex items-center flex-nowrap">
                            <p className="w-1/2 text-sm text-gray-600 font-medium truncate">Email</p>
                            <p className="w-6 text-center text-sm text-gray-600">:</p>
                            <p className="w-1/2 text-sm text-gray-800 truncate">
                                {orderData?.customer?.email || 'N/A'}
                            </p>
                        </div>
                        <div className="flex items-center flex-nowrap">
                            <p className="w-1/2 text-sm text-gray-600 font-medium truncate">Phone</p>
                            <p className="w-6 text-center text-sm text-gray-600">:</p>
                            <p className="w-1/2 text-sm text-gray-800 truncate">
                                {orderData1?.customer?.phone || 'N/A'}
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
                                {orderData?.orderDate || "NA"}
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
                                {orderData?.customer?.address?.addressLine2 || "Na"}
                            </p>
                        </div>
                        <div className="flex items-center flex-nowrap">
                            <p className="w-1/2 text-sm text-gray-600 font-medium truncate">
                                Street
                            </p>
                            <p className="w-6 text-center text-sm text-gray-600">:</p>
                            <p className="w-1/2 text-sm text-gray-800 truncate">
                                {orderData?.customer?.address?.addressLine1 || "Na"}
                            </p>
                        </div>
                        <div className="flex items-center flex-nowrap">
                            <p className="w-1/2 text-sm text-gray-600 font-medium truncate">
                                State
                            </p>
                            <p className="w-6 text-center text-sm text-gray-600">:</p>
                            <p className="w-1/2 text-sm text-gray-800 truncate">
                                {orderData?.customer?.address?.stateName || "Na"}
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
                                                    className="w-12 h-12 object-cover mr-2 rounded sm:w-16 sm:h-16 md:w-20 md:h-20"
                                                />
                                                <span className="hidden sm:block">{item.product?.productName || 'N/A'}</span>
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
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="px-4 py-2 text-sm text-gray-800" colSpan="4">
                                            No items found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
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
