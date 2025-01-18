import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash,FaTable } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import SearchBar from "../search_bar";
import { ToastContainer, toast } from "react-toastify";
import { MdEdit } from "react-icons/md";
import {getAllStores} from "../../Constants/apiRoutes";
import "react-toastify/dist/ReactToastify.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "../CustomTablePagination"; // Assuming you have custom pagination components

const UsersPage = () => {
  const [stores, setStores] = useState([]);
  const [viewMode, setViewMode] = useState("table");
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Fetch stores data
    const fetchStores = async () => {
      try {
        const response = await fetch(getAllStores);
        const data = await response.json();

        if (data.StatusCode === "SUCCESS") {
          setStores(data.Stores);
        } else {
          setError("Failed to fetch stores");
        }
      } catch (err) {
        setError("An error occurred while fetching stores");
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);
  // Filter and Paginate Stores
  const filteredStores = stores.filter((store) =>
    store.StoreName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.Email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredStores.length / itemsPerPage);
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStores = filteredStores.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleEdit = (storeId) => {
    navigate(`/StoreEdit/${storeId}`);
  };

  const handleDelete = (storeId) => {
    toast.success(`Store with ID ${storeId} deleted successfully!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setStores(stores.filter((store) => store.id !== storeId)); // Remove store from the state
  };

  return (
    <div className="overflow-x-auto">
      <ToastContainer />
      {/* Search Bar and Action Buttons */}
      <div className="flex items-center justify-between p-4 gap-4">
        <SearchBar onSearch={setSearchQuery} className="h-10" />
        <button
          onClick={() => navigate("/StoreAdd")}
          className="bg-pacific-500 text-white px-4 py-2 rounded hover:bg-pacific-600 whitespace-nowrap h-10"
        >
          + Add Store
        </button>
        <button
          onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
          className="bg-pacific-500 text-white px-4 py-2 rounded hover:bg-pacific-600 h-10"
        >
          {viewMode === "table" ? <FaTable /> : <FaTable />} {/* Icons for Grid and Table views */}
        </button>
      </div>

      {/* Conditional View Rendering */}
      {viewMode === "table" ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="store table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Stores</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Phone</StyledTableCell>
                <StyledTableCell>Address</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentStores.map((store) => (
                <StyledTableRow key={store.StoreID}>
                  <StyledTableCell>{store.StoreName}</StyledTableCell>
                  <StyledTableCell>{store.Email}</StyledTableCell>
                  <StyledTableCell>{store.Phone}</StyledTableCell>
                  <StyledTableCell>{store.AddressLine1}</StyledTableCell>
                  <StyledTableCell>
                    <div className="flex justify-start space-x-2">
                      <button
                        onClick={() => handleEdit(store.StoreID)}
                        className="button edit-button flex items-center space-x-1"
                      >
                        <FaEdit aria-hidden="true" className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(stores.StoreID)}
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
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {currentStores.map((store) => (
            <div key={store.id} className="bg-white rounded-lg p-6 border border-gray-200 relative">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800">{store.StoreName}</h3>
                <p className="text-gray-600 text-sm">{store.Email}</p>
                <p className="text-gray-600 text-sm">{store.Phone}</p>
                <p className="text-gray-600 text-sm">{store.AddressLine1}</p>
              </div>
              {/* Buttons: Positioned in the top-right corner, stacked vertically */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {/* Edit Button */}
                <div className="relative group flex items-center">
                  <span className="absolute left-[-45px] whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-200">
                    Edit
                  </span>
                  <button
                    onClick={() => handleEdit(store.id)}
                    className="p-2 bg-green-500 rounded-full text-white hover:bg-green-600 transition duration-200"
                  >
                    <MdEdit size={16} />
                  </button>
                </div>

                {/* Delete Button */}
                <div className="relative group flex items-center">
                  <span className="absolute left-[-55px] whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-200">
                    Delete
                  </span>
                  <button
                    onClick={() => handleDelete(store.id)}
                    className="p-2 bg-gray-300 rounded-full text-gray-800 hover:bg-red-400 hover:text-white transition duration-200"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        count={stores.length}
        rowsPerPage={itemsPerPage}
        page={currentPage}
        onPageChange={handlePageChange}
        component="div"
      />
    </div>
  );
};

export default UsersPage;
