import { Link } from "react-router-dom";
import useGetCarts from "../../hooks/cart/useGetCarts";
import { ICart } from "../../types/cart.type";
import CardCart from "./components/CardCart";
import { FormatRupiah } from "@arismun/format-rupiah";
import { useEffect } from "react";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { countCart } from "../../redux/features/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, refreshData } = useGetCarts();
  const { total } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(countCart(data));
  }, [data]);


  return (
    <div
      className={`pt-40 md:bg-gray-200 bg-white    md:flex items-center flex-col mb-10 ${
        data.length < 1 ? "h-screen" : "h-full"
      }`}
    >
      <div className="w-max ">
        <h1 className="md:text-2xl font-bold mb-4 flex items-center max-md:w-screen border-b pb-2">
          <Link to={"/"}>
            <span className="block md:hidden mx-3 hover:bg-gray-300">
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
              <div className="md:flex hidden items-center justify-between w-full bg-white px-5 py-3 rounded-tr-lg rounded-tl-lg">
                <div className="flex items-center">
                  <input type="checkbox" />
                  <p className="ml-4">Semua</p>
                </div>

                <button className="text-green-600">Hapus</button>
              </div>
              {data.map((data: ICart, index: number) => {
                return (
                  <CardCart cart={data} key={index} index={index} refreshData={refreshData} />
                );
              })}
            </div>
          )}
          <div className="bg-white p-4 ml-10 xl:w-96  md:flex hidden flex-col justify-between rounded-lg">
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
    </div>
  );
};

export default CartPage;
