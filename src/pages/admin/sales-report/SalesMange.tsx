import { useState } from "react";
import StoreList from "../components/StoreList";
import FilterReport from "../components/FilterReport";
import { FaSearch } from "react-icons/fa";
import { TableSalesReport } from "./components/TableSalesReport";
import { jwtPayload } from "../../../types/admin.type";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import useGetTransactionsByIdStore from "../../../hooks/transactions/useGetTransactionsByIdStore";

const SalesManage = () => {
  const [startDate, setStartDate] = useState("");
  const [search, setSearch] = useState("");
  const [endDate, setEndDate] = useState(new Date().toISOString());
  const [categoryId, setCategoryId] = useState(0);
  const { admin } = useSelector((state: RootState) => state.admin);
  const [storeId, setStoreId] = useState(admin.storeId as number);
  const token = localStorage.getItem("token");
  const decodeToken = jwtDecode<jwtPayload>(token as string);
  const { data, loading, refreshData } = useGetTransactionsByIdStore(
    "",
    storeId,
    search
  );

  return (
    <div className="w-full px-10 py-10 bg-[#272c2f] text-white">
      <h1 className={`md:text-3xl text-sm`}>Sales Report</h1>
      <div className="flex justify-between items-end w-full">
        {decodeToken.isSuper && (
          <StoreList storeId={storeId} setStoreId={setStoreId} />
        )}
        <div className="w-1/2">
          <form className="flex">
            <div className="bg-green-500 text-center p-3 rounded-tl-md rounded-bl-md">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Search product..."
              className="text-black text-sm w-full"
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
        <FilterReport
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          refreshData={refreshData}
        />
      </div>

      <div className="mt-4">
        {data && <TableSalesReport data={data.data} loading={loading} />}
      </div>
    </div>
  );
};

export default SalesManage;
