
import React, { useState, useContext, useEffect } from 'react';
import cloudeUploade from "../../assets/images/icons8-upload-to-cloud.gif"
import { FiTrash, FiEye } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";
import { CategoriesContext } from '../Context/CategoriesContext'
import { Combobox } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi"; // Import an icon for the dropdown symbol
import { BrandsContext } from '../Context/BrandsContext';
import { DataContext } from '../Context/SizeContext';
import { createproductWithImages } from '../../Constants/apiRoutes'
import { ColorContext } from '../Context/ColorContext';
import Blueshirt from '../../assets/images/no_Image.jpeg';
import { ProductTypesContext } from '../Context/AllProductTypesContext';
import { toast, ToastContainer } from 'react-toastify';
import { Navigate, useParams } from "react-router-dom";
import axios from 'axios';
import { Editor } from "primereact/editor";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";
import { Warning as WarningIcon } from "@mui/icons-material";
import LoadingAnimation from '../Loader/loader';
import { useNavigate } from "react-router-dom";
const AddProductPhoto = () => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedColourID, setSelectedColourID] = useState(null);
  const { categories, fetchAndStoreCategories } = useContext(CategoriesContext)
  const { brands, fetchAndStoreBrands } = useContext(BrandsContext);
  const { data } = useContext(DataContext);// Access the sizes data from context
  const { colors } = useContext(ColorContext);
  const { productTypes, fetchAndStoreProductTypes } = useContext(ProductTypesContext);
  const { ProductId } = useParams();
  const [productData, setProductData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Log the data when it changes
    console.log("Data from DataContext:", ProductId);
  }, [ProductId]); // Dependency array ensures the effect runs when 'data' changes

  useEffect(() => {
    // Log the colors when they change
    console.log("Colors from ColorContext:", colors);
  }, [colors]); // Dependency array ensures the effect runs when 'colors' changes
  const sizes = ["S", "M", "XL", "XXL"];
  const [formData, setFormData] = useState({
    images: [], // Array to store images with preview
    categoryID: "",
    categoryName: "",
    brandID: "",
    brandName: "",
    sizeID: "",
    colorID: "",
    productTypeID: "",
    productName: "",
    productTypeName: "",
    description: "",
    gender: "",
    selectedColorID: null,
    colorData: {
      Colors: [],
      assignedIndex: null
    },
    selectedColorID: null,
    mrp: '',
    tax: '',
    discount: '',
  });
  const actualPrice = formData.mrp - (formData.mrp * formData.discount) / 100;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [errors, setErrors] = useState({});
  const handleUpload = (event) => {
    const files = Array.from(event.target.files);

    if (!formData.selectedColorID) {
      setDialogContent("Please select a variant before uploading images.");
      setIsDialogOpen(true);
      return;
    }

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file), // Generate preview URL
      colorID: formData.selectedColorID, // Associate with the selected color
    }));

    // Add new images to the existing formData.images
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };



  const handleDelete = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, imgIndex) => imgIndex !== index),
    }));
  };

  const handleView = (imagePreview) => {
    setModalImage(imagePreview);
    setIsModalOpen(true);
  };
  const handleCategoryChange = (value) => {
    setFormData({
      ...formData,
      categoryID: value,
      categoryName: categories.find((cat) => cat.CategoryID === value)?.CategoryName || "",
    });
    setErrors({ ...errors, category: "" }); // Clear errors on valid selection
  };
  const handleBrandChange = (selectedBrandID) => {
    // Update the formData state with the selected brand ID and name
    const selectedBrand = brands.find((brand) => brand.BrandID === selectedBrandID);
    setFormData({
      ...formData,
      brandID: selectedBrandID, // Update the brandID in formData
      brandName: selectedBrand ? selectedBrand.BrandName : "", // Set brandName based on the selected brand
    });
  };
  const handleProductTypeChange = (selectedID) => {
    const selectedProductType = productTypes.find((type) => type.ProductTypeID === selectedID);
    if (selectedProductType) {
      setFormData({
        ...formData,
        productTypeID: selectedProductType.ProductTypeID,
        productTypeName: selectedProductType.ProductTypeName,
      });
      setErrors({ ...errors, productType: "" }); // Clear errors
    }
  };
  // Handle size selection for a color
  const handleSizeSelect = (colorID, sizeID) => {
    setFormData((prev) => {
      const updatedColors = [...prev.colorData.Colors];

      // Find the color in the existing data, or create a new entry
      const colorIndex = updatedColors.findIndex((color) => color.ColourID === colorID);

      if (colorIndex === -1) {
        updatedColors.push({
          ColourID: colorID,
          Sizes: [{ SizeID: sizeID, Quantity: '' }],
        });
      } else {
        const sizeIndex = updatedColors[colorIndex].Sizes.findIndex((size) => size.SizeID === sizeID);

        if (sizeIndex === -1) {
          updatedColors[colorIndex].Sizes.push({ SizeID: sizeID, Quantity: '' });
        } else {
          updatedColors[colorIndex].Sizes[sizeIndex] = { SizeID: sizeID, Quantity: '' };
        }
      }

      return {
        ...prev,
        colorData: {
          ...prev.colorData,
          Colors: updatedColors,
          selectedColorID: colorID,
        },
      };
    });
  };

  // Handle quantity change for a size
  const handleQuantityChange = (colorID, sizeID, quantity) => {
    setFormData((prev) => {
      const updatedColors = [...prev.colorData.Colors];
      const colorIndex = updatedColors.findIndex((color) => color.ColourID === colorID);

      if (colorIndex !== -1) {
        const sizeIndex = updatedColors[colorIndex].Sizes.findIndex((size) => size.SizeID === sizeID);

        if (sizeIndex !== -1) {
          updatedColors[colorIndex].Sizes[sizeIndex].Quantity = quantity;
        }
      }

      return {
        ...prev,
        colorData: {
          ...prev.colorData,
          Colors: updatedColors,
        },
      };
    });
  };

  const [showColors, setShowColors] = React.useState(false);

  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedColorID, setSelectedColorID] = useState(null);

  const handleColorSelect = (colorID) => {
    setSelectedImage(null); // Reset the image if necessary
    setSelectedColorID((prevColorID) => (prevColorID === colorID ? null : colorID)); // Toggle selection
    setFormData((prev) => {
      const updatedColors = prev.colorData.Colors.map((color) => {
        if (color.ColourID === colorID) {
          return {
            ...color,
            Sizes: color.Sizes.map((size) => ({
              ...size,
              Quantity: prev.colorData.Colors
                .find((c) => c.ColourID === colorID)
                ?.Sizes.find((s) => s.SizeID === size.SizeID)?.Quantity || '',
            })),
            assignedIndex: prev.colorData.Colors.indexOf(color),
          };
        }
        return color;
      });

      return {
        ...prev,
        selectedColorID: colorID,
        colorData: {
          ...prev.colorData,
          Colors: updatedColors,
        },
      };
    });

    setSelectedColors((prev) =>
      prev.includes(colorID) ? prev : [...prev, colorID]
    );
    setSelectedColourID(colorID);
  };

  const handleGenderChange = (event) => {
    const selectedGender = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      gender: selectedGender,
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from input
    setFormData({
      ...formData,
      [name]: value, // Dynamically update the corresponding field
    });
  };


  const handleSubmit = async () => {
    // Initialize FormData
    setIsLoading(true);
    const data = new FormData();
    // Append product data to FormData
    data.append("Data", JSON.stringify({
      ProductTypeID: formData.productTypeID,
      ProductName: formData.productName,
      ProductDescription: formData.description,
      ProductDiscount: formData.discount, // Replace with dynamic value
      Gender: formData.gender,
      CategoryID: formData.categoryID,
      CategoryName: formData.categoryName,
      BrandID: formData.brandID,
      MRP: formData.mrp, // Replace with dynamic value
      CreatedBy: "Admin", // Replace with dynamic value
      TenantID: 1, // Replace with dynamic value
      Colors: formData.colorData.Colors.map((color) => ({
        ColourID: color.ColourID,
        Sizes: color.Sizes.map((size) => ({
          SizeID: size.SizeID,
          Quantity: size.Quantity,
        })),
      })),
    }));
    // Append images for each color
    formData.colorData.Colors.forEach((color, colorIndex) => {
      // Filter images for the current color
      const colorImages = formData.images.filter((img) => img.colorID === color.ColourID);
      // Append each image for the current color
      colorImages.forEach((img, imgIndex) => {
        data.append(`images_${colorIndex}`, img.file); // Append image file with the corresponding index
      });
    });
    // Axios POST request
    try {
      const response = await axios.post(
        createproductWithImages, // Adjust the URL
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Axios handles boundaries
          },
        }
      );

      // Show success toast after successful submission
      toast.success(response.data.message || "Product created successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      console.log("Response:", response.data);
      const productId = response.data?.data?.newProduct?.ProductID;
      console.log("productId",productId)
      if (productId) {
        // Navigate to the product details page
        navigate(`/products/${productId}`);
      }
    } catch (error) {
      console.error("Error uploading data:", error.response?.data || error.message);
      // Show error toast if the submission fails
      toast.error(error.response?.data?.message || "Error uploading data", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setIsLoading(false);
  };
  const handleDeleteColor = (colorID) => {
    // Remove the colorID from the selected colors
    setSelectedColors((prevSelectedColors) =>
      prevSelectedColors.filter((id) => id !== colorID)
    );

    // Update the formData to remove the color-related data
    setFormData((prevFormData) => {
      const updatedColors = prevFormData.colorData.Colors.filter(
        (color) => color.ColourID !== colorID
      );

      const updatedImages = prevFormData.images.filter(
        (image) => image.colorID !== colorID
      );

      return {
        ...prevFormData,
        colorData: {
          ...prevFormData.colorData,
          Colors: updatedColors,
        },
        images: updatedImages,
      };
    });

    // Optionally reset the selected color if the deleted color is currently selected
    setSelectedColorID((prevSelectedColorID) =>
      prevSelectedColorID === colorID ? null : prevSelectedColorID
    );
  };
  const handleDeleteSize = (sizeID) => {
    // Find the selected color
    const selectedColor = formData.colorData.Colors.find(
      (color) => color.ColourID === formData.selectedColorID
    );

    if (selectedColor) {
      // Filter out the size to be deleted
      const updatedSizes = selectedColor.Sizes.filter(
        (size) => size.SizeID !== sizeID
      );

      // Update the color data with the new sizes
      const updatedColors = formData.colorData.Colors.map((color) =>
        color.ColourID === formData.selectedColorID
          ? { ...color, Sizes: updatedSizes }
          : color
      );

      // Set the updated state
      setFormData({
        ...formData,
        colorData: {
          ...formData.colorData,
          Colors: updatedColors,
        },
      });
    }
  };


  const handleUpdate = async () => {
    // Initialize FormData
    setIsLoading(true);
    const data = new FormData();

    // Append product data to FormData
    data.append("Data", JSON.stringify({
      ProductTypeID: formData.productTypeID,
      ProductName: formData.productName,
      ProductDescription: formData.description,
      ProductDiscount: formData.discount, // Replace with dynamic value
      Gender: formData.gender,
      CategoryID: formData.categoryID,
      CategoryName: formData.categoryName,
      BrandID: formData.brandID,
      MRP: formData.mrp, // Replace with dynamic value
      UpdatedBy: "Admin", // Replace with dynamic value
      TenantID: 1, // Replace with dynamic value
      Colors: formData.colorData.Colors.map((color) => ({
        ColourID: color.ColourID,
        Sizes: color.Sizes.map((size) => ({
          SizeID: size.SizeID,
          Quantity: size.Quantity,
        })),
      })),
    }));

    // Append images for each color
    formData.colorData.Colors.forEach((color, colorIndex) => {
      // Filter images for the current color
      const colorImages = formData.images.filter((img) => img.colorID === color.ColourID);
      // Append each image for the current color
      colorImages.forEach((img, imgIndex) => {
        data.append(`images_${colorIndex}`, img.file); // Append image file with the corresponding index
      });
    });

    // Axios PUT request
    try {
      const response = await axios.put(
        `https://electronic-ecommerce.onrender.com/api/updateProductWithImages/${ProductId}`, // API endpoint with product ID
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Axios handles boundaries
          },
        }
      );

      // Show success toast after successful update
      toast.success(response.data.message || "Product updated successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      console.log("Response:", response.data);
      fetchProductData();
    } catch (error) {
      console.error("Error updating data:", error.response?.data || error.message);
      // Show error toast if the update fails
      toast.error(error.response?.data?.message || "Error updating data", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setIsLoading(false);
  };
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    if (productData) {
      setEditMode(Boolean(productData?.productId)); // Set editMode based on categoryData
    }
  }, [productData]);

  useEffect(() => {
    const convertImagesToFiles = async () => {
      if (editMode && productData) {
        // Group images by color ID
        const colorImages = productData.variants.reduce((acc, variant) => {
          if (variant.images && variant.colourId) {
            acc[variant.colourId] = (acc[variant.colourId] || []).concat(
              variant.images.map((url) => url.replace(/^"|"$/g, "")) // Remove any wrapping quotation marks
            );
          }
          return acc;
        }, {});

        console.log("Grouped Images by Color ID:", colorImages);

        // Function to fetch image as blob and create File
        const fetchImageAsFile = async (url, colorID, index) => {
          try {
            const response = await fetch(url);
            const blob = await response.blob();
            const fileName = `color-${colorID}-image-${index}.${blob.type.split('/')[1]}`;
            return new File([blob], fileName, {
              type: blob.type,
              lastModified: Date.now(),
            });
          } catch (error) {
            console.error(`Failed to fetch image at ${url}:`, error);
            return null;
          }
        };

        // Iterate over colorImages to create File objects
        const imagesWithFiles = [];
        for (const [colorID, urls] of Object.entries(colorImages)) {
          const files = await Promise.all(
            urls.map((url, index) => fetchImageAsFile(url, colorID, index))
          );
          // Filter out any failed fetches
          imagesWithFiles.push(
            ...files.filter((file) => file !== null).map((file) => ({
              colorID: parseInt(colorID, 10),
              file,
              preview: URL.createObjectURL(file), // Optional: Create a preview URL
            }))
          );
        }

        // Update formData and handle selected colors
        setFormData((prevData) => {
          const newSelectedColors = productData.variants
            .filter((variant) => variant.images && variant.colourId)
            .map((variant) => variant.colourId);

          // Update the selected colors
          setSelectedColors((prev) => [
            ...new Set([...prev, ...newSelectedColors]), // Add unique colors to the selected list
          ]);

          return {
            ...prevData,
            productName: productData.productName || "",
            productTypeID: productData.productTypeId || "",
            productTypeName: productData.productTypeName || "",
            description: productData.productDescription || "",
            gender: productData.gender || "",
            categoryID: productData.categoryId || "",
            categoryName: productData.categoryName || "",
            brandID: productData.brandId || "",
            brandName: productData.brandName || "",
            mrp: productData.MRP || "",
            discount: productData.productDiscount
              ? productData.productDiscount.replace("%", "")
              : "",
            colorData: {
              Colors: productData.variants.map((variant) => ({
                ColourID: variant.colourId,
                ColorName: variant.colorName,
                Sizes: variant.sizes.map((size) => ({
                  SizeID: size.sizeId,
                  SizeLabel: size.sizeLabel,
                  Quantity: size.quantity,
                  Price: size.price,
                })),
                Images: colorImages[variant.colourId] || [], // Keep URLs if needed
              })),
              // selectedColorID: null,
              assignedIndex: null,
            },
            images: imagesWithFiles, // Assign File objects with colorID and preview
          };
        });

        // Call handleColorSelect with the first color ID
        const firstColorID = productData.variants.length > 0 ? productData.variants[0].colourId : null;
        if (firstColorID !== null) {
          handleColorSelect(firstColorID);
          setSelectedColorID(firstColorID)
        }
      }
    };

    // Call the async function
    convertImagesToFiles();
  }, [editMode, productData]);
  const handleCancel = () => {
    navigate('/all-products')
  }



  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  const [selectedImage, setSelectedImage] = useState(null);

 // Fetch updated product data
const fetchProductData = () => {
  fetch(`https://electronic-ecommerce.onrender.com/api/getProductById/${ProductId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.statusCode === "SUCCESS") {
        setProductData(data.data);  // Set the product data on success
        console.log("setProductData", data.data);  // Log the updated product data
      } else {
        console.error("Error fetching product data:", data.message);
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
};

// useEffect remains the same to fetch data on initial load or ProductId change
useEffect(() => {
  if (!ProductId) return;
  fetchProductData();
}, [ProductId]);
  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const openModal1 = (image) => {
    setSelectedImage(image);
    setIsModalOpen1(true);
  };

  const closeModal1 = () => {
    setIsModalOpen1(false);
    setSelectedImage(null); // Optionally reset selected image when closing modal
  };

  const handleDelete1 = (index) => {
    // Handle the delete logic for an image
    console.log("Delete image", index);
  };

  const handleImageClick = (img) => {
    console.log("Image clicked:", img); // Log the clicked image
    setSelectedImage(img); // Set the clicked image
  };
  return (
    <div>
      {isLoading && <LoadingAnimation />}
      <div className="flex justify-between items-start min-h-scree pt-4">
        {/* Left Side */}
        <ToastContainer />

        {/* You can add content here for the left side */}

        <div className="w-[25%] bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <div>
            <div
              className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-md cursor-pointer"
              onClick={() => {
                // Find the image with the selected colorID
                const selectedImage = formData.images.find(
                  (img) => img.colorID === formData.selectedColorID
                );
                // Open the modal with the preview of the selected image, if found
                openModal1(selectedImage ? selectedImage : { preview: Blueshirt });
              }}
            >
              <img
                src={
                  formData.images && formData.images.length > 0
                    ? formData.images.filter((img) => img.colorID === formData.selectedColorID)[0]
                      ? formData.images.filter((img) => img.colorID === formData.selectedColorID)[0].preview
                      : Blueshirt
                    : Blueshirt
                }
                alt="Selected Product"
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            {/* Modal */}
            {isModalOpen1 && selectedImage && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 rounded-lg shadow-lg relative">
                  {/* Close button */}
                  <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                    onClick={closeModal1}
                  >
                    ✕
                  </button>

                  <div className="flex flex-col md:flex-row">
                    {/* Left Image List */}
                    <div className="w-full md:w-1/4 h-96 overflow-y-auto bg-gray-100 rounded-t-md md:rounded-l-lg">
                      {formData.images
                        .filter((img) => img.colorID === formData.selectedColorID) // Filter images based on selected colorID
                        .map((image, index) => (
                          <div
                            key={index}
                            className={`p-2 cursor-pointer ${selectedImage && selectedImage.colorID === image.colorID
                              ? "bg-gray-300"
                              : ""
                              }`}
                            onClick={() => setSelectedImage(image)} // Set the selected image
                          >
                            <img
                              src={image.preview || Blueshirt}
                              alt={`Thumbnail ${index}`}
                              className="w-full h-20 object-cover rounded-md"
                            />
                          </div>
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="w-full md:w-3/4 flex items-center justify-center p-4">
                      {/* Only show the selected image */}
                      {selectedImage ? (
                        <img
                          src={selectedImage.preview || Blueshirt}
                          alt="Selected Product"
                          className="max-h-96 object-contain rounded-md"
                        />
                      ) : (
                        <img
                          src={
                            formData.images
                              .filter((img) => img.colorID === formData.selectedColorID)[0]
                              ?.preview || Blueshirt
                          }
                          alt="Selected Product"
                          className="max-h-96 object-contain rounded-md"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-800">
            {formData?.productName || "Default Name"}{" "}
            <span className="text-sm text-gray-500">(Fashion)</span>
          </h3>

          {/* Price */}
          <div className="text-gray-700 space-y-1">
            <p>
              <span className="line-through text-gray-400">₹{formData.mrp}</span> {" "}
              <span className="text-green-600 font-bold">₹{actualPrice.toFixed(2)}</span>{" "}
              <span className="text-red-500">({formData.discount}% Off)</span>
            </p>
          </div>
          <div>
            {/* Sizes Section */}
            <label className="block text-sm font-medium text-gray-700 mb-2">Size :</label>
            <div className="flex flex-wrap gap-3">
              {formData.colorData.Colors.map((color) => (
                <div key={color.ColourID}>
                  <h3
                    className={`font-semibold text-gray-800 cursor-pointer ${selectedColourID === color.ColourID ? 'text-blue-600' : ''}`}
                    onClick={() => handleColorSelect(color.ColourID)}
                  >
                    {/* Render color name or ID */}
                  </h3>
                  {selectedColourID === color.ColourID && (
                    <div className="flex flex-wrap gap-2">
                      {color.Sizes.map((size, index) => {
                        const matchingSize = data.find((s) => s.SizeID === size.SizeID);
                        const sizeLabel = matchingSize ? matchingSize.Label : size.SizeID;

                        return (
                          <button
                            key={index}
                            className={`px-4 py-2 border border-gray-300 rounded-md text-sm ${size.selected
                              ? 'bg-blue-500 text-white border-blue-600 shadow-lg shadow-blue-200 scale-105 outline outline-2 outline-blue-400'
                              : 'bg-gray-100 hover:scale-110 hover:bg-gray-200 hover:outline hover:outline-1 hover:outline-blue-600'
                              }`}
                            onClick={() => handleSizeSelect(color.ColourID, size.SizeID)}
                          >
                            {sizeLabel}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Colors */}
            {/* More Variants Section */}
            <p className="text-sm mt-2 font-medium text-gray-700">More Variants :</p>
            <div className="grid grid-cols-4 gap-4 mt-2">
              {[
                ...new Map(
                  formData.images.map((image) => [image.colorID, image])
                ).values(),
              ].map((image, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 flex items-center justify-center rounded-lg cursor-pointer transition-all transform duration-300 ease-in-out ${formData.selectedColorID === image.colorID
                    ? 'border-2 border-blue-600 shadow-lg shadow-blue-200 scale-105'
                    : 'bg-gray-100 hover:scale-110 hover:bg-gray-200'
                    }`}
                  onClick={() => {
                    setFormData({ ...formData, selectedColorID: image.colorID });
                    handleColorSelect(image.colorID); // Dynamically adjust sizes by changing selectedColourID
                  }}
                >
                  <img
                    src={image.preview || Blueshirt} // Replace Blueshirt with a default fallback image
                    alt={`Color option ${index}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
        <div className="w-[74%]">
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            {/* Header */}
            <h2 className="text-lg font-medium text-gray-800">Add Product Photos</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedColors.map((colorID) => {
                const color = colors.find((c) => c.ColourID === colorID);
                return (
                  <div
                    key={colorID}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition-all transform duration-300 ease-in-out border-2 shadow-lg ${selectedColorID === colorID ? 'border-blue-600  shadow-blue-200 scale-110' : 'bg-gray-100 hover:scale-110 hover:bg-gray-200'
                      }`}
                    onClick={() => handleColorSelect(colorID)}
                  >
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{ backgroundColor: color?.HexCode }}
                      title={color?.ColorName}
                    ></div>
                  </div>
                );
              })}
            </div>
            {/* Drop Area */}
            <div className="mt-6 border-2 border-dashed border-gray-300 rounded-lg p-4 relative">
              <div className="text-center">
                <div className="flex justify-center text-orange-500 mb-4">
                  <img
                    src={cloudeUploade}
                    alt="Upload Icon"
                    className="w-16 h-16"
                  />
                </div>
                <p className="text-gray-800 text-lg font-medium">
                  Drop your images here, or{" "}
                  <span
                    className="text-orange-500 font-semibold cursor-pointer"
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    click to browse
                  </span>
                </p>
                <input
                  id="fileInput"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleUpload}
                  accept="image/png, image/jpeg, image/gif"
                />
                <p className="mt-4 text-sm text-gray-500">
                  1600 x 1200 (4:3) recommended. PNG, JPG, and GIF files are allowed.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-4">
                {formData.images
                  .filter((img) => img.colorID === formData.selectedColorID)
                  .map((img, index) => (
                    <div
                      key={index}
                      className="relative w-24 h-24 border rounded-md overflow-hidden group"
                    >
                      <img
                        src={img.preview || img}
                        alt={`Preview ${index}`}
                        className="object-cover w-full h-full"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button
                          onClick={() => handleDelete(index)}
                          className="text-white bg-red-600 p-1 rounded-full mr-2"
                        >
                          <FiTrash size={14} title="Delete" />
                        </button>
                        <button
                          onClick={() => handleView(img.preview || img)}
                          className="text-white bg-blue-600 p-1 rounded-full"
                        >
                          <FiEye size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
              <Dialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                maxWidth="xs" // Set smaller maximum width
                fullWidth
                PaperProps={{
                  style: {
                    width: "380px", // Custom width
                  },
                }}
              >
                <DialogTitle>
                  <div className="flex items-center">
                    <WarningIcon color="warning" className="mr-2" />
                    <Typography variant="h6">Notification</Typography>
                  </div>
                </DialogTitle>
                <DialogContent>
                  <Typography variant="body1" className="text-gray-600">
                    {dialogContent}
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setIsDialogOpen(false)}
                    variant="contained"
                    color="primary"
                  >
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </div>

            {/* Modal to View Image */}
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div
                  className="bg-white p-4 rounded-md relative"
                  style={{ width: "500px", height: "500px" }}
                >
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-2 right-2 flex items-center justify-center text-red-600 bg-red-50 rounded-md hover:bg-red-100 p-2"
                  >
                    <RiCloseLine size={18} />
                  </button>
                  <img
                    src={modalImage}
                    alt="Full View"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          <div className=" bg-white p-8 rounded-lg mt-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Product Information</h2>
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  placeholder="Items Name"
                  className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={formData.productName}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <Combobox as="div" value={formData.categoryID} onChange={handleCategoryChange}>
                  <div className="relative">
                    <Combobox.Input
                      className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      placeholder="Select Category"
                      value={
                        categories.find((category) => category.CategoryID === formData.categoryID)?.CategoryName || ""
                      }
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          categoryID: "",
                          categoryName: e.target.value,
                        });
                      }}
                    />
                    <Combobox.Button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      {/* Dropdown symbol */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </Combobox.Button>

                    {/* Dropdown options below input */}
                    <Combobox.Options className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {categories.map((category) => (
                        <Combobox.Option key={category.CategoryID} value={category.CategoryID}>
                          {({ active }) => (
                            <div
                              className={`p-3 cursor-pointer transition duration-200 ease-in-out rounded-md ${active ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"}`}
                            >
                              {category.CategoryName}
                            </div>
                          )}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  </div>
                </Combobox>
                {errors.category && (
                  <p className="text-red-500 text-sm text-center mt-1">{errors.category}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Type</label>
                <Combobox as="div" value={formData.productTypeID} onChange={handleProductTypeChange}>
                  <div className="relative">
                    <Combobox.Input
                      className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      placeholder="Select Product Type"
                      value={
                        productTypes.find((type) => type.ProductTypeID === formData.productTypeID)?.ProductTypeName || ""
                      }
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          productTypeID: "",
                          productTypeName: e.target.value,
                        });
                      }}
                    />
                    <Combobox.Button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      {/* Dropdown symbol */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </Combobox.Button>

                    {/* Dropdown options below input */}
                    <Combobox.Options className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {productTypes.map((type) => (
                        <Combobox.Option key={type.ProductTypeID} value={type.ProductTypeID}>
                          {({ active }) => (
                            <div
                              className={`p-3 cursor-pointer transition duration-200 ease-in-out rounded-md ${active ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"}`}
                            >
                              {type.ProductTypeName}
                            </div>
                          )}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  </div>
                </Combobox>
                {errors.productType && (
                  <p className="text-red-500 text-sm text-center mt-1">{errors.productType}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">MRP</label>
                <div>
                  <input
                    type="number"
                    name="mrp"
                    className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData.mrp}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Discount %</label>
                <div>
                  <input
                    type="number"
                    name="discount"
                    className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData.discount}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tax %</label>
                <div>
                  <input
                    type="number"
                    name="tax"
                    className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData.tax}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

            </div>


            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
              <input
                type="text"
                placeholder="Brand Name"
                className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div> */}
              {/* Brand Field with Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <Combobox as="div" value={formData.brandID} onChange={handleBrandChange}>
                  <div className="relative">
                    <Combobox.Input
                      className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      placeholder="Select Brand"
                      value={
                        brands.find((brand) => brand.BrandID === formData.brandID)?.BrandName || ""
                      }
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          brandID: "",
                          brandName: e.target.value,
                        });
                      }}
                    />
                    <Combobox.Button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      {/* Dropdown symbol */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </Combobox.Button>

                    {/* Dropdown options below input */}
                    <Combobox.Options className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {brands.map((brand) => (
                        <Combobox.Option key={brand.BrandID} value={brand.BrandID}>
                          {({ active }) => (
                            <div
                              className={`p-3 cursor-pointer transition duration-200 ease-in-out rounded-md ${active ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"}`}
                            >
                              {brand.BrandName}
                            </div>
                          )}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  </div>
                </Combobox>
                {errors.brand && (
                  <p className="text-red-500 text-sm text-center mt-1">{errors.brand}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                <input
                  type="text"
                  placeholder="In gm & kg"
                  className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={formData.gender}
                  onChange={handleGenderChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Sizes Section */}
              {/* Sizes Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sizes:</label>
                <div className="flex flex-wrap gap-3">
                  {data.map((size) => (
                    <div key={size.SizeID} className="relative flex flex-col items-center group">
                      {/* Size Button */}
                      <button
                        type="button"
                        className={`px-4 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 hover:bg-blue-500 hover:text-white transition-all transform duration-300 ease-in-out ${formData.colorData &&
                          formData.colorData.Colors.find(
                            (color) => color.ColourID === formData.selectedColorID
                          )?.Sizes.some((s) => s.SizeID === size.SizeID)
                          ? 'border-2 border-blue-600 shadow-lg shadow-blue-200 scale-105'
                          : 'bg-gray-100 hover:scale-110 hover:bg-gray-200'
                          }`}
                        onClick={() =>
                          handleSizeSelect(formData.selectedColorID, size.SizeID)
                        }
                      >
                        {size.Label}
                      </button>

                      {/* Quantity Input */}
                      {formData.selectedColorID &&
                        formData.colorData &&
                        formData.colorData.Colors
                          .find((color) => color.ColourID === formData.selectedColorID)
                          ?.Sizes.some((s) => s.SizeID === size.SizeID) && (
                          <input
                            type="number"
                            min="1"
                            value={
                              formData.colorData.Colors
                                .find((color) => color.ColourID === formData.selectedColorID)
                                ?.Sizes.find((s) => s.SizeID === size.SizeID)?.Quantity || ''
                            }
                            onChange={(e) =>
                              handleQuantityChange(
                                formData.selectedColorID,
                                size.SizeID,
                                e.target.value
                              )
                            }
                            className="mt-2 w-16 p-2 text-center border rounded-md border-gray-300"
                            placeholder="Qty"
                          />
                        )}

                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white p-2 rounded-lg shadow-lg border text-sm hidden group-focus-within:block">
                        <button
                          className="text-red-600 hover:text-red-700"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent parent click
                            handleDeleteSize(size.SizeID);
                          }}
                        >
                          Delete
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              </div>


              {/* Colors Section */}
              <div>
                {/* Add Colors Label */}
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Colors:
                </label>

                {/* Add Colors Button Styled Like a Color Option */}
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 border-2 border-blue-600 hover:bg-blue-200 transition-all duration-300 ease-in-out"
                  onClick={() => setIsColorPickerVisible((prev) => !prev)}
                  title="Add Colors"
                >
                  <span
                    className="text-lg text-blue-600 font-bold leading-none"
                    style={{ lineHeight: '1' }}
                  >
                    {isColorPickerVisible ? '-' : '+'}
                  </span>
                </button>
                {/* Color Picker Visibility */}
                {isColorPickerVisible && (
                  <div className="flex flex-wrap gap-3 overflow-y-auto max-h-48 scrollbar-thin scrollbar-thumb-blue-500 pl-8 pt-1 pb-8 scrollbar-track-gray-200">
                    {colors.map((color) => (
                      <div
                        key={color.ColourID}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition-all transform duration-300 ease-in-out ${selectedColors.includes(color.ColourID)
                          ? 'border-2 border-blue-600 shadow-lg shadow-blue-200 scale-105'
                          : 'bg-gray-100 hover:scale-110 hover:bg-gray-200'
                          }`}
                        onClick={() => handleColorSelect(color.ColourID)}
                      >
                        <div
                          className="w-5 h-5 rounded-full"
                          style={{ backgroundColor: color.HexCode }}
                        ></div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Displaying Selected Colors */}
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700">Selected Colors:</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedColors.map((colorID) => {
                      const color = colors.find((c) => c.ColourID === colorID);
                      return (
                        <div
                          key={colorID}
                          className={`group relative w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition-all transform duration-300 ease-in-out border-2 shadow-lg ${selectedColorID === colorID ? 'border-blue-600 shadow-blue-200 scale-110' : 'bg-gray-100 hover:scale-110 hover:bg-gray-200'
                            }`}
                          onClick={() => handleColorSelect(colorID)}
                        >
                          {/* Color Circle */}
                          <div
                            className="w-5 h-5 rounded-full"
                            style={{ backgroundColor: color?.HexCode }}
                            title={color?.ColorName}
                          ></div>

                          {/* Delete Tooltip */}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white p-2 rounded-lg shadow-lg border text-sm hidden group-hover:block">
                            <button
                              className="text-red-600 hover:text-red-700"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent parent click
                                handleDeleteColor(colorID);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>



              </div>

            </div>
            {/* Description */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <Editor
                value={formData.description}
                onTextChange={(e) => handleInputChange({ target: { name: "description", value: e.htmlValue } })}
                style={{ height: '200px' }}
              />
            </div>
            {/* Tag Number, Stock, Tag */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tag Number</label>
                <input
                  type="text"
                  placeholder="#******"
                  className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                <input
                  type="text"
                  placeholder="Quantity"
                  className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tag</label>
                <input
                  type="text"
                  placeholder="Add a tag"
                  className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex justify-between items-start min-h-scree pt-4">
      
        <div className="w-[25%] p-8">

        </div>
        {/* Pricing Details Card */}
      {/* <div className="w-[74%] bg-white p-8 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Pricing Details</h2>
          <div className="grid grid-cols-3 gap-4">
            
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <div className="flex items-center border rounded-lg p-2 bg-gray-50">
                <span className="text-gray-500">$</span>
                <input
                  type="number"
                  className="ml-2 flex-1 outline-none bg-transparent"
                  defaultValue="4"
                />
              </div>
            </div>

            
            <div>
              <label className="block text-sm font-medium mb-1">Discount</label>
              <div className="flex items-center border rounded-lg p-2 bg-gray-50">
                <span className="text-gray-500">%</span>
                <input
                  type="number"
                  className="ml-2 flex-1 outline-none bg-transparent"
                  defaultValue="3"
                />
              </div>
            </div>

            
            <div>
              <label className="block text-sm font-medium mb-1">Tax</label>
              <div className="flex items-center border rounded-lg p-2 bg-gray-50">
                <span className="text-gray-500">TXT</span>
                <input
                  type="number"
                  className="ml-2 flex-1 outline-none bg-transparent"
                  defaultValue="2"
                />
              </div>
            </div>
          </div>
        </div> */}
      {/* </div>  */}
      {/* Button Section */}
      <div className="flex justify-between items-start min-h-scree pt-4">
        {/* Left Side */}
        <div className="w-[25%] p-8">
        </div>
        <div className="flex justify-end items-center gap-4 mt-6 bg-blue-50 w-[75%] max-w-4xl p-6 rounded-lg border border-gray-200">
          <button
            onClick={editMode ? handleUpdate : handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            {editMode ? 'Update Product' : 'Create Product'}
          </button>

          <button
            onClick={handleCancel}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddProductPhoto;

