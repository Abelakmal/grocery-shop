import { useEffect, useState } from "react";
import { baseURL } from "../../helper/config";
import { IHistoryStock } from "../../types/stock.type";
import axiosInstance from "../../helper/axios";
import { IResponse } from "../../types/generale.type";

export const useGetHistoriesStock = (
  id: number,
  categoryId: number,
  startDate: string,
  endDate: string,
  search: string,
  page: number
) => {
  const [data, setData] = useState<IResponse<IHistoryStock>>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id > 0) {
      fetch();
    }
  }, [id, categoryId, startDate, endDate, search, page]);

  const fetch = async () => {
    try {
      setLoading(true);

      const categoryIdQuery = categoryId ? `categoryId=${categoryId}` : "";

      const searchQuery = search ? `search=${search}` : "";

      const startDateQuery = startDate ? `startDate=${startDate}` : "";
      const endDateQuery = startDate ? `endDate=${endDate}` : "";
      const pageQuery = `page=${page}` || "";

      const query = [
        searchQuery,
        categoryIdQuery,
        startDateQuery,
        endDateQuery,
        pageQuery,
      ]
        .filter(Boolean)
        .join("&");

        

      const { data } = await axiosInstance.get(
        `${baseURL}/stock/history/${id}/store${query ? "?" + query : ""}`
      );

      setData(data.data);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const refreshData = () => {
    fetch();
  };
  return { data, refreshData, loading };
};
