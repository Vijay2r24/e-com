// import React, { useEffect } from 'react';

// const ExpoSnackEmbed = () => {
//   useEffect(() => {
//     // Dynamically load the script if it is not already loaded
//     const script = document.createElement('script');
//     script.src = 'https://snack.expo.dev/embed.js';
//     script.async = true;
//     document.body.appendChild(script);

//     // Cleanup on unmount to avoid duplicate scripts
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return (
//     <div>
//       <div data-snack-id="@sravani-ch/textinput-example" data-snack-platform="web" data-snack-preview="true" data-snack-theme="light" 
//       style={{
//         overflow: 'hidden',
//         background: '#fbfcfd',
//         border: '1px solid var(--color-border)',
//         borderRadius: '4px',
//         height: '505px',
//         width: '100%',
//       }}
//       ></div>
     
//     </div>
//   );
// };

// export default ExpoSnackEmbed;
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ExpoSnackEmbed = () => {
//   const [componentName, setComponentName] = useState("");
//   const [jsonCode, setJsonCode] = useState("");

//   useEffect(() => {
//     // Dynamically load the Snack embed script
//     const script = document.createElement("script");
//     script.src = "https://snack.expo.dev/embed.js";
//     script.async = true;
//     document.body.appendChild(script);

//     // Cleanup script on component unmount
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         componentName,
//         jsonCode,
//       };

//       // Replace with your actual backend API endpoint
//       const apiUrl = "https://your-backend-api.com/postjson";
//       const response = await axios.post(apiUrl, payload);
//       console.log("Response:", response.data);

//       alert("Data submitted successfully!");
//     } catch (error) {
//       console.error("Error submitting data:", error);
//       alert("Failed to submit data. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
//         {/* Expo Embed */}
//         <div
//           data-snack-id="@sravani-ch/textinput-example"
//           data-snack-platform="web"
//           data-snack-preview="true"
//           data-snack-theme="light"
//           style={{
//             overflow: "hidden",
//             background: "#fbfcfd",
//             border: "1px solid var(--color-border)",
//             borderRadius: "4px",
//             height: "505px",
//             width: "90%", // Increased the width
//           }}
//         ></div>
  

//       </div>

//     {/* Form for Input Fields */}
// <div>
//   <form
//     onSubmit={handleSubmit}
//     style={{
//       display: "flex",
//       flexDirection: "column",
//       gap: "15px",
//     }}
//   >
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "row",
//         alignItems: "center",
//         gap: "10px",
//         width: "70%", // Decreased field width
//       }}
//     >
//       <label
//         style={{
//           flex: "0 0 30%", // Label takes 40% of the row width
//         }}
//       >
//         Component Name:
//       </label>
//       <input
//         type="text"
//         value={componentName}
//         onChange={(e) => setComponentName(e.target.value)}
//         style={{
//           flex: "1", // Input takes the remaining space
//           padding: "10px",
//           border: "1px solid #ccc",
//           borderRadius: "4px",
//         }}
//         placeholder="Enter component name"
//       />
//     </div>

//     {/* JSON Code Field */}
//     <div
//      style={{
//       display: "flex",
//       flexDirection: "row",
//       alignItems: "center",
//       gap: "10px",
//       width: "70%", // Decreased field width
//     }}
//     >
//       <label
//         style={{
//           flex: "0 0 30%", // Label takes 40% of the row width
//         }}
//       >
//         JSON Code:
//       </label>
//       <textarea
//         value={jsonCode}
//         onChange={(e) => setJsonCode(e.target.value)}
//         style={{
//           flex: "1", // Textarea takes the remaining space
//           padding: "10px",
//           border: "1px solid #ccc",
//           borderRadius: "4px",
//           height: "300px", // Adjusted height
//         }}
//         placeholder="Enter JSON code here"
//       ></textarea>
//     </div>

//     {/* Submit Button */}
//     <button
//       type="submit"
//       style={{
//         padding: "10px 30px", // Reduced button width
//         backgroundColor: "#007BFF",
//         color: "#fff",
//         border: "none",
//         borderRadius: "4px",
//         cursor: "pointer",
//         alignSelf: "center", // Center the button
//       }}
//     >
//       Submit
//     </button>

//   </form>
// </div>

//     </div>
//   );
// };

// export default ExpoSnackEmbed;

import React, { useState,useEffect } from "react";
import axios from "axios";

const ExpoSnackEmbed = () => {
  const [componentName, setComponentName] = useState("");
  const [jsonCode, setJsonCode] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


    useEffect(() => {
    // Dynamically load the Snack embed script
    const script = document.createElement("script");
    script.src = "https://snack.expo.dev/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const [jsonError, setJsonError] = useState("");

const handleJsonChange = (e) => {
  const value = e.target.value;
  setJsonCode(value);
  try {
    JSON.parse(value);
    setJsonError("");
  } catch (error) {
    setJsonError("Invalid JSON format.");
  }
};

  // Handle the click event to show the popup
  const handlePostJson = () => {
    setShowPopup(true); // Show the popup with input fields
  };


  // Close popup handler
  const closePopup = () => {
    setShowPopup(false);
    setComponentName("");
    setJsonCode("");
    setMessage("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Validate and parse the JSON code
      const parsedCode = JSON.parse(jsonCode.trim());
  
      // Create the payload for the API
      const payload = {
        componentName,
        componentCode: parsedCode,
      };
  
      // Make the API request
      const response = await fetch(
        "https://electronic-ecommerce.onrender.com/api/createdynamicui",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
  
      const data = await response.json();
  
      if (response.ok) {
        alert(`Component created successfully with Device ID: ${data.deviceId}`);
        closePopup();
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      // Handle JSON parsing errors
      alert("Invalid JSON input. Please check your JSON code.");
      console.error(error);
    }
  };
  
//   return (

// <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>

//   {/* Expo Embed */}
//   <div
//     data-snack-id="@sravani-ch/textinput-example"
//     data-snack-platform="web"
//     data-snack-preview="true"
//     data-snack-theme="light"
//     style={{
//       overflow: "hidden",
//       background: "#fbfcfd",
//       border: "1px solid var(--color-border)",
//       borderRadius: "4px",
//       height: "505px",
//       width: "50%", // Occupies 50% of the space
//     }}
//   ></div>
//    {/* Form */}
//    <div className="w-full max-w-2xl mx-auto p-6" style={{ width: "50%" }}>
//   <h1 className="mx-auto text-center font-bold text-2xl text-gray-700 mb-4">
//   Posting Json Data
// </h1>

//     <form onSubmit={handleSubmit}>
//       <div className="flex flex-col gap-5 mt-0">
//         {/* Component Name Field */}
//         <div className="flex gap-4 items-center">
//           <label className="w-1/4 font-medium text-gray-700">Component Name:</label>
//           <input
//             type="text"
//             value={componentName}
//             onChange={(e) => setComponentName(e.target.value)}
//             className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             required
//           />
//         </div>

//         {/* JSON Code Field */}
//         <div className="flex gap-4 items-start">
//           <label className="w-1/4 font-medium text-gray-700">JSON Code:</label>
//           <textarea
//             value={jsonCode}
//             onChange={(e) => setJsonCode(e.target.value)}
//             placeholder='Enter JSON code here (e.g., {"type": "container", "children": [...]})'
//             className="flex-1 px-3 py-2 h-60 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             required
//           ></textarea>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="self-center px-20 py-2 bg-pacific-500 text-white text-lg font-semibold rounded-lg hover:bg-pacific-600 transition duration-300 disabled:opacity-50"
//           disabled={loading}
//         >
//           {loading ? "Submitting..." : "Submit"}
//         </button>

//         {/* Message */}
//         {message && (
//           <p
//             className={`text-center ${
//               message.startsWith("Success") ? "text-green-500" : "text-red-500"
//             }`}
//           >
//             {message}
//           </p>
//         )}
//       </div>
//     </form>
//   </div>

// </div>

//   );
return(
  <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>

  {/* Form */}
  <div className="w-full max-w-2xl mx-auto p-6" style={{ width: "50%" }}>
    <h1 className="mx-auto text-center font-bold text-2xl text-gray-700 mb-4">
      Posting Json Data
    </h1>

    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5 mt-0">
        {/* Component Name Field */}
        <div className="flex gap-4 items-center">
          <label className="w-1/4 font-medium text-gray-700">Component Name:</label>
          <input
            type="text"
            value={componentName}
            onChange={(e) => setComponentName(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        {/* JSON Code Field */}
        <div className="flex gap-4 items-start">
          <label className="w-1/4 font-medium text-gray-700">JSON Code:</label>
          <textarea
            value={jsonCode}
            onChange={(e) => setJsonCode(e.target.value)}
            placeholder='Enter JSON code here (e.g., {"type": "container", "children": [...]})'
            className="flex-1 px-3 py-2 h-60 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="self-center px-20 py-2 bg-pacific-500 text-white text-lg font-semibold rounded-lg hover:bg-pacific-600 transition duration-300 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {/* Message */}
        {message && (
          <p
            className={`text-center ${
              message.startsWith("Success") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </form>
  </div>

  {/* Expo Embed */}
  <div
    data-snack-id="@sravani-ch/textinput-example"
    data-snack-platform="web"
    data-snack-preview="true"
    data-snack-theme="light"
    style={{
      overflow: "hidden",
      background: "#fbfcfd",
      border: "1px solid var(--color-border)",
      borderRadius: "4px",
      height: "505px",
      width: "50%", // Occupies 50% of the space
    }}
  ></div>
</div>

);
};

export default ExpoSnackEmbed;
