import { useEffect, useState } from "react";
import axiosInstance from "../../helper/axios";
import { baseURL } from "../../helper/config";
import { IStock } from "../../types/stock.type";
import { IResponse } from "../../types/generale.type";

export const useGetStockByIdStore = (id: number, page: number) => {
  const [data, setData] = useState<IResponse<IStock>>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (id > 0) {
      fetch();
    }
  }, [id, page]);
  const fetch = async () => {
    try {
      setLoading(true);

      const pageQuery = `page=${page}` || "";

      const query = [pageQuery].filter(Boolean).join("&");

      const { data } = await axiosInstance.get(
        `${baseURL}"/stock/${id}/store${query ? "?" + query : ""}`
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
