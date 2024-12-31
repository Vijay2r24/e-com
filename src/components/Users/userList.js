import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaTh, FaTable } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import SearchBar from "../search_bar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEdit } from "react-icons/md";
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
  TablePaginationActions,
} from "../CustomTablePagination"; // Assuming you have custom pagination components

const UsersPage = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      mobile: "+1 234 567 890",
      role: "Admin",
      gender: "Male",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      mobile: "+1 234 567 891",
      role: "User",
      gender: "Female",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      mobile: "+1 234 567 892",
      role: "Moderator",
      gender: "Male",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      mobile: "+1 234 567 893",
      role: "User",
      gender: "Female",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
  ]);
  const [viewMode, setViewMode] = useState("table"); // Table or Grid View
  const [currentPage, setCurrentPage] = useState(0); // Pagination state
  const itemsPerPage = 10; // Number of items per page
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const navigate = useNavigate();

  // Pagination logic
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleEdit = (userId) => {
    // Redirect to user edit page (replace with actual edit URL)
    navigate(`/UserAdd/${userId}`);
  };

  const handleDelete = (userId) => {
    // Delete the user logic
    setUsers(users.filter((user) => user.id !== userId));
    toast.success("User deleted successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="overflow-x-auto">
      <ToastContainer />
      {/* Search Bar and Action Buttons */}
      <div className="flex items-center justify-between p-4 gap-4">
      <SearchBar onSearch={setSearchQuery} className="h-10" />
        <button
          onClick={() => navigate("/UserAdd")}
          className="bg-pacific-500 text-white px-4 py-2 rounded hover:bg-pacific-600 whitespace-nowrap h-10"
        >
          + Add User
        </button>
        <button
          onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
          className="bg-pacific-500 text-white px-4 py-2 rounded hover:bg-pacific-600 h-10"
        >
          {viewMode === "table" ? <FaTh /> : <FaTable />} {/* Icons for Grid and Table views */}
        </button>
      </div>

      {/* Conditional View Rendering */}
      {viewMode === "table" ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="user table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Mobile No</StyledTableCell>
                <StyledTableCell>Roles</StyledTableCell>
                <StyledTableCell>Gender</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentUsers.map((user) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <span>{user.name}</span>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell>{user.email}</StyledTableCell>
                  <StyledTableCell>{user.mobile}</StyledTableCell>
                  <StyledTableCell>{user.role}</StyledTableCell>
                  <StyledTableCell>{user.gender}</StyledTableCell>
                  <StyledTableCell>
                    <div className="flex justify-start space-x-2">
                      <button
                        onClick={() => handleEdit(user.id)}
                        className="button edit-button flex items-center space-x-1"
                      >
                        <AiOutlineEdit aria-hidden="true" className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
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
        {currentUsers.map((user) => (
          <div key={user.id} className="bg-white rounded-lg p-6 border border-gray-200 relative">
            <div className="text-center">
              <img
                src={user.image}
                alt={user.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-gray-100"
              />
              <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
              <p className="text-gray-600 font-medium text-sm">{user.email}</p>
              <p className="text-gray-600 text-sm">{user.mobile}</p>
              <p className="text-gray-600 text-sm">{user.role}</p>
              <p className="text-gray-600 text-sm">{user.gender}</p>
            </div>
      
            {/* Buttons: Positioned in the top-right corner, stacked vertically */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {/* Edit Button */}
                  <div className="relative group flex items-center">
                    <span className="absolute left-[-45px] whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-200">
                      Edit
                    </span>
                    <button
                      onClick={() => handleEdit(user.id)}
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
                      onClick={() => handleDelete(user.id)}
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
        count={users.length}
        rowsPerPage={itemsPerPage}
        page={currentPage}
        onPageChange={handlePageChange}
        component="div"
      />
    </div>
  );
};

export default UsersPage;

