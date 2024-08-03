import { FaSearch } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { TbReport } from "react-icons/tb";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, ListGroup, Modal } from "flowbite-react";
import Delivered from "./Delivered";
import { useDispatch, useSelector } from "react-redux";
import { clearCurrentUser } from "../redux/features/userSlice";

const NavbarComp = () => {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();
  const [show, setShow] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);

  const token = localStorage.getItem("token");
  const dispatch: any = useDispatch();

  const handleSearch = (e: any) => {
    e.preventDefault();
    navigate(`/products?search=${search}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/signin");
    dispatch(clearCurrentUser())
    setShow(false);
    setOpenModal(false);
  };

  const { user } = useSelector((state: any) => state.user);

  return (
    <div className="sticky top-0 z-50 ">
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
        {token ? (
          <div className="hidden sm:flex relative">
            <Link to="/cart">
              <button className="ml-6 flex">
                <span className="w-full text-4xl">
                  <HiOutlineShoppingBag />
                </span>
              </button>
            </Link>
            <Link to="/transaction">
              <button className="ml-6 flex">
                <span className="w-full text-4xl">
                  <TbReport />
                </span>
              </button>
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
