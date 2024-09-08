
import { useCallback, useEffect, useState } from "react";
import { ITransaction } from "../../types/transaction.type";
import axiosInstance from "../../helper/axios";
import { AxiosError } from "axios";

const base_url: string | undefined = process.env.API_URL!;

const useGetTransactionById = (id: string | null) => {
  const [data, setData] = useState<ITransaction | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`${base_url}/transactions/${id}`);
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
  }, [id]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const refreshData = () => {
    fetch();
  };
  return { data, refreshData, loading };
};

export default useGetTransactionById;
