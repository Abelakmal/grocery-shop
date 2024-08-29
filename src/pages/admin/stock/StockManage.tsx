import { Pagination, Spinner } from "flowbite-react";
import { useState } from "react";
import StoreList from "../components/StoreList";
import { useGetStockByIdStore } from "../../../hooks/stock/useGetStockByIdStore";
import { jwtPayload } from "../../../types/admin.type";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { TableStocks } from "./components/TableStocks";


const StockManage = () => {
  const [page, setCurrentPage] = useState(1);
  const { admin } = useSelector((state: any) => state.admin);
  const [storeId, setStoreId] = useState(admin.storeId);
  const { data, loading, refreshData } = useGetStockByIdStore(storeId,page);
  const token = localStorage.getItem("token");
  const decodeToken = jwtDecode<jwtPayload>(token as string);
  const onPageChange = (page: number) => setCurrentPage(page);

  if (loading) {
    return (
      <div className="h-sceen w-full flex justify-center items-center bg-[#272c2f]">
        <Spinner aria-label="Extra large spinner example" size="xl" />
        <p className="ml-2 text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full md:px-10 md:py-10 bg-[#272c2f] text-white">
      <h1 className={`md:text-3xl text-sm`}>Manage Stock </h1>
      {decodeToken.isSuper && (
        <StoreList storeId={storeId} setStoreId={setStoreId} />
      )}
      {data ? (
        <TableStocks stocks={data.data} refreshData={refreshData} />
      ) : (
        <div className="flex  h-screen w-full justify-center items-center">No Products</div>
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
