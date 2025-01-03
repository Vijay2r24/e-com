import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash,FaTable } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import SearchBar from "../search_bar";
import { ToastContainer, toast } from "react-toastify";
import { MdEdit } from "react-icons/md";

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
  const [stores, setStores] = useState([
    {
      id: 1,
      storeName: "Store A",
      email: "storea@example.com",
      phone: "123-456-7890",
      address: "123 A Street, City, State, 12345",
    },
    {
      id: 2,
      storeName: "Store B",
      email: "storeb@example.com",
      phone: "987-654-3210",
      address: "456 B Avenue, City, State, 67890",
    },
    {
      id: 3,
      storeName: "Store C",
      email: "storec@example.com",
      phone: "555-555-5555",
      address: "789 C Road, City, State, 11223",
    },
  ]);

  const [viewMode, setViewMode] = useState("table");
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Filter and Paginate Stores
  const filteredStores = stores.filter((store) =>
    store.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.email.toLowerCase().includes(searchQuery.toLowerCase())
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
                <StyledTableRow key={store.id}>
                  <StyledTableCell>{store.storeName}</StyledTableCell>
                  <StyledTableCell>{store.email}</StyledTableCell>
                  <StyledTableCell>{store.phone}</StyledTableCell>
                  <StyledTableCell>{store.address}</StyledTableCell>
                  <StyledTableCell>
                    <div className="flex justify-start space-x-2">
                      <button
                        onClick={() => handleEdit(store.id)}
                        className="button edit-button flex items-center space-x-1"
                      >
                        <FaEdit aria-hidden="true" className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(store.id)}
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
                <h3 className="text-xl font-semibold text-gray-800">{store.storeName}</h3>
                <p className="text-gray-600 text-sm">{store.email}</p>
                <p className="text-gray-600 text-sm">{store.phone}</p>
                <p className="text-gray-600 text-sm">{store.address}</p>
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
