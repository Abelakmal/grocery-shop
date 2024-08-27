
import { useEffect, useState } from "react";
import { baseURL } from "../../helper/config";
import { IHistoryStock } from "../../types/stock.type";
import axiosInstance from "../../helper/axios";

export const useGetHistoriesStock = (
  id: number,
  categoryId: number,
  startDate: string,
  endDate: string,
  search: string
) => {
  const [data, setData] = useState<IHistoryStock[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id > 0) {
      fetch();
    }
  }, [id, categoryId, startDate, endDate, search]);

  const fetch = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(
        baseURL +
          "/stock/history/" +
          id +
          "/store" +
          `?${
            startDate && endDate
              ? `startDate=${startDate}&endDate=${endDate}&${
                  categoryId
                    ? `categoryId=${categoryId}`
                    : `${search ? `search=${search}` : ""}`
                }`
              : `${
                  categoryId
                    ? `categoryId=${categoryId}&${
                        search ? `search=${search}` : ""
                      }`
                    : `${search ? `search=${search}` : ""}`
                }`
          }`
      );

      setData(data.data);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const refreshData = (startDate: string = "", endDate: string = "") => {
    fetch();
  };
  return { data, refreshData, loading };
};
