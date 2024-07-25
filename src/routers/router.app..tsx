import { Route, Routes, useLocation } from "react-router-dom";
import { App } from "../pages/home/App";
import NavbarComp from "../pages/home/components/NavbarComp";
import MobileNavBar from "../pages/home/components/MobileNavBar";
import Products from "../pages/products";
import { ProductDetails } from "../pages/products/components/ProductDetails";
import FooterComp from "../pages/home/components/FooterComp";
import Signin from "../pages/auth/signin";
import { Signup } from "../pages/auth/signup";
import Profile from "../pages/profile";

export const Routers = () => {
  const location = useLocation();

  const route = ["/signup", "/signin", "/admin"];
  return (
    <div className="bg-orange-50 h-full font-popins">
      {!route.includes(location.pathname) && <NavbarComp />}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {!route.includes(location.pathname) && <FooterComp />}
      {!route.includes(location.pathname) && <MobileNavBar />}
    </div>
  );
};
