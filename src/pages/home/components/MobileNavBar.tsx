import { HiOutlineShoppingBag } from "react-icons/hi";
import { TbReport } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Avatar, Button, ListGroup, Modal } from "flowbite-react";
import { useState } from "react";
import useCurrent from "../../../hooks/users/useCurrent";

const MobileNavBar = ({ itemOnCartCount }: any) => {
  const token = localStorage.getItem("token");
  const [openModal, setOpenModal] = useState(false);
  const [show, setShow] = useState<boolean>(false);
  const {data} = useCurrent()

  const handleLogout = () => {
    localStorage.removeItem("token")
    setOpenModal(false)
  }
  return (
    <div className="fixed bottom-0 mx-auto z-50 w-full inset-x-0 bg-white shadow-lg sm:hidden">
      {token ? (
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
              {itemOnCartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-[10px] px-2">
                  {itemOnCartCount}
                </span>
              )}
              <span>Cart</span>
            </div>
          </Link>
          <Link to="/transaction">
            <div className="flex flex-col items-center text-xs hover:text-[#b1bf4c] transition-colors duration-150">
              <TbReport className="text-2xl hover:scale-110 transition-transform duration-150" />
              <span>Orders</span>
            </div>
          </Link>
          <div className="ml-6 w-10">
              <ListGroup
                className={`w-48 ${!show && "hidden"} absolute bottom-20 right-1`}
              >
                <ListGroup.Item>Profile</ListGroup.Item>
                <ListGroup.Item>Settings</ListGroup.Item>
                <ListGroup.Item>Messages</ListGroup.Item>
                <ListGroup.Item active onClick={() => setOpenModal(true)}>
                  Log Out
                </ListGroup.Item>
              </ListGroup>
              <Avatar
                img={data?.image || `/profile.webp`}
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
                      <Button
                        color="failure"
                        onClick={handleLogout}
                      >
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
