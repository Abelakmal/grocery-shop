import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { baseURL } from "../../helper/config";
import { ITransaction } from "../../types/transaction.type";
import axiosInstance from "../../helper/axios";

const useGetTransactions = (status: string | undefined) => {
  const [data, setData] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const token = localStorage.getItem("token");

  const fetch = useCallback(async () => {
    try {
      setLoading(true);

      const statusQuery = status ? `status=${status}` : "";

      const query = [statusQuery].filter(Boolean).join("&");

      const url = `${baseURL}/transactions${query ? "?" + query : ""}`;

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
  }, [status]);

  useEffect(() => {
    if (token) {
      fetch();
    }
  }, [fetch, token]);

  const refreshData = () => {
    fetch();
  };
  return { data, refreshData, loading };
};

export default useGetTransactions;
