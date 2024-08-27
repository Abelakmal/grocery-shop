import { Spinner } from "flowbite-react";
import { useState } from "react";
import { TableProducts } from "./components/TableProducts";
import StoreList from "../components/StoreList";
import { useGetStockByIdStore } from "../../../hooks/stock/useGetStockByIdStore";
import { jwtPayload } from "../../../types/admin.type";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

const StockManage = () => {
  const { admin } = useSelector((state: any) => state.admin);
  const [storeId, setStoreId] = useState(admin.storeId);
  const { data, loading, refreshData } = useGetStockByIdStore(storeId);
  const token = localStorage.getItem("token");
  const decodeToken = jwtDecode<jwtPayload>(token as string);

  if (loading) {
    return (
      <div className="h-sceen w-full flex justify-center items-center bg-[#272c2f]">
        <Spinner aria-label="Extra large spinner example" size="xl" />
        <p className="ml-2 text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full px-10 py-10 bg-[#272c2f] text-white">
      <h1 className={`text-3xl`}>Manage Stock </h1>
      {decodeToken.isSuper && (
        <StoreList storeId={storeId} setStoreId={setStoreId} />
      )}
      {data ? (
        <TableProducts stocks={data} refreshData={refreshData} />
      ) : (
        <>No Products</>
      )}
    </div>
  );
};

export default StockManage;
