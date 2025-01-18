import React, { createContext, useEffect, useState } from "react";

// Create the context
export const LocationDataContext = createContext();

const LocationDataProvider = ({ children }) => {
  const [citiesData, setCitiesData] = useState([]);
  const [statesData, setStatesData] = useState([]);
  const [countriesData, setCountriesData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const fetchDataFromLocalStorage = (key, setter) => {
    const data = JSON.parse(localStorage.getItem(key));
    if (data) {
      setter(data); // Access the data array
    } else {
      console.warn(`No ${key} data found in localStorage`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // Start loading
      setLoading(true);

      // Fetch data from local storage
      fetchDataFromLocalStorage("citiesData", setCitiesData);
      fetchDataFromLocalStorage("statesData", setStatesData);
      fetchDataFromLocalStorage("countriesData", setCountriesData);

      // Finish loading
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <LocationDataContext.Provider
      value={{ citiesData, statesData, countriesData, loading }}
    >
      {children}
    </LocationDataContext.Provider>
  );
};

export default LocationDataProvider;
