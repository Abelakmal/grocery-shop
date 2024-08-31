import { IoTrashOutline } from "react-icons/io5";
import { ICart } from "../../../types/cart.type";
import { FormatRupiah } from "@arismun/format-rupiah";
import { useEffect, useState } from "react";
import useUpdateCart from "../../../hooks/cart/useUpdateCart";
interface props {
  cart: ICart;
  refreshData: CallableFunction;
  index: number;
}
const CardCart = ({ cart, refreshData, index }: props) => {
  const [sum, setSum] = useState(cart.quantity);
  const { update } = useUpdateCart();

  useEffect(() => {
    updateCart();
  }, [sum]);

  const updateCart = async () => {
    if (sum !== cart.quantity) {
      await update(sum, cart.id as number);
      refreshData();
    }
  };

  return (
    <div className={`md:w-full w-screen bg-white p-4 md:rounded-lg mt-5  h-full flex mb-20 ${index > 0 && 1 && "max-md:border-t-4 max-md:pt-10"}`}>
      <div className="flex h-full  w-full">
        <img
          src={cart.product?.image}
          alt=""
          className="w-20 h-20 object-cover mr-4"
        />

        <div className="grid lg:grid-cols-2 grid-cols-1 w-full">
          <div className="md:ml-4  md:mr-20 lg:mr-7">
            <p className=" md:text-lg text-xs font font-semibold">
              {cart.product?.name}
            </p>
            <p className="text-nowrap lg:text-base text-[10px]">
              {cart.product?.description}
            </p>
          </div>
          <p className="font-semibold md:text-lg text-[10px] md:text-end">
            <FormatRupiah value={parseInt(cart.product?.price as string, 0)} />
          </p>
          <div className="flex items-center md:col-span-2 w-full md:justify-end justify-between">
            <IoTrashOutline className="mr-4" />
            <div className="flex border-2 max-md:text-xs mt-2 border-black  items-center rounded-lg justify-between w-max">
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
                disabled={!Boolean(cart.quantity > 0)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCart;
