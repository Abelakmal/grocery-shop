import { Route, Routes, useLocation } from "react-router-dom";
import { App } from "../pages/home/App";
import Products from "../pages/products";
import { ProductDetails } from "../pages/products/components/ProductDetails";
import FooterComp from "../components/FooterComp";
import Signin from "../pages/auth/signin";
import Signup from "../pages/auth/signup";
import Profile from "../pages/profile";
import NavbarComp from "../components/NavbarComp";
import MobileNavBar from "../components/MobileNavBar";
import { useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { fetchCurrentUser } from "../redux/features/userSlice";
import AuthGuard from "../HOC/AuthGuard";
import UserGuard from "../HOC/UserGuard";
import { AdminPage } from "../pages/admin";
import CartPage from "../pages/cart";
import AdminLoginPage from "../pages/auth/admin-login/AdminLoginPage";
import AdminGuard from "../HOC/AdminGuard";
import { AppDispatch } from "../redux/store";
import ResetPasswordPage from "../pages/reset-password";
import ForgotPassword from "../pages/forgotPassword";
import NotFound from "../pages/error/NotFound";
import ScrollToTop from "../components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import CheckoutPage from "../pages/cart/checkout";
import OrdersPage from "../pages/orders";
import OrderDetail from "../pages/orders/order-detail";

export const Routers = () => {
  const location = useLocation();

  const token = localStorage.getItem("token") || "";

  const dispatch = useDispatch<AppDispatch>();

  const route = useMemo(
    () => [
      "/signup",
      "/signin",
      "/signup/",
      "/signin/",
      "/admin",
      "/admin/",
      "/admin/login",
      "/admin/login/",
      "/reset-password",
      "/forgotPassword",
      "/cart/checkout",
      "/orders/detail",
    ],
    []
  );

  useEffect(() => {
    if (token && !route.includes(location.pathname)) {
      dispatch(fetchCurrentUser());
    }
  }, [token, dispatch, location.pathname, route]);

  return (
    <div className=" md:h-screen h-full grid grid-cols-1 font-popins relative bg-white">
      <Toaster />
      <ScrollToTop />
      {!route.includes(location.pathname) && <NavbarComp />}
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<App />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/signin" element={<AuthGuard component={<Signin />} />} />
        <Route path="/signup" element={<AuthGuard component={<Signup />} />} />
        <Route
          path="/profile"
          element={<UserGuard component={<Profile />} />}
        />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/cart" element={<UserGuard component={<CartPage />} />} />
        <Route
          path="/cart/checkout"
          element={<UserGuard component={<CheckoutPage />} />}
        />
        <Route
          path="/orders"
          element={<UserGuard component={<OrdersPage />} />}
        />
        <Route
          path="/orders/detail"
          element={<UserGuard component={<OrderDetail />} />}
        />
        <Route
          path="/admin"
          element={<AdminGuard component={<AdminPage />} />}
        />
        <Route path="/admin/login" element={<AdminLoginPage />} />
      </Routes>
      {!route.includes(location.pathname) && <MobileNavBar />}
      {!route.includes(location.pathname) && <FooterComp />}
    </div>
  );
};
