import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const CartPage = () => {
  return (
    <div className="   mx-auto p-10q2">
      <h1 className="text-2xl font-bold mb-4">Keranjang</h1>
      <div className="flex">
        <div className="bg-white p-20 flex items-center">
          <img src="keranjang.svg" alt="keranjang" />
          <div>
            <p className="text-3xl text-nowrap font-bold">
              Keranjang Belanja Kamu masih kosong
            </p>
            <Link to={"/products"}>
              <button className="bg-green-600 text-white p-2 rounded-lg">
                Mulai Belanja
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-white p-4 ml-10 w-96">
          <h2 className="text-xl font-bold">Ringkasan belanja</h2>
          <div className="flex justify-between my-4">
            <p className="text-lg">total</p>
            <p>-</p>
          </div>
          <button className="w-full text-xl bg-green-600 text-white  rounded-md  p-2 font-semibold">
            Beli
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
