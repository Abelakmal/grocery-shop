import { useState } from "react";
import Dashboard from "./components/Dashboard";
import { SidebarAdmin } from "./components/SideBarAdmin";
import ProductManage from "./products/ProductManage";
import CategoryManage from "./category/CategoryManage";
import StockManage from "./stock/StockManage";
import StoreAdminManage from "./store-admin/StoreAdminManage";
import SalesManage from "./sales-report/SalesMange";
import StockReportManage from "./stock-report/StockReportManage";
import StorePage from "./store/StorePage";
import { Avatar, Button, ListGroup, Modal } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { clearCurrentAdmin } from "../../redux/features/adminSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { BsFillArrowRightSquareFill } from "react-icons/bs";

export const AdminPage = () => {
  const [show, setShow] = useState(1);
  const [showAvatar, setShowAvatar] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const { admin } = useSelector((state: any) => state.admin);
  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/admin/login");
    dispatch(clearCurrentAdmin());
    setShowAvatar(false);
    setOpenModal(false);
  };

  return (
    <section className="flex bg-[#272c2f] h-full">
      <SidebarAdmin setShow={setShow} isOpen={isOpen} setIsOpen={setIsOpen}/>

      <div
        className={`w-full flex flex-col bg-[#272c2f] items-end  flex-1 transition-all duration-300 ${
          !isOpen && "absolute h-full"
        }`}
      >
        <div className={`w-full flex justify-between ${isOpen && "hidden lg:block"}`}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className=" w-max  text-white p-1 rounded-md"
          >
            {isOpen ? (
              <BsFillArrowRightSquareFill className="text-4xl"/>
              
            ) : (
              <BsFillArrowLeftSquareFill className="text-4xl" />
            )}
          </button>
          <div className="relative p-4">
            <div className="flex">
              <ListGroup
                className={`w-48 ${
                  !showAvatar && "hidden"
                } absolute right-0 top-12 z-50`}
              >
                <ListGroup.Item>{admin.name}</ListGroup.Item>
                <ListGroup.Item active onClick={() => handleLogout()}>
                  Log Out
                </ListGroup.Item>
              </ListGroup>
              <Avatar
                img={`/profile.webp`}
                alt="profile"
                rounded
                bordered
                className="cursor-pointer"
                onClick={() => setShowAvatar(!showAvatar)}
              />
            </div>
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

        <div className={`w-full bg-[#272c2f]  p-4 ${isOpen && "hidden lg:block"}`}>
          {show === 1 && <Dashboard />}
          {show === 2 && <StoreAdminManage />}
          {show === 3 && <ProductManage />}
          {show === 4 && <CategoryManage />}
          {show === 5 && <StockManage />}
          {show === 6 && <SalesManage />}
          {show === 7 && <StockReportManage />}
          {show === 8 && <StorePage />}
        </div>
      </div>
    </section>
  );
};
