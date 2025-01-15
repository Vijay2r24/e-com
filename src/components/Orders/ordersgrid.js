import React from "react";

const OrderDetailsScreen = () => {
    // Dummy dynamic data
    const orderData = {
        orderId: "#26BC663E",
        orderCreated: "Jan 26, 2023 10:30 AM",
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
                        <h1 className="text-lg sm:text-xl font-semibold">
                            Order ID: {orderData.orderId}
                        </h1>
                        <p className="text-sm text-gray-500">
                            Order Created: {orderData.orderCreated}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
                        <select
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none w-full sm:w-auto"
                            defaultValue={orderData.status}
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
                    <h2 className="text-lg font-semibold mb-4">Customer Details</h2>
                    <div className="space-y-2">
                        <div className="flex items-center flex-nowrap">
                            <p className="w-1/2 text-sm text-gray-600 font-medium truncate">
                                Name
                            </p>
                            <p className="w-6 text-center text-sm text-gray-600">:</p>
                            <p className="w-1/2 text-sm text-gray-800 truncate">
                                {orderData.customer.name}
                            </p>
                        </div>
                        <div className="flex items-center flex-nowrap">
                            <p className="w-1/2 text-sm text-gray-600 font-medium truncate">
                                Email
                            </p>
                            <p className="w-6 text-center text-sm text-gray-600">:</p>
                            <p className="w-1/2 text-sm text-gray-800 truncate">
                                {orderData.customer.email}
                            </p>
                        </div>
                        <div className="flex items-center flex-nowrap">
                            <p className="w-1/2 text-sm text-gray-600 font-medium truncate">
                                Phone
                            </p>
                            <p className="w-6 text-center text-sm text-gray-600">:</p>
                            <p className="w-1/2 text-sm text-gray-800 truncate">
                                {orderData.customer.phone}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-2">
                        <div className="flex items-center flex-nowrap">
                            <p className="w-1/2 text-sm text-gray-600 font-medium truncate">
                                Order Date
                            </p>
                            <p className="w-6 text-center text-sm text-gray-600">:</p>
                            <p className="w-1/2 text-sm text-gray-800 truncate">
                                {orderData.orderSummary.orderDate}
                            </p>
                        </div>
                        <div className="flex items-center flex-nowrap">
                            <p className="w-1/2 text-sm text-gray-600 font-medium truncate">
                                Payment Method
                            </p>
                            <p className="w-6 text-center text-sm text-gray-600">:</p>
                            <div className="w-1/2 flex items-center truncate">
                                <span className="text-sm text-gray-800 truncate">
                                    {orderData.orderSummary.paymentMethod}
                                </span>
                                <img
                                    src={orderData.orderSummary.paymentLogo}
                                    alt="Payment Logo"
                                    className="w-6 ml-2"
                                />
                            </div>
                        </div>
                        <div className="flex items-center flex-nowrap">
                            <p className="w-1/2 text-sm text-gray-600 font-medium truncate">
                                Shipping Method
                            </p>
                            <p className="w-6 text-center text-sm text-gray-600">:</p>
                            <p className="w-1/2 text-sm text-gray-800 truncate">
                                {orderData.orderSummary.shippingMethod}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Deliver To */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">Deliver To</h2>
                    <div className="space-y-2">
                        <div className="flex items-center flex-nowrap">
                            <p className="w-1/2 text-sm text-gray-600 font-medium truncate">
                                House
                            </p>
                            <p className="w-6 text-center text-sm text-gray-600">:</p>
                            <p className="w-1/2 text-sm text-gray-800 truncate">
                                {orderData.deliveryAddress.house}
                            </p>
                        </div>
                        <div className="flex items-center flex-nowrap">
                            <p className="w-1/2 text-sm text-gray-600 font-medium truncate">
                                Street
                            </p>
                            <p className="w-6 text-center text-sm text-gray-600">:</p>
                            <p className="w-1/2 text-sm text-gray-800 truncate">
                                {orderData.deliveryAddress.street}
                            </p>
                        </div>
                        <div className="flex items-center flex-nowrap">
                            <p className="w-1/2 text-sm text-gray-600 font-medium truncate">
                                State
                            </p>
                            <p className="w-6 text-center text-sm text-gray-600">:</p>
                            <p className="w-1/2 text-sm text-gray-800 truncate">
                                {orderData.deliveryAddress.state}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                {/* Left Column: Product Table Card */}
                <div className="w-full bg-white p-6 rounded-lg shadow-sm md:col-span-2">
                    <h2 className="text-lg font-semibold mb-4">Product Details</h2>
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
                            <tr className="border-b">
                                <td className="px-4 py-2 text-sm text-gray-800">Whitetails Women's Open Sky</td>
                                <td className="px-4 py-2 text-sm text-gray-800">$171.00</td>
                                <td className="px-4 py-2 text-sm text-gray-800">37</td>
                                <td className="px-4 py-2 text-sm text-gray-800">$1200.33</td>
                            </tr>
                            <tr className="border-b">
                                <td className="px-4 py-2 text-sm text-gray-800">Red Bag for Kids</td>
                                <td className="px-4 py-2 text-sm text-gray-800">$15.00</td>
                                <td className="px-4 py-2 text-sm text-gray-800">10</td>
                                <td className="px-4 py-2 text-sm text-gray-800">$150.00</td>
                            </tr>
                            <tr className="border-b">
                                <td className="px-4 py-2 text-sm text-gray-800">Sports Shoe for Women</td>
                                <td className="px-4 py-2 text-sm text-gray-800">$145.00</td>
                                <td className="px-4 py-2 text-sm text-gray-800">20</td>
                                <td className="px-4 py-2 text-sm text-gray-800">$2900.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Right Column: Order Price Card */}
                <div className="w-full bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">Order Price</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <p className="text-sm text-gray-600">Subtotal:</p>
                            <p className="text-sm text-gray-800">$1200.33</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-sm text-gray-600">Shipping cost:</p>
                            <p className="text-sm text-gray-800">$49.55</p>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <p className="text-sm text-gray-600">Grand total:</p>
                            <p className="text-sm text-gray-800">$1310.55</p>
                        </div>
                    </div>
                </div>
            </div>





        </div>
    );
};

export default OrderDetailsScreen;
