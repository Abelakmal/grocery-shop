import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../helper/axios";
import { baseURL } from "../../helper/config";
import { IStock } from "../../types/stock.type";
import { IResponse } from "../../types/generale.type";
import axios from "axios";
import toast from "react-hot-toast";

export const useGetStockByIdStore = (
  id: number | undefined,
  search: string,
  page: number
) => {
  const [data, setData] = useState<IResponse<IStock>>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);

      const pageQuery = `page=${page}` || "";
      const searchQuery = search ? `search=${search}` : "";

      const query = [pageQuery, searchQuery].filter(Boolean).join("&");

      const { data } = await axiosInstance.get(
        `${baseURL}/stock/${id}/store${query ? "?" + query : ""}`
      );

      setData(data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [page, id, search]);

  useEffect(() => {
    if (id) {
      fetch();
    }
  }, [id, fetch]);

  const refreshData = () => {
    fetch();
  };
  return { data, refreshData, loading };
};
