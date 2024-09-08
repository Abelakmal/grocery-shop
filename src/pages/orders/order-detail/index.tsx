import { Link, useSearchParams } from "react-router-dom";
import useGetTransactionById from "../../../hooks/transactions/useGetTransactionById";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { convertStatus } from "../../../helper/converStatus";
import { format } from "date-fns";
import { FormatRupiah } from "@arismun/format-rupiah";
import { Button } from "flowbite-react";

const OrderDetail = () => {
  const [searchParams] = useSearchParams();

  const { data } = useGetTransactionById(searchParams.get("transaction_id"));
  console.log(data);

  const ongkosKirim = 50000;
  const biayaJasaAplikasi = 3000;

  return (
    <div className="bg-white h-full ">
      <h1 className="lg:text-2xl mt-4 font-bold mb-4 flex items-center max-md:w-screen border-b pb-2">
        <Link to={"/orders"}>
          <span className="block  mx-3 hover:bg-gray-300">
            <HiArrowSmallLeft />
          </span>
        </Link>
        Detail Pesanan
      </h1>
      {data ? (
        <div className="md:mx-20">
          <p className="mx-2  text-sm font-medium pb-4 border-b-2">
            Pesanan{" "}
            <span
              className={` ${
                data.status === "PENDING_PAYMENT" && "text-yellow-300"
              }
              ${data.status === "CANCELED" && "text-red-500"}
              ${data.status === "PAID" && "text-green-500"}`}
            >
              {convertStatus(data?.status)}
            </span>
          </p>
          <div className="flex justify-between items-center    pb-2  ">
            <p className=" text-xs py-2 mx-2">Tanggal Pembelian</p>
            <p className="text-xs text-gray-600 mx-2">
              {format(new Date(data?.createdAt), "dd MMMM yyyy, HH:mm")} WIB
            </p>
          </div>
          <div className="border-y-4">
            <h2 className="mx-2 my-4 text-sm font-medium">Detail Pesanan</h2>

            {data.transactions_items.map((item, index: number) => {
              return (
                <div
                  className="grid grid-cols-3 h-max border-2 m-3 p-3 rounded shadow-lg"
                  key={index}
                >
                  <div className="">
                    <img
                      className="w-20"
                      src={item.stock.product.image}
                      alt={item.stock.product.name}
                    />
                  </div>
                  <div className="w-full ml-3 col-span-2">
                    <p className="text-xs font-medium">
                      {item.stock.product.name}
                    </p>
                    <p className="text-xs font-light mt-2">
                      {item.quantity} x <FormatRupiah value={item.price} />
                    </p>
                  </div>
                  <div className="col-span-3 pt-4 mt-4 border-t-2 w-full">
                    <p className="text-[10px] ">total harga</p>
                    <p className="font-semibold">
                      <FormatRupiah value={item.price * item.quantity} />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="border-b-4">
            <h3 className="mx-2 my-4 text-sm font-medium">
              Rincian Pembayaraan
            </h3>
            <ul className="mx-2 mb-4">
              <li className="flex justify-between">
                <p className="text-[10px]">
                  Total Harga{" "}
                  {`(${data.transactions_items.reduce(
                    (acc, item) => acc + item.quantity,
                    0
                  )} barang)`}
                </p>
                <p className="text-[10px]">
                  <FormatRupiah
                    value={data.transactions_items.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    )}
                  />
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
                <p className="text-[12px] font-bold ">Total Belanja</p>
                <p className="text-[12px] font-bold">
                  <FormatRupiah value={data.total} />
                </p>
              </li>
            </ul>
          </div>
          <div className="h-full my-4 w-full px-2">
            {data.status === "PENDING_PAYMENT" && (
              <Link to={`${data.snap_redirect_url}`} target="_blank">
                <Button color={"success"} className="w-full">
                  Bayar
                </Button>
              </Link>
            )}
            {data.status === "PAID" && (
              <Button disabled={true} color={"success"} className="w-full">
                Beri Ulasan{" "}
                <span className="ml-2 text-yellow-200"> (on proggress)</span>
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default OrderDetail;
