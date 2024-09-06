import { Link } from "react-router-dom";
import useGetCarts from "../../hooks/cart/useGetCarts";
import { ICart } from "../../types/cart.type";
import CardCart from "./components/CardCart";
import { FormatRupiah } from "@arismun/format-rupiah";
import { useEffect, useState } from "react";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { countCart } from "../../redux/features/cartSlice";
import { Button, Modal } from "flowbite-react";
import axiosInstance from "../../helper/axios";
import { baseURL } from "../../helper/config";

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, refreshData } = useGetCarts();
  const [check, setCheck] = useState(false);
  const { total } = useSelector((state: RootState) => state.cart);

  const [openModal, setOpenModal] = useState(false);
  const confirmDelete = async () => {
    await axiosInstance.delete(`${baseURL}/cart`);
    refreshData();
    setOpenModal(false);
  };

  useEffect(() => {
    dispatch(countCart(data));
  }, [data, dispatch]);

  return (
    <div
      className={`pt-40 md:bg-gray-200 bg-white    md:flex items-center flex-col mb-10 ${
        data.length < 1 ? "h-screen" : "h-full"
      }`}
    >
      <div className="w-max ">
        <h1 className="md:text-2xl font-bold mb-4 flex items-center max-md:w-screen border-b pb-2">
          <Link to={"/products"}>
            <span className="block  mx-3 hover:bg-gray-300">
              <HiArrowSmallLeft />
            </span>
          </Link>
          Keranjang
        </h1>

        <div className="flex  md:border-2 ">
          {data.length < 1 ? (
            <div className="bg-white md:p-20 flex items-center rounded-lg ">
              <img src="keranjang.svg" alt="keranjang" className="w-20" />
              <div>
                <p className="xl:text-3xl text-xs xl:text-nowrap  font-bold mb-4">
                  Keranjang Belanja Kamu masih kosong
                </p>
                <Link to={"/products"}>
                  <button className="bg-green-600 text-xs text-white p-2 rounded-lg">
                    Mulai Belanja
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="h-full">
              <div className="flex  items-center justify-between w-full bg-white px-5 py-3 rounded-tr-lg rounded-tl-lg border-b">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    onChange={(e) => setCheck(e.target.checked)}
                  />
                  <p className="ml-4 text-xs">Semua</p>
                </div>

                <button
                  className={`${
                    check ? "text-green-600" : "text-gray-400"
                  } text-xs`}
                  disabled={!check}
                  onClick={() => setOpenModal(!openModal)}
                >
                  Hapus
                </button>
              </div>
              {data.map((data: ICart, index: number) => {
                return (
                  <CardCart
                    cart={data}
                    key={index}
                    index={index}
                    refreshData={refreshData}
                  />
                );
              })}
            </div>
          )}
          <div className="bg-white p-4 ml-10 xl:w-96  md:flex hidden flex-col h-full justify-between rounded-lg sticky md:top-40">
            <div className="border-b-2 ">
              <h2 className="lg:text-xl font-bold">Ringkasan belanja</h2>
              <div className="flex justify-between my-4">
                <p className="text-lg">total</p>
                <p>{total > 0 ? <FormatRupiah value={total} /> : "-"}</p>
              </div>
            </div>
            <button className="w-full lg:text-xl text-xs bg-green-600 text-white  rounded-md  p-2 font-semibold">
              Beli
            </button>
          </div>
        </div>
      </div>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Body>
          <div className="text-center mt-5">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-700 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to Delete this Cart?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={confirmDelete}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CartPage;
