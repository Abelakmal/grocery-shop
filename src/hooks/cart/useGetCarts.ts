import { useEffect, useState } from "react";
import { ICart } from "../../types/cart.type";
import axiosInstance from "../../helper/axios";

const base_url: string | undefined = process.env.API_URL!;

const useGetCarts = () => {
  const token = localStorage.getItem("token") || "";
  const [data, setData] = useState<ICart[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (token) {
      fetch();
    }
  }, []);
  const fetch = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`${base_url}/cart`);
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

export default useGetCarts;
