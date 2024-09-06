import { useState } from "react";
import axiosInstance from "../../helper/axios";
import { baseURL } from "../../helper/config";
import axios from "axios";
import toast from "react-hot-toast";

const useUpdateCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = async (quantity: number, id: number) => {
    setLoading(true);
    setError(null);

    try {
      await axiosInstance.put(`${baseURL}/cart/${id}`, {
        quantity,
      });
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

  return { update, loading, error };
};

export default useUpdateCart;
