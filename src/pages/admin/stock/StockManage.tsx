import { Pagination } from "flowbite-react";
import { useState } from "react";
import StoreList from "../components/StoreList";
import { useGetStockByIdStore } from "../../../hooks/stock/useGetStockByIdStore";
import { jwtPayload } from "../../../types/admin.type";
import { jwtDecode } from "jwt-decode";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { TableStocks } from "./components/TableStocks";
import { RootState } from "../../../redux/store";
import { Toaster } from "react-hot-toast";

const StockManage = () => {
  const [page, setCurrentPage] = useState(1);
  const { admin } = useSelector((state: RootState) => state.admin);
  const [storeId, setStoreId] = useState(admin.storeId);
  const [search, setSearch] = useState("");
  const { data, loading, refreshData } = useGetStockByIdStore(storeId,search, page);
  const token = localStorage.getItem("token");
  const decodeToken = jwtDecode<jwtPayload>(token as string);
  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="w-full md:px-10 md:py-10 bg-[#272c2f] text-white">
      <Toaster />
      <h1 className={`md:text-3xl text-sm`}>Manage Stock </h1>
      <div className="flex justify-between items-end w-full">
        {decodeToken.isSuper && (
          <StoreList storeId={storeId} setStoreId={setStoreId} />
        )}
        <div className="md:w-1/2 w-full">
          <form className="flex">
            <div className="bg-green-500  text-center p-3 rounded-tl-md rounded-bl-md">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Search product..."
              className="text-black md:text-sm text-[10px] w-full"
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
        </div>
      {data ? (
        <TableStocks
          stocks={data.data}
          refreshData={refreshData}
          loading={loading}
        />
      ) : (
        <div className="flex  h-screen w-full justify-center items-center">
          No Stock
        </div>
      )}
      {data && (
        <div className=" text-[10px] flex w-full justify-center mt-10">
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(data?.total / data?.limit)}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default StockManage;
