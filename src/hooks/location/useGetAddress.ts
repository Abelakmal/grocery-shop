import { useCallback, useEffect, useState } from "react";
import { IAddress } from "../../types/address.type";
import axiosInstance from "../../helper/axios";
import { baseURL } from "../../helper/config";

const useGetAddress = () => {
  const [address, setData] = useState<IAddress[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(baseURL + "/address");

      setData(data.data);
    } catch (error) {
      if (error instanceof Error) {
        console.error("An error occurred:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const refreshData = () => {
    fetch();
  };
  return { address, refreshData, loading };
};

export default useGetAddress;
