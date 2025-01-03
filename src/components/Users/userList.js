import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaTh, FaTable } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import SearchBar from "../search_bar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEdit } from "react-icons/md";
import {getAllUsers,deleteUser} from "../../Constants/apiRoutes"
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
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [viewMode, setViewMode] = useState("table");
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(getAllUsers); // Replace with your API endpoint
        const data = await response.json();
        if (data.StatusCode === "SUCCESS") {
          setUsers(data.data.users);
        } else {
          console.error("Failed to fetch users:", data.message);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [refresh]);
  // Filter and Paginate Users
  const filteredUsers = users.filter((user) =>
    `${user.FirstName} ${user.LastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.Email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleEdit = (userId) => {
    navigate(`/UserAdd/${userId}`);
  };

  const handleDelete = async (userId) => {
    try {
        const response = await fetch(`${deleteUser}/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        
        if (response.ok) {
            console.log(`Category with ID ${userId} deleted successfully`);
            toast.success(result.message || "Brand deleted successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            // Optionally, refresh or update your data here
            setRefresh((prev) => !prev); 
        } else {
            console.log(`Failed to delete category with ID ${userId}`);
            toast.error(result.message || `Failed to delete category with ID ${userId}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        console.error('Error:', error);
        toast.error("An error occurred while deleting the category", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
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
                        src={user.ProfileImageUrl}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <span>{user.LastName} {user.FirstName}</span>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell>{user.Email}</StyledTableCell>
                  <StyledTableCell>{user.PhoneNumber}</StyledTableCell>
                  <StyledTableCell>{user.role}</StyledTableCell>
                  <StyledTableCell>{user.gender}</StyledTableCell>
                  <StyledTableCell>
                    <div className="flex justify-start space-x-2">
                      <button
                        onClick={() => handleEdit(user.UserID)}
                        className="button edit-button flex items-center space-x-1"
                      >
                        <AiOutlineEdit aria-hidden="true" className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(user.UserID)}
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
                src={user.ProfileImageUrl}
                alt={user.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-gray-100"
              />
              <h3 className="text-xl font-semibold text-gray-800">{user.FirstName}</h3>
              <p className="text-gray-600 font-medium text-sm">{user.Email}</p>
              <p className="text-gray-600 text-sm">{user.PhoneNumber}</p>
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
                      onClick={() => handleEdit(user.UserID)}
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
                      onClick={() => handleDelete(user.UserID)}
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

