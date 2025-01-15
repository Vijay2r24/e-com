
// import React, { useState } from "react";
// import { FiTrash, FiEye, FiUpload } from "react-icons/fi";

// const BannerForm = () => {
//   const [formData, setFormData] = useState({
//     logoPreview: null,
//     logoFile: null,
//     bannerPreview: null,
//     bannerFile: null,
//   });
//   const [bannerName, setBannerName] = useState("");
//   const [bannerFile, setBannerFile] = useState(null);

//   const handleFileChange = (e) => {
//     setBannerFile(e.target.files[0]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (bannerName && bannerFile) {
//       console.log("Banner Name:", bannerName);
//       console.log("Banner File:", bannerFile);
//     } else {
//       alert("Please fill in all fields!");
//     }
//   };
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
//   const handleView = (type) => {
//     if (type === "logo") {
//       console.log("Viewing logo preview:", formData.logoPreview);
//     } else if (type === "banner") {
//       console.log("Viewing banner preview:", formData.bannerPreview);
//     }
//   };

//   return (
//     <div className="w-[600px] mt-10 p-6 ml-20">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload Banner</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4 flex items-center">
//           <label
//             htmlFor="bannerName"
//             className="text-sm font-medium text-gray-700 mr-4 w-1/4"
//           >
//             Banner Name
//           </label>
//           <input
//             type="text"
//             id="bannerName"
//             value={bannerName}
//             onChange={(e) => setBannerName(e.target.value)}
//             className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter banner name"
//             required
//           />
//         </div>
//         <div className="flex items-center space-x-10">
//   {/* Label */}
//   <label className="block font-semibold text-center whitespace-nowrap">
//     Upload Banner:
//   </label>

//   {/* Input Field */}
//   <div className="flex-shrink-0 w-[400px] mb-10">
//     <label
//       htmlFor="bannerUpload"
//       className={`rounded-lg flex items-center justify-center cursor-pointer ${
//         formData.bannerPreview
//           ? "p-0 border-none"
//           : "border-dashed border-2 border-gray-300 p-4"
//       }`}
//     >
//       {formData.bannerPreview ? (
//         <div className="relative w-full h-[250px] z-28 group overflow-hidden border rounded-md">
//           {/* Image container */}
//           <img
//             src={formData.bannerPreview}
//             alt="Banner Preview"
//             className="object-contain w-full h-full"
//           />
//           <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100">
//             <button
//               onClick={() =>
//                 setFormData((prevData) => ({
//                   ...prevData,
//                   bannerPreview: null,
//                   bannerFile: null,
//                 }))
//               }
//               className="text-white bg-red-600 p-1 rounded-full mr-2"
//             >
//               <FiTrash size={14} title="Delete" />
//             </button>
//             <button
//               onClick={() => handleView("banner")}
//               className="text-white bg-blue-600 p-1 rounded-full"
//             >
//               <FiEye size={14} />
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="flex flex-col items-center justify-center">
//           <FiUpload size={30} className="text-gray-400 mb-2" />
//           <p className="text-gray-700 text-sm">Upload Banner</p>
//         </div>
//       )}
//     </label>
//     <input
//       type="file"
//       accept="image/*"
//       onChange={handleBannerUpload}
//       className="hidden"
//       id="bannerUpload"
//     />
//   </div>
// </div>


     
// <div className="flex justify-center">
//   <button
//     type="submit"
//     className="px-20 py-2 bg-pacific-500 text-white text-lg font-semibold rounded-lg hover:bg-pacific-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-pacific-500"
//   >
//     Submit
//   </button>
// </div>

//       </form>
//     </div>
//   );
// };

// export default BannerForm;


import React, { useState } from "react";
import axios from "axios";
import { FiTrash, FiEye, FiUpload } from "react-icons/fi";

const BannerForm = () => {
  const [formData, setFormData] = useState({
    bannerPreview: null,
    bannerFile: null,
  });
  const [bannerName, setBannerName] = useState("");
  const [tenantID, setTenantID] = useState(1); // Default TenantID
  const [loading, setLoading] = useState(false);

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevData) => ({
          ...prevData,
          bannerPreview: reader.result,
          bannerFile: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleView = () => {
    console.log("Viewing banner preview:", formData.bannerPreview);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!bannerName || !formData.bannerFile) {
    //   alert("Please fill in all fields!");
    //   return;
    // }

    const formDataToSend = new FormData();
    formDataToSend.append("TenantID", tenantID);
    formDataToSend.append("BannerName", bannerName);
    formDataToSend.append("BannerImage", formData.bannerFile);

    try {
      setLoading(true);
      const response = await axios.post(
        "https://electronic-ecommerce.onrender.com/api/banners",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        // alert("Banner uploaded successfully!");
        setBannerName("");
        setFormData({
          bannerPreview: null,
          bannerFile: null,
        });
      } else {
        // alert("Failed to upload banner. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading banner:", error);
      // alert("An error occurred while uploading the banner.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[600px] mt-10 p-6 ml-20">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload Banner</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex items-center">
          {/* <label
            htmlFor="bannerName"
            className="text-sm font-medium text-gray-700 mr-4 w-1/4"
          >
            Banner Name
          </label> */}
             <label 
                htmlFor="bannerName"
             className="block font-semibold text-center mr-12 whitespace-nowrap">
             Banner Name:
          </label>
          <input
            type="text"
            id="bannerName"
            value={bannerName}
            onChange={(e) => setBannerName(e.target.value)}
            className="flex-1 px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter banner name"
            required
          />
        </div>

        {/* <div className="mb-4 flex items-center">
          <label
            htmlFor="tenantID"
            className="text-sm font-medium text-gray-700 mr-4 w-1/4"
          >
            Tenant ID
          </label>
          <input
            type="number"
            id="tenantID"
            value={tenantID}
            onChange={(e) => setTenantID(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Tenant ID"
            required
          />
        </div> */}

        <div className="flex items-center space-x-10">
          <label className="block font-semibold text-center whitespace-nowrap">
            Upload Banner:
          </label>
          <div className="flex-shrink-0 w-[400px] mb-10">
            <label
              htmlFor="bannerUpload"
              className={`rounded-lg flex items-center justify-center cursor-pointer ${
                formData.bannerPreview
                  ? "p-0 border-none"
                  : "border-dashed border-2 border-gray-300 p-4"
              }`}
            >
              {formData.bannerPreview ? (
                <div className="relative w-full h-[250px] z-28 group overflow-hidden border rounded-md">
                  <img
                    src={formData.bannerPreview}
                    alt="Banner Preview"
                    className="object-contain w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() =>
                        setFormData({
                          bannerPreview: null,
                          bannerFile: null,
                        })
                      }
                      className="text-white bg-red-600 p-1 rounded-full mr-2"
                    >
                      <FiTrash size={14} title="Delete" />
                    </button>
                    <button
                      onClick={handleView}
                      className="text-white bg-blue-600 p-1 rounded-full"
                    >
                      <FiEye size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <FiUpload size={30} className="text-gray-400 mb-2" />
                  <p className="text-gray-700 text-sm">Upload Banner</p>
                </div>
              )}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleBannerUpload}
              className="hidden"
              id="bannerUpload"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-20 py-2 bg-pacific-500 text-white text-lg font-semibold rounded-lg hover:bg-pacific-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-pacific-500"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BannerForm;

