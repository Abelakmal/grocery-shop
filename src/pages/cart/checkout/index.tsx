/* eslint-disable @typescript-eslint/no-explicit-any */
import { HiArrowSmallLeft } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../redux/store";
import useGetCarts from "../../../hooks/cart/useGetCarts";
import { FormatRupiah } from "@arismun/format-rupiah";
import { Button, Modal, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { countCart } from "../../../redux/features/cartSlice";
import PickLocation from "../../../components/PickLocation";
import { IoLocationSharp } from "react-icons/io5";
import useSnap from "../../../hooks/midtrans/useSnap";
import { getAddress } from "../../../redux/features/addressSlice";
import axiosInstance from "../../../helper/axios";
import { baseURL } from "../../../helper/config";
import toast from "react-hot-toast";
import axios from "axios";
import { ITransactionResponse } from "../../../types/transaction.type";

const CheckoutPage = () => {
  const { address } = useSelector((state: RootState) => state.address);
  const { quantity, total } = useSelector((state: RootState) => state.cart);
  const [openModal, setOpenModal] = useState(false);
  const ongkosKirim = 50000;
  const biayaJasaAplikasi = 3000;
  const totalBelanja = total + ongkosKirim + biayaJasaAplikasi;
  const { data } = useGetCarts(address.id);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [snap, setSnap] = useState(false);
  const { snapEmbed } = useSnap();
  const navigate = useNavigate();

  const pay = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(`${baseURL}/transactions/`, {
        address_id: address.id,
        total: totalBelanja,
      });
      const { data }: { data: ITransactionResponse } = response.data;
      setSnap(true);

      setTimeout(() => {
        snapEmbed(data.snap_token, {
          embedId: "snap-container",
          onSuccess: function (result: any) {
            setSnap(false);
            navigate(`/orders/detail?transaction_id=${result.order_id}`);
            console.log(result);
          },
          onPending: function (result: any) {
            setSnap(false);
            navigate(`/orders/detail?order_id=${result.order_id}`);
            console.log(result);
          },
          onError: function (result: any) {
            setSnap(false);
            navigate(`/orders/detail?order_id=${result.order_id}`);
            console.log(result);
          },
          onClose: function (result: any) {
            setSnap(false);
            navigate(`/orders/detail?order_id=${result.order_id}`);
            console.log(result);
          },
        });
      }, 1000);
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  console.log(snap);

  useEffect(() => {
    dispatch(getAddress());
  }, [dispatch]);

  useEffect(() => {
    if (data.length > 0) {
      dispatch(countCart(data));
    }
  }, [data, dispatch]);

  return (
    <div className=" w-full bg-white">
      <div className={`${snap ? "hidden" : "block"}`}>
        <h1 className="lg:text-2xl mt-4 font-bold mb-4 flex items-center max-md:w-screen border-b pb-2">
          <Link to={"/cart"}>
            <span className="block  mx-3 hover:bg-gray-300">
              <HiArrowSmallLeft />
            </span>
          </Link>
          Pengiriman
        </h1>
        <div className="p-2 border-b-4">
          <h1 className="text-[10px]">Alamat Pengiriman Kamu</h1>
          <div className="flex justify-between">
            <div>
              <p className="text-[10px] font-bold flex items-center">
                <IoLocationSharp className="text-green-500 text-base mr-2" />{" "}
                <span>
                  {address.label} • {address.recipient_name}
                </span>
              </p>
              <p className="text-[10px]">{address.details.slice(0, 40)} ...</p>
            </div>
          </div>
        </div>
        {data.map((cart, index: number) => {
          return (
            <div
              className={`md:w-full w-screen  p-4 md:rounded-lg mt-5   flex mb-20 md:mb-2 md:mt-2 ${
                index > 0 && 1 && "max-md:border-t-4 max-md:pt-10"
              }`}
              key={index}
            >
              <div className="flex h-full  w-full">
                <img
                  src={cart.stock?.product.image}
                  alt=""
                  className="w-20 h-20 object-cover mr-4"
                />

                <div className="w-full">
                  <div className="">
                    <p className=" md:text-base text-xs font font-semibold w-max ">
                      {cart.stock?.product.name}
                    </p>
                    <p className=" lg:text-xs text-[10px] ">
                      {cart.stock?.product.description.slice(0, 40)}...
                    </p>
                  </div>
                  <p className="font-semibold lg:text-lg text-[10px] md:text-end mt-2">
                    <span>{cart.quantity} x </span>
                    <FormatRupiah
                      value={parseInt(cart.stock?.product.price as string, 0)}
                    />
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <div className=" p-2">
          <h2 className="text-[10px] font-semibold">Ringkasan Belanjamu</h2>
          <ul className="w-full mt-2">
            <li className="flex justify-between">
              <p className="text-[10px]">
                Total Harga {`(${quantity} barang)`}
              </p>
              <p className="text-[10px]">
                <FormatRupiah value={total} />
              </p>
            </li>
            <li className="flex justify-between mt-2">
              <p className="text-[10px]">Total Ongkos Kirim</p>
              <p className="text-[10px]">
                <FormatRupiah value={ongkosKirim} />
              </p>
            </li>
            <li className="flex justify-between mt-2">
              <p className="text-[10px]">Biaya Jasa Aplikasi</p>
              <p className="text-[10px]">
                <FormatRupiah value={biayaJasaAplikasi} />
              </p>
            </li>
            <li className="flex justify-between mt-4 border-t-[1px] pt-4">
              <p className="text-[10px] ">Total Belanja</p>
              <p className="text-[12px] font-bold">
                <FormatRupiah value={totalBelanja} />
              </p>
            </li>
          </ul>
        </div>
        <div className="flex justify-center my-4">
          <Button
            disabled={!address.id}
            color={"success"}
            className="h-max"
            onClick={pay}
          >
            Pilih Pembayaran
          </Button>
        </div>

        <Modal
          size={"6xl"}
          show={openModal}
          onClose={() => setOpenModal(false)}
        >
          <Modal.Header>
            <div className="md:text-4xl ">Delivere to?</div>
          </Modal.Header>
          <Modal.Body>
            <PickLocation />
          </Modal.Body>
        </Modal>
      </div>
      <div className={`h-screen w-full ${!snap ? "hidden" : "block"}`}>
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <Spinner aria-label="Default status example" />
          </div>
        ) : (
          <div id="snap-container" className="w-full"></div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
