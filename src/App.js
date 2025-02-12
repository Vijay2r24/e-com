import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes";
import { BrandsProvider } from '../src/components/Context/BrandsContext';
import { CategoriesProvider } from '../src/components/Context/CategoriesContext';
import { DataProvider } from '../src/components/Context/SizeContext';
import { ColorProvider } from '../src/components/Context/ColorContext';
import {ProductTypesProvider}from '../src/components/Context/AllProductTypesContext';
import TawkToWidget from'../src/components/tawk/TawkToWidget';
import LocationDataProvider  from "../src/components/Context/DataContext";
import Loader  from "../src/components/Loader/loader";

function App() {
  return (
    <BrowserRouter>
      <BrandsProvider>
        <CategoriesProvider>
          <DataProvider>
          <ColorProvider>
          <ProductTypesProvider>
          <LocationDataProvider>
              <AppRoutes />
              </LocationDataProvider>
              </ProductTypesProvider>
            </ColorProvider>
          </DataProvider>
        </CategoriesProvider>
      </BrandsProvider>
      <TawkToWidget />
    </BrowserRouter>
  );
}

export default App;
