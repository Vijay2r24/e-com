import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import SearchBar from "../search_bar";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import { FaTh, FaTable } from 'react-icons/fa'; // Importing the icons
import 'react-toastify/dist/ReactToastify.css';
import { MdEdit } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
} from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
  TablePaginationActions,
} from "../CustomTablePagination";
import { routeNames } from "../../constants";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [viewMode, setViewMode] = useState("table"); // State for managing the view mode (grid or table)
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");

  const handleOrderUpdate = (ProductId) => {
    navigate(routeNames.products(ProductId));
  };

  const handleAddProductClick = () => {
    navigate(routeNames.newproducts); // Replace with your desired route
  };

  useEffect(() => {
    const filtered = products.filter((product) => {
      const brandName = product.brand?.brandName || ""; // Safely access brandName
      return (
        brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.productName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.MRP && product.MRP.toString().includes(searchQuery))
      );
    });
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "edit" or "delete"
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (type, product) => {
    setModalType(type);
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType("");
    setSelectedProduct(null);
  };

  const handleDelete = () => {
    console.log(`Deleting product: ${selectedProduct.name}`);
    closeModal();
  };

  useEffect(() => {
    const apiUrl = "https://electronic-ecommerce.onrender.com/api/getProductDetails";
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.statusCode === "SUCCESS") {
          setProducts(data.data);
        } else {
          console.error("Failed to fetch products:", data.message);
        }
      })
      .catch((err) => console.error("Error:", err));
  }, [refresh]);

  const deleteProduct = async (ProductID) => {
    try {
      const response = await fetch(`https://electronic-ecommerce.onrender.com/api/deleteProductWithImages/${ProductID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message || "Product deleted successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setRefresh(prev => !prev);  // Refresh the state or UI after deletion
      } else {
        toast.error(`Failed to delete product with ID ${ProductID}`, {
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
      toast.error("An error occurred while deleting the product", {
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

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="overflow-x-auto">
      <ToastContainer />
      <div className="flex items-center justify-between p-4 gap-4">
        <SearchBar onSearch={setSearchQuery} className="h-10" />
        <button
          onClick={handleAddProductClick}
          className="bg-pacific-500 text-white px-4 py-2 rounded hover:bg-pacific-600 whitespace-nowrap h-10"
        >
          + Add Product
        </button>
        <button
          onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
          className="bg-pacific-500 text-white px-4 py-2 rounded hover:bg-pacific-600 h-10"
        >
          {viewMode === "table" ? <FaTh /> : <FaTable />} {/* Icons for Grid and Table views */}
        </button>
      </div>
      {/* Conditionally render either table or grid view */}
      {viewMode === "table" ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="product table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Product ID</StyledTableCell>
                <StyledTableCell>Product Image</StyledTableCell>
                <StyledTableCell>Product Name</StyledTableCell>
                <StyledTableCell>MRP</StyledTableCell>
                <StyledTableCell>Brand Name</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentProducts.map((product) => {
                const firstImage = product.variants?.[0]?.images?.[0] || "";
                const brandName = product.brand?.brandName || "N/A";
                return (
                  <StyledTableRow key={product.productId}>
                    <StyledTableCell>{product.productId}</StyledTableCell>
                    <StyledTableCell className="flex justify-center">
                      {firstImage ? (
                        <img
                          src={firstImage}
                          alt={product.productName || "Product Image"}
                          className="w-10 h-10 rounded-md object-cover"
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </StyledTableCell>
                    <StyledTableCell>{product.productName}</StyledTableCell>
                    <StyledTableCell>{`${parseFloat(product.MRP).toFixed(2)}`}</StyledTableCell>
                    <StyledTableCell>{product.brandName}</StyledTableCell>
                    <StyledTableCell>
                      <div className="flex justify-start space-x-2">
                        <button
                          onClick={() => handleOrderUpdate(product.productId)}
                          className="button edit-button flex items-center space-x-1"
                        >
                          <AiOutlineEdit aria-hidden="true" className="h-4 w-4" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => deleteProduct(product.productId)}
                          className="button delete-button flex items-center space-x-1"
                        >
                          <MdOutlineCancel
                            aria-hidden="true"
                            className="h-4 w-4 font-small"
                          />
                          <span>Delete</span>
                        </button>
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <div
              key={product.productId}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              {/* Image Section */}
              <div className="relative">
                <img
                  src={product.variants?.[0]?.images?.[0] || ""}
                  alt={product.productName || "Product Image"}
                  className="w-full h-64 object-cover"
                />

                {/* Edit and Delete Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {/* Edit Button */}
                  <div className="relative group flex items-center">
                    <span className="absolute left-[-45px] whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-200">
                      Edit
                    </span>
                    <button
                      onClick={() => handleOrderUpdate(product.productId)}
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
                      onClick={() => deleteProduct(product.productId)}
                      className="p-2 bg-gray-300 rounded-full text-gray-800 hover:bg-red-400 hover:text-white transition duration-200"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="bg-gray-50 p-4 text-left">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.productName || "Product Name"}
                </h3>
                <p className="text-gray-600 font-medium mt-1 text-sm">
                  ₹{parseFloat(product.MRP || 0).toFixed(2)}
                </p>

              </div>

            </div>
          ))}
        </div>
      )}
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        count={filteredProducts.length}
        rowsPerPage={itemsPerPage}
        page={currentPage}
        onPageChange={handlePageChange}
        component="div"
      />
    </div>
  );
};

export default ProductTable;



