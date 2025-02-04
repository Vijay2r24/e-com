// import React, { useState,useEffect } from "react";
// import axios from "axios";

// const ExpoSnackEmbed = () => {
//   const [componentName, setComponentName] = useState("");
//   const [jsonCode, setJsonCode] = useState("");
//   const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");


//     useEffect(() => {
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

//   const [jsonError, setJsonError] = useState("");

// const handleJsonChange = (e) => {
//   const value = e.target.value;
//   setJsonCode(value);
//   try {
//     JSON.parse(value);
//     setJsonError("");
//   } catch (error) {
//     setJsonError("Invalid JSON format.");
//   }
// };

//   // Handle the click event to show the popup
//   const handlePostJson = () => {
//     setShowPopup(true); // Show the popup with input fields
//   };


//   // Close popup handler
//   const closePopup = () => {
//     setShowPopup(false);
//     setComponentName("");
//     setJsonCode("");
//     setMessage("");
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//       // Validate and parse the JSON code
//       const parsedCode = JSON.parse(jsonCode.trim());
  
//       // Create the payload for the API
//       const payload = {
//         componentName,
//         componentCode: parsedCode,
//       };
  
//       // Make the API request
//       const response = await fetch(
//         "https://electronic-ecommerce.onrender.com/api/createdynamicui",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         }
//       );
  
//       const data = await response.json();
  
//       if (response.ok) {
//         alert(`Component created successfully with Device ID: ${data.deviceId}`);
//         closePopup();
//       } else {
//         alert(`Error: ${data.message}`);
//       }
//     } catch (error) {
//       // Handle JSON parsing errors
//       alert("Invalid JSON input. Please check your JSON code.");
//       console.error(error);
//     }
//   };
  
// //   return (

// // <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>

// //   {/* Expo Embed */}
// //   <div
// //     data-snack-id="@sravani-ch/textinput-example"
// //     data-snack-platform="web"
// //     data-snack-preview="true"
// //     data-snack-theme="light"
// //     style={{
// //       overflow: "hidden",
// //       background: "#fbfcfd",
// //       border: "1px solid var(--color-border)",
// //       borderRadius: "4px",
// //       height: "505px",
// //       width: "50%", // Occupies 50% of the space
// //     }}
// //   ></div>
// //    {/* Form */}
// //    <div className="w-full max-w-2xl mx-auto p-6" style={{ width: "50%" }}>
// //   <h1 className="mx-auto text-center font-bold text-2xl text-gray-700 mb-4">
// //   Posting Json Data
// // </h1>

// //     <form onSubmit={handleSubmit}>
// //       <div className="flex flex-col gap-5 mt-0">
// //         {/* Component Name Field */}
// //         <div className="flex gap-4 items-center">
// //           <label className="w-1/4 font-medium text-gray-700">Component Name:</label>
// //           <input
// //             type="text"
// //             value={componentName}
// //             onChange={(e) => setComponentName(e.target.value)}
// //             className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
// //             required
// //           />
// //         </div>

// //         {/* JSON Code Field */}
// //         <div className="flex gap-4 items-start">
// //           <label className="w-1/4 font-medium text-gray-700">JSON Code:</label>
// //           <textarea
// //             value={jsonCode}
// //             onChange={(e) => setJsonCode(e.target.value)}
// //             placeholder='Enter JSON code here (e.g., {"type": "container", "children": [...]})'
// //             className="flex-1 px-3 py-2 h-60 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
// //             required
// //           ></textarea>
// //         </div>

// //         {/* Submit Button */}
// //         <button
// //           type="submit"
// //           className="self-center px-20 py-2 bg-pacific-500 text-white text-lg font-semibold rounded-lg hover:bg-pacific-600 transition duration-300 disabled:opacity-50"
// //           disabled={loading}
// //         >
// //           {loading ? "Submitting..." : "Submit"}
// //         </button>

// //         {/* Message */}
// //         {message && (
// //           <p
// //             className={`text-center ${
// //               message.startsWith("Success") ? "text-green-500" : "text-red-500"
// //             }`}
// //           >
// //             {message}
// //           </p>
// //         )}
// //       </div>
// //     </form>
// //   </div>

// // </div>

// //   );
// return(
//   <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>

//   {/* Form */}
//   <div className="w-full max-w-2xl mx-auto p-6" style={{ width: "50%" }}>
//     <h1 className="mx-auto text-center font-bold text-2xl text-gray-700 mb-4">
//       Posting Json Data
//     </h1>

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
// </div>

// );
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
      // const parsedCode = JSON.parse(jsonCode.trim());
      const parsedCode = JSON.parse(jsonCode);
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
  const [components, setComponents] = useState([
    {
      id: 1,
      componentName: "Header",
      jsonData: '{"type": "header", "children": [{"type": "text", "content": "Welcome"}]}',
      isActive: true,
    },
    {
      id: 2,
      componentName: "Footer",
      jsonData: '{"type": "footer", "children": [{"type": "link", "href": "/home"}]}',
      isActive: false,
    },
    {
      id: 3,
      componentName: "Sidebar",
      jsonData: '{"type": "sidebar", "children": [{"type": "menu", "items": ["Home", "About"]}]}',
      isActive:false,
    },
  ]);

  const handleToggle = (id) => {
    setComponents((prev) =>
      prev.map((component) =>
        component.id === id
          ? { ...component, isActive: !component.isActive }
          : component
      )
    );
  };

  // Inline styles for the switch
  const switchStyles = {
    container: {
      position: "relative",
      display: "inline-block",
      width: "34px",
      height: "20px",
    },
    slider: {
      position: "absolute",
      cursor: "pointer",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "#ccc",
      transition: "0.4s",
      borderRadius: "34px",
    },
    sliderBefore: {
      position: "absolute",
      content: '""',
      height: "14px",
      width: "14px",
      left: "3px",
      bottom: "3px",
      backgroundColor: "white",
      transition: "0.4s",
      borderRadius: "50%",
    },
    sliderChecked: {
      backgroundColor: "#4caf50",
    },
    sliderBeforeChecked: {
      transform: "translateX(14px)",
    },
    hiddenInput: {
      opacity: 0,
      width: 0,
      height: 0,
    },
  };

  

return(
  <div>
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
<div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Components List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {components.map(({ id, componentName, jsonData, isActive }) => (
          <div
            key={id}
            className="p-4 border rounded-lg shadow-lg bg-white flex flex-col gap-4"
          >
            {/* Component Name */}
            <div>
              <span className="font-bold text-gray-700">Component Name:</span>{" "}
              {componentName}
            </div>

            {/* JSON Data with Vertical Scrolling */}
            <div>
              <span className="font-bold text-gray-700">JSON Data:</span>
              <pre
                className="p-2 bg-gray-100 rounded text-sm overflow-auto"
                style={{
                  maxHeight: "150px", // Set height for the JSON box
                  whiteSpace: "pre-wrap", // Wrap lines to avoid horizontal scrolling
                  overflowY: "scroll", // Enable vertical scrolling
                  overflowX: "hidden", // Disable horizontal scrolling
                }}
              >
                {jsonData}
              </pre>
            </div>

            {/* Active/Inactive Toggle */}
            <div className="flex items-center gap-4">
              <span className="font-bold text-gray-700">Status:</span>
              <div style={switchStyles.container}>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={() => handleToggle(id)}
                  style={switchStyles.hiddenInput}
                />
                <span
                  style={{
                    ...switchStyles.slider,
                    ...(isActive && switchStyles.sliderChecked),
                  }}
                >
                  <span
                    style={{
                      ...switchStyles.sliderBefore,
                      ...(isActive && switchStyles.sliderBeforeChecked),
                    }}
                  ></span>
                </span>
              </div>
              <span className={isActive ? "text-green-500" : "text-red-500"}>
                {isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
</div>
);
};

export default ExpoSnackEmbed;