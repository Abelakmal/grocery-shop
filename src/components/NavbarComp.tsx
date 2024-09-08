import { FaSearch } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { TbReport } from "react-icons/tb";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, ListGroup, Modal } from "flowbite-react";
import Delivered from "./Delivered";
import { useDispatch, useSelector } from "react-redux";
import { clearCurrentUser } from "../redux/features/userSlice";
import { jwtDecode } from "jwt-decode";
import { jwtPayload } from "../types/admin.type";
import { AppDispatch, RootState } from "../redux/store";
import { countCart } from "../redux/features/cartSlice";
import useGetCarts from "../hooks/cart/useGetCarts";
import useGetTransactions from "../hooks/transactions/useGetTransactions";

const NavbarComp = () => {
  const [search, setSearch] = useState<string>("");
  const [isSuper, setIsSuper] = useState<boolean>(false);
  const navigate = useNavigate();
  const [show, setShow] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);

  const { address } = useSelector((state: RootState) => state.address);

  const { quantity } = useSelector((state: RootState) => state.cart);
  const { data } = useGetCarts(address.id);
  const transactions = useGetTransactions("PENDING_PAYMENT");

  const token = localStorage.getItem("token");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (token) {
      dispatch(countCart(data));
    }
  }, [data, token, dispatch]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/products?search=${search}`);
  };
  useEffect(() => {
    if (token) {
      setIsSuper("isSuper " in jwtDecode<jwtPayload>(token));
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/signin");
    dispatch(clearCurrentUser());
    setShow(false);
    setOpenModal(false);
  };

  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div className="fixed w-full bg-white z-50 ">
      <div className="bg-[#ccc1a1]  flex flex-row lg:justify-center justify-between w-full  px-1 md:px-5 items-center">
        <Link to="/">
          <div className={` flex font-bold mr-2`}>
            <div className=" text-green-600 text-sm md:text-xl ">Grocery</div>
            <div className=" text-black text-sm md:text-2xl h-full ">Shop</div>
          </div>
        </Link>
        <form
          onSubmit={handleSearch}
          className="z-10 relative w-full md:mx-10 mx-2"
        >
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="w-full">
              <FaSearch className="text-[#848484]" />
            </span>
          </div>
          <input
            className="pl-12 bg-gray-100 text-gray-600 placeholder-gray-200 sm:focus:bg-white w-full mx-auto my-4 py-2 px-3 rounded-xl z-10 outline-0 border-gray-200"
            placeholder="Search for product name..."
            type="search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        {token && !isSuper ? (
          <div className="hidden sm:flex relative">
            <Link to="/cart">
              <div className="relative flex flex-col items-center text-xs hover:text-[#b1bf4c] transition-colors duration-150 mr-4">
                <HiOutlineShoppingBag className="text-4xl hover:scale-110 transition-transform duration-150" />
                {quantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-black rounded-full text-[18px] font-bold px-2 py-[1px]">
                    {quantity}
                  </span>
                )}
              </div>
            </Link>
            <Link to="/orders">
              <div className="relative flex flex-col items-center text-xs hover:text-[#b1bf4c] transition-colors duration-150">
                <TbReport className="text-4xl hover:scale-110 transition-transform duration-150" />
                {transactions.data.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-black rounded-full text-[18px] font-bold px-2 py-[1px]">
                    {transactions.data.length}
                  </span>
                )}
              </div>
            </Link>
            <div className="ml-6 w-10">
              <ListGroup
                className={`w-48 ${!show && "hidden"} absolute left-1 top-14`}
              >
                <Link to={"/profile"} onClick={() => setShow(false)}>
                  <ListGroup.Item>Profile</ListGroup.Item>
                </Link>
                <ListGroup.Item onClick={() => setShow(false)}>
                  Settings
                </ListGroup.Item>
                <ListGroup.Item onClick={() => setShow(false)}>
                  Messages
                </ListGroup.Item>
                <ListGroup.Item active onClick={() => handleLogout()}>
                  Log Out
                </ListGroup.Item>
              </ListGroup>
              <Avatar
                img={user.image || `/profile.webp`}
                alt="profile"
                rounded
                bordered
                className="cursor-pointer"
                onClick={() => setShow(!show)}
              />
              <Modal
                show={openModal}
                size="md"
                onClose={() => setOpenModal(false)}
                popup
              >
                <Modal.Header />
                <Modal.Body>
                  <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure for Log Out?
                    </h3>
                    <div className="flex justify-center gap-4">
                      <Button color="failure" onClick={handleLogout}>
                        {"Yes, I'm sure"}
                      </Button>
                      <Button color="gray" onClick={() => setOpenModal(false)}>
                        No, cancel
                      </Button>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex">
            <Link to={"/signin"}>
              <button className="bg-green-600 text-white p-1 font-medium rounded-lg mr-2 whitespace-nowrap text-[13px]">
                <p>SIGN IN</p>
              </button>
            </Link>
            <Link to={"/signup"}>
              <button className="hover:bg-green-600 hover:text-white font-medium bg-white p-1 rounded-lg border-2 text-[13px] whitespace-nowrap">
                SIGN UP
              </button>
            </Link>
          </div>
        )}
      </div>
      <Delivered />
    </div>
  );
};

export default NavbarComp;
