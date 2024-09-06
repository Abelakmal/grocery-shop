import { useState } from "react";
import StoreList from "../components/StoreList";
import FilterReport from "../components/FilterReport";
import { TableStockReport } from "./components/TableStockReport";
import { FaSearch } from "react-icons/fa";
import { useGetHistoriesStock } from "../../../hooks/stock/useGetHistoriesStock";
import { jwtPayload } from "../../../types/admin.type";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { Pagination } from "flowbite-react";
import { RootState } from "../../../redux/store";

const StockReportManage = () => {
  const [page, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [search, setSearch] = useState("");
  const [endDate, setEndDate] = useState(new Date().toISOString());
  const [categoryId, setCategoryId] = useState(0);
  const { admin } = useSelector((state: RootState) => state.admin);
  const [storeId, setStoreId] = useState(admin.storeId);
  const token = localStorage.getItem("token");
  const decodeToken = jwtDecode<jwtPayload>(token as string);
  const { data, loading, refreshData } = useGetHistoriesStock(
    storeId,
    categoryId,
    startDate,
    endDate,
    search,
    page
  );

  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="w-full md:px-10 md:py-10 bg-[#272c2f] text-white">
      <h1 className={`md:text-3xl text-sm`}>Stock Report</h1>
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
        {data && <TableStockReport data={data.data} loading={loading} />}
      </div>
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

export default StockReportManage;
