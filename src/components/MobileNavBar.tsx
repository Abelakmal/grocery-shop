import { HiOutlineShoppingBag } from "react-icons/hi";
import { TbReport } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, ListGroup, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCurrentUser } from "../redux/features/userSlice";
import { jwtDecode } from "jwt-decode";
import { jwtPayload } from "../types/admin.type";
import { AppDispatch, RootState } from "../redux/store";
import { FormatRupiah } from "@arismun/format-rupiah";
import { countCart } from "../redux/features/cartSlice";
import useGetCarts from "../hooks/cart/useGetCarts";
import useGetTransactions from "../hooks/transactions/useGetTransactions";

const MobileNavBar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [show, setShow] = useState<boolean>(false);
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [isSuper, setIsSuper] = useState<boolean>(false);
  const { total, quantity } = useSelector((state: RootState) => state.cart);
  const { address } = useSelector((state: RootState) => state.address);

  const { data } = useGetCarts(address.id);
  const transactions = useGetTransactions("PENDING_PAYMENT");

  useEffect(() => {
    if (token) {
      dispatch(countCart(data));
    }
  }, [data, token, dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/signin");
    dispatch(clearCurrentUser());
    navigate("/signin");
    setOpenModal(false);
    setShow(false);
  };
  useEffect(() => {
    if (token) {
      setIsSuper("isSuper " in jwtDecode<jwtPayload>(token));
    }
  }, [token]);
  return (
    <div className="fixed bottom-0 mx-auto z- w-full inset-x-0 bg-white shadow-lg md:hidden">
      {"/cart" === location.pathname && quantity > 0 && (
        <div className=" bg-white md:hidden flex justify-between items-center w-full px-2">
          <div className="flex items-center">
            <p className="text-xs ml-2">Total</p>
          </div>
          <div className="flex items-center">
            <div className=" my-4">
              <p className="text-xs text-end">
                <FormatRupiah value={total} />
              </p>
              <p className="text-sm font-semibold"></p>
            </div>
            <Link to={"/cart/checkout"}>
              <button className=" text-xs bg-green-600 text-white  rounded-md  p-2 px-4 ml-4 font-semibold">
                Beli {quantity}
              </button>
            </Link>
          </div>
        </div>
      )}
      {token && !isSuper ? (
        <div className="flex justify-around items-center p-4 bg-gray-100 rounded-t-lg">
          <Link to="/">
            <div className="flex flex-col items-center text-xs hover:text-[#b1bf4c] transition-colors duration-150">
              <IoHomeOutline className="text-2xl hover:scale-110 transition-transform duration-150" />
              <span>Home</span>
            </div>
          </Link>
          <Link to="/cart">
            <div className="relative flex flex-col items-center text-xs hover:text-[#b1bf4c] transition-colors duration-150">
              <HiOutlineShoppingBag className="text-2xl hover:scale-110 transition-transform duration-150" />
              {quantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-black rounded-full text-[10px] px-2">
                  {quantity}
                </span>
              )}
              <span>Cart</span>
            </div>
          </Link>
          <Link to="/orders">
            <div className="relative flex flex-col items-center text-xs hover:text-[#b1bf4c] transition-colors duration-150">
              <TbReport className="text-2xl hover:scale-110 transition-transform duration-150" />
              {transactions.data.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-black rounded-full text-[10px] px-2">
                  {transactions.data.length}
                </span>
              )}
              <span>Orders</span>
            </div>
          </Link>
          <div className="ml-6 w-10">
            <ListGroup
              className={`w-48 ${!show && "hidden"} absolute bottom-20 right-1`}
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
              <ListGroup.Item active onClick={() => setOpenModal(true)}>
                Log Out
              </ListGroup.Item>
            </ListGroup>
            <Avatar
              img={user?.image || `/profile.webp`}
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
        <div className="flex justify-around items-center p-4 bg-gray-100 rounded-t-lg">
          <Link to="/">
            <div className="flex flex-col items-center text-xs hover:text-[#b1bf4c] transition-colors duration-150">
              <IoHomeOutline className="text-2xl hover:scale-110 transition-transform duration-150" />
              <span>Home</span>
            </div>
          </Link>
          <Link to={"/signin"}>
            <button className="bg-green-600 text-white p-2 font-medium rounded-lg mr-2 whitespace-nowrap text-base">
              <p>SIGN IN</p>
            </button>
          </Link>
          <Link to={"/signup"}>
            <button className="hover:bg-green-600 hover:text-white font-medium bg-white p-2 rounded-lg border-2 text-base whitespace-nowrap">
              SIGN UP
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileNavBar;
