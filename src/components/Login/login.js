import { React, useEffect, useState } from "react";
import Google from "../../assets/images/icons8-google-48.png";
import facebook from "../../assets/images/icons8-facebook-48.png";
import loginBanner from "../../assets/images/Frame 15.png";
import cart from "../../assets/images/cart-148964_1280 1.png";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {COUNTRIES_API,STATES_API,CITIES_API} from "../../Constants/apiRoutes"

// Example function definitions if you haven't defined them elsewhere
// const fetchApiData = async () => {
//   console.log('Fetching API data...');
// };

const fetchAndStoreStoresData = async () => {
  console.log('Fetching and storing stores data...');
};
const fetchApiData = async () => {
  const storedCitiesData = localStorage.getItem("citiesData");
  const storedStatesData = localStorage.getItem("statesData");
  const storedCountriesData = localStorage.getItem("countriesData");

  if (!storedCitiesData || !storedStatesData || !storedCountriesData) {
    try {
      const resCities = storedCitiesData
        ? JSON.parse(storedCitiesData)
        : await fetch(CITIES_API).then((res) => res.json());
      const resStates = storedStatesData
        ? JSON.parse(storedStatesData)
        : await fetch(STATES_API).then((res) => res.json());
      const resCountries = storedCountriesData
        ? JSON.parse(storedCountriesData)
        : await fetch(COUNTRIES_API).then((res) => res.json());

      // Store in localStorage
      localStorage.setItem("citiesData", JSON.stringify(resCities));
      localStorage.setItem("statesData", JSON.stringify(resStates));
      localStorage.setItem("countriesData", JSON.stringify(resCountries));
    } catch (error) {
      console.error("Error fetching API data:", error);
    }
  }
};
const LoginScreen = () => {
  const [slideIn, setSlideIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setSlideIn(true), 200);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://electronic-ecommerce.onrender.com/api/userlogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Email: userName, Password: password }),
        }
      );

      const data = await response.json();
      await Promise.all([fetchApiData()]);
      if (response.ok) {
        const { token } = data;
        const decodedToken = jwtDecode(token);
        const roleID = decodedToken.RoleID;
        const userID = decodedToken.UserID;
        const TenantID = decodedToken.TenantID;

        localStorage.setItem("UserID", userID);
        localStorage.setItem("token", token);
        localStorage.setItem("TenantID", TenantID);
        console.log("Logged-in UserID:", userID);
        console.log("Logged-in TenantID:", TenantID);

        // Mock additional actions
        await Promise.all([fetchApiData(), fetchAndStoreStoresData()]);

        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 10000);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <img
        src={loginBanner}
        alt="Characters"
        className={`w-auto md:w-1/2 h-auto transform transition-all duration-700 ease-in-out md:block hidden ${
          slideIn ? "translate-x-0" : "translate-x-[-100%]"
        }`}
      />

      <div className="flex flex-col justify-center items-center bg-white w-full md:w-1/2 p-6 sm:p-4">
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-pacific-500 rounded-full p-4 mb-3 shadow-lg">
              <img src={cart} alt="Logo" className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-pacific-700 mb-1">DN Spurt</h1>
            <span className="bg-gray-100 text-sm text-gray-700 px-3 py-1 rounded-full shadow-sm">Admin</span>
            <h2 className="text-xl font-semibold mb-2 mt-2">Welcome Back</h2>
            <p className="text-gray-600">Please login to your account</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email address"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pacific-500 transition"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mb-4 relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pacific-500 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex justify-end mb-4">
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-pacific-500 text-white p-3 rounded-lg hover:bg-pacific-600 transition"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="h-px bg-gradient-to-r from-gray-300 to-transparent flex-grow"></div>
            <span className="px-3 text-gray-500">Or Login With</span>
            <div className="h-px bg-gradient-to-l from-gray-300 to-transparent flex-grow"></div>
          </div>

          <div className="flex gap-4">
            <button className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-lg gap-2 hover:bg-gray-100">
              <img src={Google} alt="Google" className="w-5 h-5" />
              Google
            </button>
            <button className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-lg gap-2 hover:bg-gray-100">
              <img src={facebook} alt="Facebook" className="w-5 h-5" />
              Facebook
            </button>
          </div>

          <p className="mt-6 text-center text-gray-500">
            Don’t have an account? {" "}
            <a
              href="#"
              className="text-pacific-500 hover:underline hover:text-pacific-600 transition"
            >
              Signup
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;





