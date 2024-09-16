import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { baseURL } from "../../helper/config";
import { ITransaction } from "../../types/transaction.type";
import axiosInstance from "../../helper/axios";
import { IResponse } from "../../types/generale.type";

const useGetTransactionsByIdStore = (
  status: string | undefined,
  storeId: number,
  search: string
) => {
  const [data, setData] = useState<IResponse<ITransaction>>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);

      const statusQuery = status ? `status=${status}` : "";
      const searchQuery = search ? `search=${search}` : "";

      const query = [statusQuery, searchQuery].filter(Boolean).join("&");

      const url = `${baseURL}/transactions/${storeId}/store${
        query ? "?" + query : ""
      }`;

      const { data } = await axiosInstance.get(url);

      

      setData(data.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "An error occurred:",
          error.response?.data?.error || error
        );
      } else {
        console.error("An unexpected error occurred:", error);
      }
    } finally {
      setLoading(false);
    }
  }, [status, storeId, search]);

  useEffect(() => {
    if (storeId) {
      fetch();
    }
  }, [fetch, storeId]);

  const refreshData = () => {
    fetch();
  };
  return { data, refreshData, loading };
};

export default useGetTransactionsByIdStore;
