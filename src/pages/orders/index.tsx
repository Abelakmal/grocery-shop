import { format } from "date-fns";
import useGetTransactions from "../../hooks/transactions/useGetTransactions";
import { GrShop } from "react-icons/gr";
import { FormatRupiah } from "@arismun/format-rupiah";
import { Link } from "react-router-dom";
import { HiArrowSmallLeft } from "react-icons/hi2";

const OrdersPage = () => {
  const { data } = useGetTransactions("");
  console.log(data);

  return (
    <div className="pt-44 md:pt-36">
      <h1 className="lg:text-2xl mt-4 md:sticky top-36 pt-1  bg-white hidden font-bold mb-4 md:flex items-center max-md:w-screen border-b pb-2">
        <Link to={"/"}>
          <span className="block  mx-3 hover:bg-gray-300">
            <HiArrowSmallLeft />
          </span>
        </Link>
        Detail Pesanan
      </h1>
      {data?.length > 0 ? (
        <div className="mx-4 md:mx-20">
          {data?.map((item, index) => {
            return (
              <Link to={`/orders/detail?transaction_id=${item.id}`} key={index}>
                <div className="shadow-md border-2 rounded mb-4 p-2">
                  <div className="flex justify-between border-b-2 w-full">
                    <div className="flex items-center ">
                      <GrShop className="text-lg mr-2" />
                      <div>
                        <p className="text-[10px] font-bold">belanja</p>
                        <p className="text-[10px] font-light">
                          {format(item.createdAt, "d MMM yyyy")}
                        </p>
                      </div>
                    </div>
                    <div>
                      {item.status === "PAID" && (
                        <p className="text-[10px] font-bold bg-green-100 text-green-600 h-max p-1 rounded">
                          Selesai
                        </p>
                      )}
                      {item.status === "PENDING_PAYMENT" && (
                        <p className="text-[10px] font-bold bg-blue-100 text-blue-600 h-max p-1 rounded">
                          Menunggu
                        </p>
                      )}
                      {item.status === "CANCELED" && (
                        <p className="text-[10px] font-bold bg-red-100 text-red-600 h-max p-1 rounded">
                          Dibatalkan
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex pt-4">
                    <img
                      className="h-10"
                      src={item.transactions_items[0].stock.product.image}
                      alt={item.transactions_items[0].stock.product.name}
                    />
                    <div className="ml-2">
                      <p className="font-bold ">
                        {item.transactions_items[0].stock.product.name.slice(
                          0,
                          30
                        )}
                      </p>
                      <p className=" text-[10px] text-gray-500">
                        {item.transactions_items[0].quantity} barang
                      </p>
                    </div>
                  </div>
                  {item.transactions_items.length > 1 && (
                    <p className=" text-[10px] text-gray-500 mt-4">
                      +{item.transactions_items.length} Product Lainnya
                    </p>
                  )}
                  <div className="mt-4">
                    <p className="text-[10px]">Total Belanja:</p>
                    <p className="text-xs font-bold mt-1">
                      <FormatRupiah value={item.total} />
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default OrdersPage;
