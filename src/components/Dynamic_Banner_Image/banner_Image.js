// import React, { useState } from "react";
// import axios from "axios";
// import { FiTrash, FiEye, FiUpload } from "react-icons/fi";

// const BannerForm = () => {
//   const [formData, setFormData] = useState({
//     bannerPreview: null,
//     bannerFile: null,
//   });
//   const [bannerName, setBannerName] = useState("");
//   const [tenantID, setTenantID] = useState(1); // Default TenantID
//   const [loading, setLoading] = useState(false);

//   const handleBannerUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setFormData((prevData) => ({
//           ...prevData,
//           bannerPreview: reader.result,
//           bannerFile: file,
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleView = () => {
//     console.log("Viewing banner preview:", formData.bannerPreview);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // if (!bannerName || !formData.bannerFile) {
//     //   alert("Please fill in all fields!");
//     //   return;
//     // }

//     const formDataToSend = new FormData();
//     formDataToSend.append("TenantID", tenantID);
//     formDataToSend.append("BannerName", bannerName);
//     formDataToSend.append("BannerImage", formData.bannerFile);

//     try {
//       setLoading(true);
//       const response = await axios.post(
//         "https://electronic-ecommerce.onrender.com/api/banners",
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (response.status === 200) {
//         // alert("Banner uploaded successfully!");
//         setBannerName("");
//         setFormData({
//           bannerPreview: null,
//           bannerFile: null,
//         });
//       } else {
//         // alert("Failed to upload banner. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error uploading banner:", error);
//       // alert("An error occurred while uploading the banner.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-[600px] mt-10 p-6 ml-20">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload Banner</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4 flex items-center">
//           {/* <label
//             htmlFor="bannerName"
//             className="text-sm font-medium text-gray-700 mr-4 w-1/4"
//           >
//             Banner Name
//           </label> */}
//              <label 
//                 htmlFor="bannerName"
//              className="block font-semibold text-center mr-12 whitespace-nowrap">
//              Banner Name:
//           </label>
//           <input
//             type="text"
//             id="bannerName"
//             value={bannerName}
//             onChange={(e) => setBannerName(e.target.value)}
//             className="flex-1 px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter banner name"
//             required
//           />
//         </div>

//         {/* <div className="mb-4 flex items-center">
//           <label
//             htmlFor="tenantID"
//             className="text-sm font-medium text-gray-700 mr-4 w-1/4"
//           >
//             Tenant ID
//           </label>
//           <input
//             type="number"
//             id="tenantID"
//             value={tenantID}
//             onChange={(e) => setTenantID(e.target.value)}
//             className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter Tenant ID"
//             required
//           />
//         </div> */}

//         <div className="flex items-center space-x-10">
//           <label className="block font-semibold text-center whitespace-nowrap">
//             Upload Banner:
//           </label>
//           <div className="flex-shrink-0 w-[400px] mb-10">
//             <label
//               htmlFor="bannerUpload"
//               className={`rounded-lg flex items-center justify-center cursor-pointer ${
//                 formData.bannerPreview
//                   ? "p-0 border-none"
//                   : "border-dashed border-2 border-gray-300 p-4"
//               }`}
//             >
//               {formData.bannerPreview ? (
//                 <div className="relative w-full h-[250px] z-28 group overflow-hidden border rounded-md">
//                   <img
//                     src={formData.bannerPreview}
//                     alt="Banner Preview"
//                     className="object-contain w-full h-full"
//                   />
//                   <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100">
//                     <button
//                       onClick={() =>
//                         setFormData({
//                           bannerPreview: null,
//                           bannerFile: null,
//                         })
//                       }
//                       className="text-white bg-red-600 p-1 rounded-full mr-2"
//                     >
//                       <FiTrash size={14} title="Delete" />
//                     </button>
//                     <button
//                       onClick={handleView}
//                       className="text-white bg-blue-600 p-1 rounded-full"
//                     >
//                       <FiEye size={14} />
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center justify-center">
//                   <FiUpload size={30} className="text-gray-400 mb-2" />
//                   <p className="text-gray-700 text-sm">Upload Banner</p>
//                 </div>
//               )}
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleBannerUpload}
//               className="hidden"
//               id="bannerUpload"
//             />
//           </div>
//         </div>

//         <div className="flex justify-center">
//           <button
//             type="submit"
//             className="px-20 py-2 bg-pacific-500 text-white text-lg font-semibold rounded-lg hover:bg-pacific-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-pacific-500"
//             disabled={loading}
//           >
//             {loading ? "Uploading..." : "Submit"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default BannerForm;





// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { FiTrash, FiEye, FiUpload } from "react-icons/fi";
// import { MdOutlineCancel } from "react-icons/md";
// import { FaPlus } from "react-icons/fa";
// import { Combobox } from "@headlessui/react";
// import { FaChevronDown } from "react-icons/fa";
// import { getAllBrands } from '../../Constants/apiRoutes';

// const BannerForm = () => {
//   const { bannerID } = useParams(); // Get bannerID from URL
//   const [bannerName, setBannerName] = useState("");
//   const [tenantID] = useState(1); // Default TenantID
//   const [loading, setLoading] = useState(false);
//   const [isLoadingData, setIsLoadingData] = useState(false); // For initial data load
//   const [showInputField, setShowInputField] = useState(false);
//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//     const [brands, setBrands] = useState([]); // State to store brands
//   const [categories, setCategories] = useState([]); 
//   const [isAllSelected, setIsAllSelected] = useState(false);
  
//   const [refresh, setRefresh] = useState(false);

//   const [formData, setFormData] = useState({
//     BannerName: "",
//     TenantID: 1,
//     banners: [], 
//   });
//     const handleBannerUpload = (e) => {
//       const file = e.target.files[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setFormData((prev) => ({
//             ...prev,
//             banners: [
//               ...prev.banners,
//               {
//                 preview: reader.result,
//                 sequence: "", // Default sequence number
//                 file,
//                 BannerImage: file,  // Save file as BannerImage
//                 Brand: "", // You should populate Brand
//                 Category: "", // You should populate Category
//               },
//             ],
//           }));
//         };
//         reader.readAsDataURL(file); // Generates the preview
//       }
//     };
    
    
//     useEffect(() => {
//       const fetchBannerDetails = async () => {
//         if (!bannerID) return;
  
//         setIsLoadingData(true);
//         try {
//           const response = await axios.get(
//             `https://electronic-ecommerce.onrender.com/api/banners/${bannerID}`
//           );
  
//           if (response.status === 200) {
//             const banner = response.data.data; // Assuming API returns the banner details
//             setBannerName(banner.BannerName);
//             setFormData((prevData) => ({
//               ...prevData,
//               bannerPreview: banner.BannerImage, // Assuming this is the image URL
//             }));
//           } else {
//             alert("Failed to load banner details.");
//           }
//         } catch (error) {
//           console.error("Error fetching banner details:", error);
//           alert("An error occurred while fetching banner details.");
//         } finally {
//           setIsLoadingData(false);
//         }
//       };
  
//       fetchBannerDetails();
//     }, [bannerID]);
    
//     const handleSubmit = async (e) => {
//       e.preventDefault();
    
//       try {
//         // Create FormData instance
//         const formDataToSend = new FormData();
  
// // Prepare JSON payload
// const jsonPayload = {
//   TenantID: formData.TenantID,
//   BannerName: formData.BannerName || "Default Name",
//   Status: "Active",
//   BannerDetails: formData.banners.map((banner, index) => ({
//     // Filter out null values and join the remaining valid IDs
//     CategoryIDs: selectedCategories.length
//       ? selectedCategories
//           .filter((cat) => cat && cat.CategoryID) // Filter out null or undefined categories
//           .map((cat) => cat.CategoryID)
//       : [], // If no categories, use empty array

//     BrandIDs: selectedBrands.length
//       ? selectedBrands
//           .filter((brand) => brand && brand.BrandID) // Filter out null or undefined brands
//           .map((brand) => brand.BrandID)
//       : [], // If no brands, use empty array

//     Discount: banner.discount || "0%", // Default discount if missing
//     Price: banner.price || 0, // Default price if missing
//     Gender: banner.gender || "Unspecified", // Default gender if missing

//     BannerImages: [
//       {
//         Sequence: index + 1, // Assign sequence based on the index of the banner
//       },
//     ],
//   })),
// };

// console.log("JSON Payload to send:", JSON.stringify(jsonPayload, null, 2));
    
//         // Add JSON payload to FormData
//         formDataToSend.append("Data", JSON.stringify(jsonPayload));
    
//         // Append images
//         formData.banners.forEach((banner, index) => {
//           if (banner.BannerImage) {
//             formDataToSend.append(`image_${index}`, banner.BannerImage);
//           }
//         });
    
//         // Send the request
//         const response = await axios.post(
//           "https://electronic-ecommerce.onrender.com/api/banners",
//           formDataToSend,
//           {
//             headers: { "Content-Type": "multipart/form-data" },
//           }
//         );
    
//         console.log("Server response:", response.data);
//         alert("Form submitted successfully!");
//       } catch (error) {
//         if (error.response) {
//           console.error("Backend error:", error.response.data);
//         } else {
//           console.error("Error:", error.message);
//         }
//         alert("Error submitting the form!");
//       }
//     };
    
//      useEffect(() => {
//       const apiUrl =getAllBrands; // Replace with your API endpoint
  
//       const storedData = sessionStorage.getItem("brands");
//       if (storedData) {
//         setBrands(JSON.parse(storedData)); // Use stored data if available
//       } else {
//         fetch(apiUrl)
//           .then((response) => response.json())
//           .then((data) => {
//             if (data.status === "SUCCESS") {
//               setBrands(data.data); // Set fetched data to state
//               sessionStorage.setItem("brands", JSON.stringify(data.data)); // Cache in sessionStorage
//             } else {
//               console.error("Failed to fetch brands");
//             }
//           })
//           .catch((err) => console.error("Error:", err)); // Handle errors
//       }
//     }, [refresh]);
  
//     const handleBrandChange = (selectedId) => {
//       console.log("selectedId", selectedId);
    
//       // Check if we are dealing with the "select-all" action
//       if (selectedId === "select-all") {
//         // Toggle "Select All" functionality (select or deselect all)
//         if (isAllSelected) {
//           // If all brands are selected, deselect all
//           setSelectedBrands([]);  // Deselect all brands
//           setIsAllSelected(false); // Mark "Select All" as deselected
//         } else {
//           // If not all brands are selected, select all
//           setSelectedBrands(brands.map((brand) => brand.BrandID));  // Ensure only IDs are stored
//           setIsAllSelected(true); // Mark "Select All" as selected
//         }
//       } else {
//         // If an individual brand is selected or deselected
//         setSelectedBrands((prevSelectedBrands) => {
//           const updatedSelection = prevSelectedBrands.includes(selectedId)
//             ? prevSelectedBrands.filter((id) => id !== selectedId) // Remove selected brand ID
//             : [...prevSelectedBrands, selectedId]; // Add selected brand ID
    
//           // If any brand is deselected, uncheck "Select All"
//           // If all brands are selected, check "Select All"
//           setIsAllSelected(updatedSelection.length === brands.length); // Check if all brands are selected
    
//           return updatedSelection; // Return the updated list of selected brand IDs
//         });
//       }
//    };
//       useEffect(() => {
//     const fetchCategories = async () => {
//       const apiUrl = 'https://electronic-ecommerce.onrender.com/api/getAllCategories';
//       try {
//         const response = await fetch(apiUrl);
//         const data = await response.json();
//         if (data.statusCode === "SUCCESS") {
//           setCategories(data.Data);
//         } else {
//           console.error("Failed to fetch categories");
//         }
//       } catch (err) {
//         console.error("Error:", err);
//       }
//     };

//     fetchCategories();
//   }, []);

//     const handleCategoryChange = (category) => {
//     if (category === "select-all") {
//       if (selectedCategories.length === categories.length) {
//         setSelectedCategories([]);
//       } else {
//         setSelectedCategories(categories);
//       }
//     } else {
//       setSelectedCategories((prevSelected) => {
//         if (prevSelected.includes(category)) {
//           return prevSelected.filter((cat) => cat !== category);
//         } else {
//           return [...prevSelected, category];
//         }
//       });
//     }
//   };


//   const displayValue = () => {
//         if (isAllSelected) return "All Brands Selected"; // Display message when all brands are selected
//         if (selectedBrands.length === 0) return "Select a brand"; // Display message when no brands are selected
//         return brands
//           .filter((brand) => selectedBrands.includes(brand.BrandID))
//           .map((brand) => brand.BrandName)
//           .join(", "); // Display selected brand names
//       };
    

//   const displayCategoryValue = () => {
//     if (selectedCategories.length === 0) return "Select categories";
//     return selectedCategories.map((category) => category.CategoryName).join(", ");
//   };


 
//   return (
//     <div className="mt-10 p-6 ml-20">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//         {bannerID ? "Update Banner" : "Upload Banner"}
//       </h2>
//       {isLoadingData ? (
//         <p className="text-center">Loading banner details...</p>
//       ) : (
//         <form onSubmit={handleSubmit}>
         
// <div className="mb-4 flex items-center">
//   <label
//     htmlFor="bannerName"
//     className="block font-semibold text-center mr-12 whitespace-nowrap"
//   >
//     Banner Name:
//   </label>
//   <input
//     type="text"
//     id="bannerName"
//     value={formData.BannerName}  // Use formData.BannerName
//     onChange={(e) => setFormData(prev => ({
//       ...prev,
//       BannerName: e.target.value,  // Update formData.BannerName on input change
//     }))}
//     className="w-96 px-4 ml-10 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//     placeholder="Enter banner name"
//     required
//   />
// </div>


//   <div className="flex flex-col space-y-4">
//     {/* Label and Add Banner Button */}
//     <div className="flex items-center justify-between">
//       <label className="font-semibold">Upload Banners:</label>
//       <button
//         type="button"
//         className="action-button flex items-center space-x-2 px-4 py-2 bg-pacific-500 text-white rounded hover:bg-pacific-600"
//         onClick={() => setShowInputField(true)} // Show the input field when clicked
//       >
//         <FaPlus aria-hidden="true" className="icon" />
//         <span>Add Banner Image</span>
//       </button>
//     </div>

//     {/* Display Banners */}
//     {formData.banners?.map((banner, index) => (
//       <div
//         key={index}
//         className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 border p-4 rounded-md"
//       >
//         {/* Banner Preview */}
//         <div className="relative w-40 h-40 group overflow-hidden border rounded-md flex-shrink-0">
//           {banner.preview ? (
//             <img
//               src={banner.preview}
//               alt={`Banner Preview ${index + 1}`}
//               className="object-contain w-full h-full"
//             />
//           ) : (
//             <div className="flex items-center justify-center w-full h-full bg-gray-200">
//               <p className="text-gray-500">No Image</p>
//             </div>
//           )}
//         </div>

//         {/* Input Fields - Only show if an image is uploaded */}
//         {banner.preview && (
//           <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Sequence Number */}
//             <div>
//               <label className="block font-medium mb-1">Sequence Number:</label>
//               <input
//                 type="number"
//                 value={banner.sequence}
//                 onChange={(e) =>
//                   setFormData((prev) => {
//                     const updatedBanners = [...prev.banners];
//                     updatedBanners[index].sequence = e.target.value;
//                     return { ...prev, banners: updatedBanners };
//                   })
//                 }
//                 className="w-full border border-gray-300 rounded-md p-2"
//                 placeholder="Enter sequence number"
//               />
//             </div>

//               {/* Category Dropdown */}
//   <div className="mb-4">
//              <label className="block font-medium mb-1">Categories:</label>
// <Combobox value={selectedCategories} onChange={handleCategoryChange} multiple>
//   <div className="relative">
//     <Combobox.Input
//       className="w-full border border-gray-300 rounded-md p-2"
//       displayValue={(selectedCategories) => selectedCategories.map(category => category.CategoryName).join(', ')} // Join category names for display
//       placeholder="Select categories"
//       readOnly
//     />
//     <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
//       <FaChevronDown />
//     </Combobox.Button>
//     <Combobox.Options className="absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//       <Combobox.Option
//         value="select-all"
//         className={({ active }) =>
//           `cursor-pointer select-none relative py-2 pl-3 pr-9 ${active ? "bg-blue-500 text-white" : "text-gray-900"}`
//         }
//       >
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             checked={selectedCategories.length === categories.length}
//             onChange={() => handleCategoryChange("select-all")}
//             className="mr-2"
//           />
//           Select All
//         </div>
//       </Combobox.Option>
//       {categories.map((category) => (
//         <Combobox.Option
//           key={category.CategoryID}
//           value={category} // Keep the full object or just the ID if needed
//           className={({ active }) =>
//             `cursor-pointer select-none relative py-2 pl-3 pr-9 ${active ? "bg-blue-500 text-white" : "text-gray-900"}`
//           }
//         >
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               checked={selectedCategories.some(cat => cat.CategoryID === category.CategoryID)} // Check if this category is selected
//               onChange={() => handleCategoryChange(category)} // Pass category object or just the ID
//               className="mr-2"
//             />
//             {category.CategoryName}
//           </div>
//         </Combobox.Option>
//       ))}
//     </Combobox.Options>
//   </div>
// </Combobox>


//           </div>
//       <div className="w-full">
//   <label className="block font-medium mb-1">Brands:</label>
//   <Combobox value={selectedBrands} onChange={handleBrandChange} multiple>
//     <div className="relative">
//       <Combobox.Input
//         className="w-full border border-gray-300 rounded-md p-2"
//         displayValue={displayValue}
//         placeholder="Select a brand"
//         readOnly
//       />
//       <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
//         <FaChevronDown />
//       </Combobox.Button>
//       <Combobox.Options className="absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//         <Combobox.Option
//           value="select-all" // This is the "Select All" option
//           className={({ active }) =>
//             `cursor-pointer select-none relative py-2 pl-3 pr-9 ${active ? "bg-blue-500 text-white" : "text-gray-900"}`
//           }
//         >
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               checked={isAllSelected}
//               onChange={() => handleBrandChange("select-all")} // Handle "Select All"
//               className="mr-2"
//             />
//             Select All
//           </div>
//         </Combobox.Option>
//         {brands.map((brand) => (
//           <Combobox.Option
//             key={brand.BrandID}
//             value={brand.BrandID} // Individual brand ID
//             className={({ active }) =>
//               `cursor-pointer select-none relative py-2 pl-3 pr-9 ${active ? "bg-blue-500 text-white" : "text-gray-900"}`
//             }
//           >
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={selectedBrands.includes(brand.BrandID)} // Check if this brand is selected
//                 onChange={() => handleBrandChange(brand.BrandID)} // Handle individual brand selection
//                 className="mr-2"
//               />
//               {brand.BrandName}
//             </div>
//           </Combobox.Option>
//         ))}
//       </Combobox.Options>
//     </div>
//   </Combobox>

// </div>

//             {/* Gender */}
//             <div>
//               <label className="block font-medium mb-1">Gender:</label>
//               <select
//                 value={banner.gender || ""}
//                 onChange={(e) =>
//                   setFormData((prev) => {
//                     const updatedBanners = [...prev.banners];
//                     updatedBanners[index].gender = e.target.value;
//                     return { ...prev, banners: updatedBanners };
//                   })
//                 }
//                 className="w-full border border-gray-300 rounded-md p-2"
//               >
//                 <option value="" disabled>Select gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Unisex">Unisex</option>
//               </select>
//             </div>

//             {/* Discount Inputs */}
//             {/* <div className="flex items-center">
//               <label className="block font-medium mb-1">Discount:</label>
//               <div className="flex items-center">
              
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={banner.discountMin || ""}
//                     onChange={(e) => {
//                       const value = e.target.value.trim();
//                       setFormData((prev) => {
//                         const updatedBanners = [...prev.banners];
//                         updatedBanners[index].discountMin = value;
//                         return { ...prev, banners: updatedBanners };
//                       });
//                     }}
//                     className="w-40 border border-gray-300 rounded-md p-2 text-center pl-6"
//                     placeholder="Min"
//                   />
//                   <span className="absolute left-4 top-1/2 transform -translate-y-1/2 font-bold">&lt;</span>
//                 </div>

              
//                 <div className="relative ml-2">
//                   <input
//                     type="text"
//                     value={banner.discountMax || ""}
//                     onChange={(e) => {
//                       const value = e.target.value.trim();
//                       setFormData((prev) => {
//                         const updatedBanners = [...prev.banners];
//                         updatedBanners[index].discountMax = value;
//                         return { ...prev, banners: updatedBanners };
//                       });
//                     }}
//                     className="w-40 border border-gray-300 rounded-md p-2 text-center pl-6"
//                     placeholder="Max"
//                   />
//                   <span className="absolute left-4 top-1/2 transform -translate-y-1/2 font-bold">&gt;</span>
//                 </div>
//               </div>
//             </div> */}

// <div>
//          <label className="block font-medium mb-1">Discount:</label>
//          <input
//           type="number"
//           value={banner.discount || ""}
//           onChange={(e) =>
//             setFormData((prev) => {
//               const updatedBanners = [...prev.banners];
//               updatedBanners[index].discount = e.target.value;
//               return { ...prev, banners: updatedBanners };
//             })
//           }
//           className="w-full border border-gray-300 rounded-md p-2"
//           placeholder="Enter discount Percentage"
//         />
//       </div>

//             {/* Price */}
//             <div>
//               <label className="block font-medium mb-1">Price:</label>
//               <input
//                 type="number"
//                 value={banner.price || ""}
//                 onChange={(e) =>
//                   setFormData((prev) => {
//                     const updatedBanners = [...prev.banners];
//                     updatedBanners[index].price = e.target.value;
//                     return { ...prev, banners: updatedBanners };
//                   })
//                 }
//                 className="w-full border border-gray-300 rounded-md p-2"
//                 placeholder="Enter price"
//               />
//             </div>
// <div></div>
//             {/* Delete Button */}
//             <div>
//               <button
//                 onClick={() =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     banners: prev.banners.filter((_, i) => i !== index),
//                   }))
//                 }
//                 className="button delete-button flex items-center space-x-1 mt-6 ml-72"
//               >
//                 <MdOutlineCancel aria-hidden="true" className="h-4 w-4 font-small" />
//                 <span>Delete</span>
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     ))}

//     {/* Input Field for New Banner */}
//     {showInputField && (
//       <div className="flex flex-col space-y-2">
//         <label
//           htmlFor="bannerUpload"
//           className="flex items-center justify-center border-dashed border-2 border-gray-300 p-4 rounded-md cursor-pointer mb-6"
//         >
//           <FiUpload size={30} className="text-gray-400 mr-2" />
//           <span className="text-gray-700 text-sm">Choose Image</span>
//         </label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => {
//             handleBannerUpload(e); // Call the upload function
//             setShowInputField(false); // Hide the input field after uploading
//           }}
//           className="hidden"
//           id="bannerUpload"
//         />
//       </div>
//     )}
//   </div>


//           <div className="flex justify-center mt-6">
//             <button
//               type="submit"
//               className="px-20 py-2 bg-pacific-500 text-white text-lg font-semibold rounded-lg hover:bg-pacific-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-pacific-500"
//               disabled={loading}
//             >
//               {loading ? "Processing..." : bannerID ? "Update Banner" : "Submit"}
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default BannerForm;



import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FiTrash, FiEye, FiUpload } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { Combobox } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import { getAllBrands } from '../../Constants/apiRoutes';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { toast, ToastContainer } from 'react-toastify';
import {  getAllCategories,PostBanners } from "../../Constants/apiRoutes";
const BannerForm = () => {
  const { bannerID } = useParams(); // Get bannerID from URL
  const [bannerName, setBannerName] = useState("");
  const [tenantID] = useState(1); // Default TenantID
  const [loading, setLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false); // For initial data load
  const [showInputField, setShowInputField] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
    const [brands, setBrands] = useState([]); // State to store brands
  const [categories, setCategories] = useState([]); 
  const [isAllSelected, setIsAllSelected] = useState(false);
  
  const [refresh, setRefresh] = useState(false);

  const [formData, setFormData] = useState({
    BannerName: "",
    TenantID: 1,
    banners: [], 
  });
  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          banners: [
            ...prev.banners,
            {
              preview: reader.result,
              sequence: "", // Default sequence number
              file,
              BannerImage: file,  // Save file as BannerImage
              Brand: "", // Set empty Brand
              Category: "", // Set empty Category
              banners: [],
            },
          ],
        }));
  
        // Reset selected brands separately
        setSelectedBrands([]); 
        setSelectedCategories([]); 
      };
      reader.readAsDataURL(file); // Generates the preview
    }
  };
  
    
    
    useEffect(() => {
      const fetchBannerDetails = async () => {
        if (!bannerID) return;
  
        setIsLoadingData(true);
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `https://electronic-ecommerce.onrender.com/api/admin/banners/${bannerID}`, {
              headers: {
                Authorization: `Bearer ${token}`, // Pass token in Authorization header
              },
            }
          );
  
          if (response.status === 200) {
            const banner = response.data.data; // Assuming API returns the banner details
            setBannerName(banner.BannerName);
            setFormData((prevData) => ({
              ...prevData,
              bannerPreview: banner.BannerImage, // Assuming this is the image URL
            }));
          } else {
            alert("Failed to load banner details.");
          }
        } catch (error) {
          console.error("Error fetching banner details:", error);
          alert("An error occurred while fetching banner details.");
        } finally {
          setIsLoadingData(false);
        }
      };
  
      fetchBannerDetails();
    }, [bannerID]);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Create FormData instance
    const formDataToSend = new FormData();

    // Prepare JSON payload
    const jsonPayload = {
      TenantID: formData.TenantID,
      BannerName: formData.BannerName || "Default Name",
      Status: "Active",
      BannerDetails: formData.banners.map((banner, index) => ({
        CategoryIDs: selectedCategories.length
          ? selectedCategories
              .filter((cat) => cat && cat.CategoryID)
              .map((cat) => cat.CategoryID)
          : [],
        BrandIDs: selectedBrands.length ? selectedBrands : [], // Pass selected brands (multiple IDs)
        Discount: banner.discount || "0%",
        Price: banner.price || 0,
        Gender: banner.gender || "Unspecified",
        BannerImages: [
          {
            Sequence: index + 1,
          },
        ],
      })),
    };

    console.log("JSON Payload to send:", JSON.stringify(jsonPayload, null, 2));

    // Add JSON payload to FormData
    formDataToSend.append("Data", JSON.stringify(jsonPayload));
    console.log("formDataToSend", formDataToSend);

    // Append images
    formData.banners.forEach((banner, index) => {
      if (banner.BannerImage) {
        formDataToSend.append(`image_${index}`, banner.BannerImage);
      }
    });
    const token = localStorage.getItem("token");
    // Send the request
    const response = await axios.post(
      // "https://electronic-ecommerce.onrender.com/api/admin/banners",
      PostBanners,
      formDataToSend,{
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // Corrected comma placement
      },
    }
    );

    console.log("Server response:", response.data);
    toast.success("Banner submitted successfully!"); // Toast success message
  } catch (error) {
    if (error.response) {
      console.error("Backend error:", error.response.data);
      toast.error("Error submitting the form: " + error.response.data.message); // Toast error message
    } else {
      console.error("Error:", error.message);
      toast.error("Error submitting the form: " + error.message); // Toast error message
    }
  }
};

     useEffect(() => {
     
      const token = localStorage.getItem("token");
      const storedData = sessionStorage.getItem("brands");
      if (storedData) {
        setBrands(JSON.parse(storedData)); // Use stored data if available
      } else {
        fetch(getAllBrands, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in Authorization header
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "SUCCESS") {
              setBrands(data.data); // Set fetched data to state
              sessionStorage.setItem("brands", JSON.stringify(data.data)); // Cache in sessionStorage
            } else {
              console.error("Failed to fetch brands");
            }
          })
          .catch((err) => console.error("Error:", err)); // Handle errors
      }
    }, [refresh]);
 
  const handleBrandChange = (brand) => {
    if (brand === "select-all") {
      // If all brands are selected, deselect all
      if (selectedBrands.length === brands.length) {
        setSelectedBrands([]);
      } else {
        // Otherwise, select all brands
        setSelectedBrands(brands.map((brand) => brand.BrandID));  // Ensure only IDs are stored
      }
    } else {
      setSelectedBrands((prevSelected) => {
        // If the brand is already selected, remove it
        if (prevSelected.includes(brand.BrandID)) {
          return prevSelected.filter((id) => id !== brand.BrandID);
        } else {
          // Otherwise, add the brand to the selection
          return [...prevSelected, brand.BrandID];
        }
      });
    }
  };
      
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(getAllCategories, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in Authorization header
          },
        });
        const data = await response.json();
        if (data.statusCode === "SUCCESS") {
          setCategories(data.Data);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchCategories();
  }, []);

    const handleCategoryChange = (category) => {
    if (category === "select-all") {
      if (selectedCategories.length === categories.length) {
        setSelectedCategories([]);
      } else {
        setSelectedCategories(categories);
      }
    } else {
      setSelectedCategories((prevSelected) => {
        if (prevSelected.includes(category)) {
          return prevSelected.filter((cat) => cat !== category);
        } else {
          return [...prevSelected, category];
        }
      });
    }
  };

 
  return (
    <div className="mt-10 p-6 ml-20">
     <ToastContainer />
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {bannerID ? "Update Banner" : "Upload Banner"}
      </h2>
      {isLoadingData ? (
        <p className="text-center">Loading banner details...</p>
      ) : (
        <form onSubmit={handleSubmit}>
         
<div className="mb-4 flex items-center">
  <label
    htmlFor="bannerName"
    className="block font-semibold text-center mr-12 whitespace-nowrap"
  >
    Banner Name:
  </label>
  <input
    type="text"
    id="bannerName"
    value={formData.BannerName}  // Use formData.BannerName
    onChange={(e) => setFormData(prev => ({
      ...prev,
      BannerName: e.target.value,  // Update formData.BannerName on input change
    }))}
    className="w-96 px-4 ml-10 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="Enter banner name"
    required
  />
</div>


  <div className="flex flex-col space-y-4">
    {/* Label and Add Banner Button */}
    <div className="flex items-center justify-between">
      <label className="font-semibold">Upload Banners:</label>
      <button
        type="button"
        className="action-button flex items-center space-x-2 px-4 py-2 bg-pacific-500 text-white rounded hover:bg-pacific-600"
        onClick={() => setShowInputField(true)} // Show the input field when clicked
      >
        <FaPlus aria-hidden="true" className="icon" />
        <span>Add Banner Image</span>
      </button>
    </div>

    {/* Display Banners */}
    {formData.banners?.map((banner, index) => (
      <div
        key={index}
        className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 border p-4 rounded-md"
      >
        {/* Banner Preview */}
        <div className="relative w-40 h-40 group overflow-hidden border rounded-md flex-shrink-0">
          {banner.preview ? (
            <img
              src={banner.preview}
              alt={`Banner Preview ${index + 1}`}
              className="object-contain w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200">
              <p className="text-gray-500">No Image</p>
            </div>
          )}
        </div>

        {/* Input Fields - Only show if an image is uploaded */}
        {banner.preview && (
          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sequence Number */}
            <div>
              <label className="block font-medium mb-1">Sequence Number:</label>
              <input
                type="number"
                value={banner.sequence}
                onChange={(e) =>
                  setFormData((prev) => {
                    const updatedBanners = [...prev.banners];
                    updatedBanners[index].sequence = e.target.value;
                    return { ...prev, banners: updatedBanners };
                  })
                }
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter sequence number"
              />
            </div>

              {/* Category Dropdown */}

<div className="w-full mb-4">
  <label className="block text-sm font-semibold text-gray-700 mb-2">
    Categories
  </label>
  <Combobox value={selectedCategories} onChange={handleCategoryChange} multiple>
    <div className="relative">
      <Combobox.Input
        className="w-full rounded-md border bg-white py-2.5 pl-3 pr-10 text-gray-900 shadow-sm sm:text-sm"
        displayValue={(selectedCategories) =>
          selectedCategories.map((category) => category.CategoryName).join(', ')
        }
        placeholder="Select Categories"
        readOnly
      />
      <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </Combobox.Button>
      <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        <Combobox.Option
          value="select-all"
          className="group relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectedCategories.length === categories.length}
              onChange={() => handleCategoryChange('select-all')}
              className="mr-2"
            />
            <span className="block truncate">Select All</span>
          </div>
        </Combobox.Option>
        {categories.map((category) => (
          <Combobox.Option
            key={category.CategoryID}
            value={category}
            className="group relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedCategories.some(
                  (selected) => selected.CategoryID === category.CategoryID
                )}
                onChange={() => handleCategoryChange(category)}
                className="mr-2"
              />
              <span className="block truncate">{category.CategoryName}</span>
            </div>
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </div>
  </Combobox>
</div>

<div className="w-full mb-4">
  <label className="block text-sm font-semibold text-gray-700 mb-2">Brands</label>
  <Combobox value={selectedBrands} onChange={handleBrandChange} multiple>
    <div className="relative">
      <Combobox.Input
        className="w-full rounded-md border bg-white py-2.5 pl-3 pr-10 text-gray-900 shadow-sm sm:text-sm"
        displayValue={(selectedBrands) =>
          selectedBrands
            .map((brandId) => brands.find((b) => b.BrandID === brandId)?.BrandName)
            .join(', ') || "Select Brands"
        }
        placeholder="Select Brands"
        readOnly
      />
      <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </Combobox.Button>
      <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        <Combobox.Option
          value="select-all"
          className="group relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectedBrands.length === brands.length}
              onChange={() => handleBrandChange('select-all')}
              className="mr-2"
            />
            <span className="block truncate">Select All</span>
          </div>
        </Combobox.Option>
        {brands.map((brand) => (
          <Combobox.Option
            key={brand.BrandID}
            value={brand.BrandID}
            className="group relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand.BrandID)}
                onChange={() => handleBrandChange(brand.BrandID)}
                className="mr-2"
              />
              <span className="block truncate">{brand.BrandName}</span>
            </div>
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </div>
  </Combobox>
</div>


            {/* Gender */}
            <div className="w-full mb-4">
  <label className="block text-sm font-semibold text-gray-700 mb-2">
    Gender
  </label>
  <Combobox value={banner.gender} onChange={(value) =>
    setFormData((prev) => {
      const updatedBanners = [...prev.banners];
      updatedBanners[index].gender = value;
      return { ...prev, banners: updatedBanners };
    })
  }>
    <div className="relative">
      <Combobox.Input
        className="w-full rounded-md border bg-white py-2.5 pl-3 pr-10 text-gray-900 shadow-sm sm:text-sm"
        displayValue={(gender) => gender || "Select Gender"}
        placeholder="Select Gender"
        readOnly
      />
      <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </Combobox.Button>
      <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        {["Male", "Female", "Unisex"].map((genderOption) => (
          <Combobox.Option
            key={genderOption}
            value={genderOption}
            className="group relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
          >
            <span className="block truncate">{genderOption}</span>
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </div>
  </Combobox>
</div>

<div>
         <label className="block font-medium mb-1">Discount:</label>
         <input
          type="number"
          value={banner.discount || ""}
          onChange={(e) =>
            setFormData((prev) => {
              const updatedBanners = [...prev.banners];
              updatedBanners[index].discount = e.target.value;
              return { ...prev, banners: updatedBanners };
            })
          }
          className="w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter discount Percentage"
        />
      </div>

            {/* Price */}
            <div>
              <label className="block font-medium mb-1">Price:</label>
              <input
                type="number"
                value={banner.price || ""}
                onChange={(e) =>
                  setFormData((prev) => {
                    const updatedBanners = [...prev.banners];
                    updatedBanners[index].price = e.target.value;
                    return { ...prev, banners: updatedBanners };
                  })
                }
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter price"
              />
            </div>
<div></div>
            {/* Delete Button */}
            <div>
              <button
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    banners: prev.banners.filter((_, i) => i !== index),
                  }))
                }
                className="button delete-button flex items-center space-x-1 mt-6 ml-72"
              >
                <MdOutlineCancel aria-hidden="true" className="h-4 w-4 font-small" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        )}
      </div>
    ))}

    {/* Input Field for New Banner */}
    {showInputField && (
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="bannerUpload"
          className="flex items-center justify-center border-dashed border-2 border-gray-300 p-4 rounded-md cursor-pointer mb-6"
        >
          <FiUpload size={30} className="text-gray-400 mr-2" />
          <span className="text-gray-700 text-sm">Choose Image</span>
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            handleBannerUpload(e); // Call the upload function
            setShowInputField(false); // Hide the input field after uploading
          }}
          className="hidden"
          id="bannerUpload"
        />
      </div>
    )}
  </div>


          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-20 py-2 bg-pacific-500 text-white text-lg font-semibold rounded-lg hover:bg-pacific-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-pacific-500"
              disabled={loading}
            >
              {loading ? "Processing..." : bannerID ? "Update Banner" : "Submit"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BannerForm;
