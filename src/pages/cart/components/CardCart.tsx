import { IoTrashOutline } from "react-icons/io5";
import { ICart } from "../../../types/cart.type";
import { FormatRupiah } from "@arismun/format-rupiah";
import { useCallback, useEffect, useState } from "react";
import useUpdateCart from "../../../hooks/cart/useUpdateCart";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import axiosInstance from "../../../helper/axios";
import { baseURL } from "../../../helper/config";
interface props {
  cart: ICart;
  refreshData: CallableFunction;
  index: number;
}
const CardCart = ({ cart, refreshData, index }: props) => {
  const [sum, setSum] = useState(cart.quantity);

  const [openModal, setOpenModal] = useState(false);
  const { update } = useUpdateCart();

  const updateCart = useCallback(async () => {
    if (sum <= cart.stock.amount) {
      await update(sum, cart.id as number);
      refreshData();
    }
  }, [sum, cart, update, refreshData]);

  useEffect(() => {
    if (sum !== cart.quantity) {
      updateCart();
    }
  }, [updateCart, sum, cart.quantity]);

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`${baseURL}/cart/${cart.id}`);
      setOpenModal(false);
      refreshData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`md:w-full w-screen bg-white p-4 md:rounded-lg mt-5  h-full flex mb-20 md:mb-2 md:mt-2 ${
        index > 0 && 1 && "max-md:border-t-4 max-md:pt-10"
      }`}
    >
      <div className="flex h-full  w-full">
        <img
          src={cart.stock?.product.image}
          alt=""
          className="w-20 h-20 object-cover mr-4"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
          <div className="">
            <p className=" md:text-base text-xs font font-semibold w-max ">
              {cart.stock?.product.name}
            </p>
            <p className=" lg:text-xs text-[10px] ">
              {cart.stock?.product.description.slice(0, 40)}...
            </p>
          </div>
          <p className="font-semibold lg:text-lg text-[10px] md:text-end">
            <FormatRupiah
              value={parseInt(cart.stock?.product.price as string, 0)}
            />
          </p>
          <div className="flex items-center md:col-span-2 w-full md:justify-end justify-between">
            <IoTrashOutline
              className="mr-4 cursor-pointer"
              onClick={() => setOpenModal(!openModal)}
            />
            <div className="flex border-2 max-lg:text-xs mt-2 border-black  items-center rounded-lg justify-between w-max">
              <button
                onClick={() => setSum((prev) => (prev > 1 ? prev - 1 : sum))}
                className="hover:bg-gray-200 h-full px-4 rounded-lg"
              >
                -
              </button>
              <p className="md:px-2">{sum}</p>
              <button
                onClick={() => setSum((prev) => (prev < 10 ? prev + 1 : sum))}
                className="hover:bg-gray-200 h-full px-4 rounded-lg"
                disabled={!(cart.stock?.amount > 0)}
              >
                +
              </button>
            </div>
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

export default CardCart;
