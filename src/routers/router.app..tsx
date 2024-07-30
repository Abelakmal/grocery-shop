import { Route, Routes, useLocation } from "react-router-dom";
import { App } from "../pages/home/App";
import Products from "../pages/products";
import { ProductDetails } from "../pages/products/components/ProductDetails";
import FooterComp from "../components/FooterComp";
import Signin from "../pages/auth/signin";
import { Signup } from "../pages/auth/signup";
import Profile from "../pages/profile";
import NavbarComp from "../components/NavbarComp";
import MobileNavBar from "../components/MobileNavBar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCurrentUser } from "../redux/features/userSlice";

export const Routers = () => {
  const location = useLocation();

  const dispatch = useDispatch<any>();

  useEffect(() => {
      dispatch(fetchCurrentUser());
  }, []);

  const route = ["/signup", "/signin", "/admin"];
  return (
    <div className=" md:h-screen h-full grid grid-cols-1 font-popins relative">
      {!route.includes(location.pathname) && <NavbarComp />}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {!route.includes(location.pathname) && <MobileNavBar />}
      {!route.includes(location.pathname) && <FooterComp />}
    </div>
  );
};
