import { useState } from "react";
import axiosInstance from "../../helper/axios";
import { baseURL } from "../../helper/config";
import { ICart } from "../../types/cart.type";
import toast from "react-hot-toast";
import axios from "axios";

const useCreateCart = () => {
  const [loading, setLoading] = useState(false);

  const create = async (data: ICart) => {
    setLoading(true);

    try {
      await axiosInstance.post(`${baseURL}/cart`, data);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { create, loading };
};

export default useCreateCart;
