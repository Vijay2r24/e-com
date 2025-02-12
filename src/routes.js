import React, { useState, useEffect } from "react";
import { useRoutes, useLocation } from "react-router-dom";
import LoadingAnimation from "./components/Loader/loader";
import MainLayout from "./main_layout";
import Dashboard from "./pages/admin/dashboard";
import Orders from "./components/Orders/order";
import Customers from "./pages/admin/customers";
import Reports from "./pages/admin/reports";
import Settings from "./not_found";
import NotFound from "./not_found";
import Products from "./components/stepper/Home";
import AllProducts from "./pages/admin/all_products";
import CategoryList from "./components/ProductCategories/CategoriesList";
import Categories from "./components/ProductCategories/Categories"
import Brands from "./components/Brands/createbrand"
import BrandList from "./components/Brands/BrandsList"
import MultieAll from "./components/stepper-multie/Home"
import ProductCreation from "./components/stepper-multie/Step3";
import Step1 from "./components/stepper-multie/Step1";
import Step2 from "./components/stepper-multie/Step2";
import Step3 from "./components/stepper-multie/Step3";
import Step4 from "./components/stepper-multie/Step4";
import Step5 from "./components/stepper-multie/Step5";
import CreateBrand from "./components/stepper-multie/Brandcreation";
import CreateCategory from "./components/stepper-multie/Categorycreation";
import CreateProduct from "./components/stepper-multie/Producttypecreation";
import ProductList from "./components/ProductTypeList/productlist";
import CreateColor from "./components/stepper-multie/Colorcreation";
import ColorList from "./components/Colores/colorList";
import CreateSize from "./components/stepper-multie/Sizecreation";
import SizeList from "./components/Size/SizeList";
import Login from "./components/Login/login";
import SignupPage from "./components/Login/SignupPage";
import UserList from "./components/Users/userList";
import UserAdd from "./components/Users/userAdd";
import ForgotPassword from "./components/Login/forgotPassword";
import SingleProduct from "./components/singleProduct/product";
import Profile from "./components/Profile/Profile (1)";
import StoreList from "./components/Stores/storeList";
import StoreAdd from "./components/Stores/storeForm";
import BannerImage from "./components/BannerImages/bannerImage";
import ProductPosting from "./components/singleProduct/productPosting";
import UserForm from "./components/UserRoles/userForm";
import PushNotification from "./components/PushNotification/index";
import Ordergrid from "./components/Orders/ordersgrid";
import BannerForm from "./components/Dynamic_Banner_Image/banner_Image";
import  ExpoSnackEmbed from "./ExpoSnackEmbed";
import SilentNotification from "./components/PushNotification/silentnotification";
import Notifications from "./components/PushNotification/Home";
import RolesList from "./components/UserRoles/UserList";
import BannerList from "./components/Dynamic_Banner_Image/bannerlist";

const AppRoutes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  // Show loader when the location changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false); // Simulate route loading completion
    }, 700); // Adjust the timeout as needed

    return () => clearTimeout(timer);
  }, [location]);

  const snackData = {
    snackId: "@sravani-ch/textinput-example",
    platform: "web",
    preview: true,
    theme: "light",
    style: {
      height: "600px", // Custom height for the embed
      width: "100%",
    },
  };

  const routes = useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/SignupPage",
      element: <SignupPage />,
    },
    {
      path: "/ForgotPassword",
      element: <ForgotPassword />,
    },
    {
      element: <MainLayout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/Profile",
          element: <Profile />,
        },
        {
          path: "/silentNotification",
          element: <SilentNotification />,
        },
        {
          path: "/ProductPosting",
          element: <ProductPosting />,
        },
        {
          path: "/Productpost",
          element: <SingleProduct />,
        },
        {
          path: "/storeList",
          element: <StoreList />,
        },
        {
          path: "/storeAdd",
          element: <StoreAdd />,
        },
        {
          path: "/StoreEdit/:storeId",
          element: <StoreAdd />,
        },
        {
          path: "/UserForm",
          element: <UserForm />,
        },
        {
          path: "/ViewOrder/:orderId",
          element: <Ordergrid />,
        },
        {
          path: "/BannerImage",
          element: <BannerImage />,
        },
        {
          path: "/categories/:categoryID",
          element: <Categories />,
        },
        {
          path: "/UserList",
          element: <UserList />,
        },
        {
          path: "/UserAdd/:userId",
          element: <UserAdd />,
        },
        {
          path: "/UserAdd",
          element: <UserAdd />,
        },
        {
          path: "/bannerform",
          element: <BannerForm />,
        },
        {
          path: "/dynamicui",
          element: <ExpoSnackEmbed snackData={snackData} />,
        },
        {
          path:"/bannerlist",
          element:<BannerList/>
        },
        {
          path: "/Notifications",
          element: <Notifications />,
          children: [
            {
              path: "pushNotification",
              element: <PushNotification />,
            },
            {
              path: "silentNotification",
              element: <SilentNotification />,
            },
          ],
        },
        {
          path: "/Browse",
          element: <MultieAll />,
          children: [
            {
              path: "step1",
              element: <Step1 />,
              children: [
                {
                  path: "create",
                  element: <CreateBrand />,
                },
                {
                  path: "list",
                  element: <BrandList />,
                },
                {
                  path: "editCreateBrand/:BrandID",
                  element: <CreateBrand />,
                },
              ],
            },
            {
              path: "step2",
              element: <Step2 />,
              children: [
                {
                  path: "create",
                  element: <CreateCategory />,
                },
                {
                  path: "list",
                  element: <CategoryList />,
                },
                {
                  path: "editCategory/:categoryID",
                  element: <CreateCategory />,
                },
              ],
            },
            {
              path: "step3",
              element: <Step3 />,
              children: [
                {
                  path: "create",
                  element: <CreateProduct />,
                },
                {
                  path: "list",
                  element: <ProductList />,
                },
                {
                  path: "editProductType/:ProductTypeID",
                  element: <CreateProduct />,
                },
              ],
            },
            {
              path: "step4",
              element: <Step4 />,
              children: [
                {
                  path: "create",
                  element: <CreateColor />,
                },
                {
                  path: "list",
                  element: <ColorList />,
                },
                {
                  path: "editCreateColor/:ColourID",
                  element: <CreateColor />,
                },
              ],
            },
            {
              path: "step5",
              element: <Step5 />,
              children: [
                {
                  path: "create",
                  element: <CreateSize />,
                },
                {
                  path: "list",
                  element: <SizeList />,
                },
                {
                  path: "editCreateSize/:SizeID",
                  element: <CreateSize />,
                },
              ],
            },
          ],
        },
        {
          path: "/Browse/product",
          element: <ProductCreation />,
        },

        {
          path: "/brands/:BrandID",
          element: <Brands />,
        },
        {
          path: "/brands/new",
          element: <Brands />,
        },
        {
          path: "/brandsList",
          element: <BrandList />,
        },
        {
          path: "/categories",
          element: <Categories />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/products/:ProductId",
          element: <SingleProduct />,
        },
        {
          path: "/editProductType/:ProductTypeID",
          element: <ProductCreation />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/categoryList",
          element: <CategoryList />,
        },
        {
          path: "/all-products",
          element: <AllProducts />,
        },
        {
          path: "/customers",
          element: <Customers />,
        },
        {
          path: "/RolesList",
          element: <RolesList />,
        },
        {
          path: "/reports",
          element: <Reports />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <>
      {isLoading && <LoadingAnimation />}
      {routes}
    </>
  );
};

export default AppRoutes;
