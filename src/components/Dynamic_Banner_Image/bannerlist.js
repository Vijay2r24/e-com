
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTable } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { Combobox } from "@headlessui/react";
// import Datepicker from "react-tailwindcss-datepicker";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { toast, ToastContainer } from 'react-toastify';
import { IoEllipsisHorizontalCircleSharp } from "react-icons/io5";
import 'react-toastify/dist/ReactToastify.css';
import { IoEllipsisVertical } from 'react-icons/io5'; // Add this import
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { GetAllBanners,UpdateBannerStatus} from "../../Constants/apiRoutes";

const ProjectTable = () => {

  const [page, setPage] = useState(0);
  const dropdownRef = useRef(null);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [value, setValue] = useState(null);
  const storesData = [{ StoreID: 1, StoreName: "Store 1" }, { StoreID: 2, StoreName: "Store 2" }];
  const stores = storesData;
  const searchName = "";
  const searchItems = (value) => console.log("Searching for:", value);
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [paginatedData, setPaginatedData] = useState([]);
  const navigate = useNavigate();
  const handleCreateProject = () => {
    navigate("/bannerform");
  };
  const handleExportOrder = () => alert("Export Order functionality not implemented.");
  const handleEditProject = (bannerID) => {
    navigate(`/bannerform/${bannerID}`)
  }
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update searchQuery state
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setActiveMenu(null); // Close the menu
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (bannerID) => {
    setActiveMenu(activeMenu === bannerID? null : bannerID);
  };
 // Fetch data from API
 useEffect(() => {
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        // "https://electronic-ecommerce.onrender.com/api/admin/getAllBanners"
        GetAllBanners, {
          headers: {
          Authorization: `Bearer ${token}`, // Pass token in Authorization header
        },
    });
      // Map the response to include isActive state based on 'Status' from the backend
      const bannersWithState = response.data.data.map((banner) => ({
        ...banner,
        isActive: banner.Status === "Active", // Set isActive based on the "Status"
      }));
      setProjects(bannersWithState);
    } catch (error) {
      console.error("Error fetching project data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProjects();
}, []);

  // Filter and paginate data based on search query and pagination
  useEffect(() => {
    // Filter projects based on the search query
    const filteredProjects = projects.filter((project) =>
      project.BannerName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Paginate the filtered projects
    const paginated = filteredProjects.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );

    setPaginatedData(paginated);
  }, [searchQuery, projects, page, rowsPerPage]);

  // Handle Delete (Placeholder function)
  const handleDeleteProject = (id) => {
    console.log(`Delete project with ID: ${id}`);
  };

  // Carousel settings
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleToggle = async (bannerId, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active"; // Toggle the status
  
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://156.67.111.32:3050/api/admin/updateBannerstatus/${bannerId}`, { status: newStatus }, // Send the new status as payload
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in Authorization header
            "Content-Type": "application/json", // Set correct content type
          },
      }  );
  
      // If successful, update the status in local state
      if (response.status === 200) {
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.BannerID === bannerId
              ? { ...project, Status: newStatus } // Update the status locally
              : project
          )
        );
        toast.success(`Banner status updated to ${newStatus}`); // Show success message
      } else {
        toast.error("Failed to update banner status");
      }
    } catch (error) {
      console.error("Error updating banner status:", error);
      toast.error("Failed to update banner status");
    }
  };
  

  return (
    <div ref={dropdownRef} className="main-container">
      <ToastContainer />
      <div className="body-container">
        <h2 className="heading">Banners</h2>

        <div className="flex justify-end">
          <ul>
            <li>
              <button
                type="button"
                className="action-button flex items-center space-x-2 px-4 py-2 bg-pacific-500 text-white rounded hover:bg-pacific-600"
                onClick={handleCreateProject}
              >
                <FaPlus aria-hidden="true" className="icon" />
                <span>Create Banner</span>
              </button>
            </li>
          </ul>
        </div>


      </div>
      <div className="flex flex-wrap justify-end gap-2 mt-2">
        {/* Container for centering search box */}
        <div className="flex justify-center items-center w-full mt-4">
          <div className="relative flex items-center">
            <label htmlFor="searchName" className="sr-only">
              Search
            </label>
            <input
              id="searchName"
              type="text"
              placeholder=" Search by   Banner Number / Banner Name "
              value={searchQuery}
              onChange={handleSearchChange}
              className="p-2 pr-10 border border-gray-400 rounded-md w-full sm:w-[400px] md:w-[500px] text-sm leading-6 h-[40px]"
            />
            <div className="absolute right-3 text-gray-500">
              <IoIosSearch />
            </div>
          </div>
        </div>
      </div>
     
<div>
<div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <div
          key={project.BannerID}
          className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col justify-between transition-transform transform hover:scale-105 h-full"
        >
          {/* Carousel Section */}
          <div className="relative">
            {project.BannerImages && project.BannerImages.length > 0 ? (
              <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={false}
                arrows={true}
              >
                {project.BannerImages.map((image) => (
                  <img
                    key={image.BannerImageID}
                    src={image.BannerImage}
                    alt={`Banner ${project.BannerName}`}
                    className="w-full h-48 object-cover"
                  />
                ))}
              </Carousel>
            ) : (
              <img
                src="/placeholder.jpg"
                alt="Placeholder"
                className="w-full h-48 object-cover"
              />
            )}

            {/* Dropdown Menu */}
            {activeMenu === project.BannerID && (
              <div className="absolute top-28 right-3 bg-white shadow-md rounded-md z-10">
                <ul className="text-sm text-gray-700">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => console.log("Edit:", project.BannerID)}
                  >
                    Edit
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => console.log("Delete:", project.BannerID)}
                  >
                    Delete
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-4 flex-grow">
            <div className="flex items-center justify-between">
              {/* Banner Name */}
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {project.BannerName || "Unnamed Banner"}
              </h3>
              {/* Dropdown Icon */}
              <button
                className="text-gray-500 text-2xl cursor-pointer focus:outline-none p-0"
                onClick={() => toggleMenu(project.BannerID)}
              >
                <IoEllipsisVertical className="h-5 w-5" />
              </button>
            </div>
            {/* Active/Inactive Toggle Switch */}

<div className="flex items-center gap-4 ml-52 -mt-6">
  {/* <span className="font-bold text-gray-700">Status:</span> */}
  <div
    onClick={() => handleToggle(project.BannerID, project.Status)}
    className={`relative w-14 h-6 rounded-full cursor-pointer transition ${
      project.Status === "Active" ? "bg-green-500" : "bg-red-500"
    }`}
  >
    <div
      className={`absolute top-1/2 left-1 transform -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
        project.Status === "Active" ? "translate-x-8" : "translate-x-0"
      }`}
    ></div>
  </div>
  <span className={project.Status === "Active" ? "text-green-500" : "text-red-500"}>
    {project.Status === "Active" ? "Active" : "Inactive"}
  </span>
</div>


          </div>
        </div>
      ))}
    </div>
      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          disabled={(page + 1) * rowsPerPage >= projects.length}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
      {/* Pagination */}
     
    </div>
  );
};

export default ProjectTable;


