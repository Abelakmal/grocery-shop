import { useEffect, useState } from "react";
import axiosInstance from "../../helper/axios";
import { baseURL } from "../../helper/config";
import { IStock } from "../../types/stock.type";

export const useGetStockByIdStore = (id: number) => {
  

  const [data, setData] = useState<IStock>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (id > 0) {
      fetch();
    }
  }, [id]);
  const fetch = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(baseURL + "/stock/" + id  + "/store");

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
