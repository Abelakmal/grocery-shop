import { useCallback, useEffect, useState } from "react";
import { ICart } from "../../types/cart.type";
import axiosInstance from "../../helper/axios";
import axios from "axios";
import toast from "react-hot-toast";

const base_url: string | undefined = process.env.API_URL!;

const useGetCarts = () => {
  const token = localStorage.getItem("token") || "";
  const [data, setData] = useState<ICart[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`${base_url}/cart`);
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
  }, []);
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

export default useGetCarts;
