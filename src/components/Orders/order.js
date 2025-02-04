import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper } from "@mui/material";
import { FaEye, FaTrash } from "react-icons/fa";
import SearchBar from "../search_bar";
import { useNavigate } from 'react-router-dom';
import { getAllOrders } from '../../Constants/apiRoutes'
import StatusBadge from "./Stusbudge";
import LoadingAnimation from "../../components/Loader/loader";
import {
  StyledTableCell,
  StyledTableRow,
  TablePaginationActions,
} from "../CustomTablePagination";

const OrderTable = () => {
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    fetch(getAllOrders, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass token in Authorization header
      },
    }) // Replace with your actual API URL
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setOrder(Array.isArray(data.data) ? data.data : []);
        setFilteredOrders(Array.isArray(data.data) ? data.data : []);
      })
      .catch((error) => console.error("Error fetching data:", error));
      setIsLoading(false);
  }, []);

  useEffect(() => {
    const filteredOrders = Array.isArray(order)
      ? order.filter((order) =>
        (order.orderId && order.orderId.toString().includes(searchQuery.toLowerCase())) ||
        (order.customer && `${order.customer.firstName} ${order.customer.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      : [];
    setFilteredOrders(filteredOrders);
  }, [searchQuery, order]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage + 1); // Convert zero-based index to one-based
  };

  const handleRowsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to the first page
  };

  const handleAddOrderClick = (orderId) => {
    navigate(`/ViewOrder/${orderId}`);
  };

  const openModal = (type, order) => {
    // Open modal logic
  };

  const closeModal = () => {
    // Close modal logic
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = Array.isArray(filteredOrders) ? filteredOrders.slice(indexOfFirstItem, indexOfLastItem) : [];

  return (
    <div className="overflow-x-auto">
      {/* Search Bar */}
      {isLoading && <LoadingAnimation />}
      <div className="flex items-center justify-between p-4">
        <SearchBar onSearch={setSearchQuery} />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Order Number</StyledTableCell>
              <StyledTableCell>Order Date</StyledTableCell>
              <StyledTableCell>Customer Info</StyledTableCell>
              <StyledTableCell>Delivery Info</StyledTableCell>
              <StyledTableCell align="center">Order Status</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentOrders.map((order) => (
              <StyledTableRow key={order.orderId}>
                <StyledTableCell>{order.orderId}</StyledTableCell>
                <StyledTableCell>{new Date(order.orderDate).toLocaleDateString()}</StyledTableCell>
                <StyledTableCell>
                  <div>
                    <div>
                      Name: <strong>{order.customer?.firstName || "Unknown"} {order.customer?.lastName || "Unknown"}</strong>
                    </div>
                    <div>Email: {order.customer?.email || "N/A"}</div>
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <div>
                    <div>Amount: &#8377;{parseFloat(order.totalAmount).toFixed(2)}</div>
                    <div>Created At: {new Date(order.createdAt).toLocaleDateString()}</div>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <StatusBadge
                   status={order.orderHistory?.length > 0
                      ? order.orderHistory
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0].status
                      : "Pending"}
                  />

                </StyledTableCell>
                <StyledTableCell align="center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleAddOrderClick(order.orderId)}
                      className="flex items-center text-blue-500 hover:text-blue-700 space-x-1"
                    >
                      <FaEye />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => openModal("delete", order)}
                      className="flex items-center text-red-500 hover:text-red-700 space-x-1"
                    >
                      <FaTrash />
                      <span>Delete</span>
                    </button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredOrders.length}
        rowsPerPage={itemsPerPage}
        page={currentPage - 1} // Convert one-based index to zero-based
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
};

export default OrderTable;
