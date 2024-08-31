import { useState } from "react";
import axiosInstance from "../../helper/axios";
import { baseURL } from "../../helper/config";

const useUpdateCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = async (quantity: number,id:number) => {
    setLoading(true);
    setError(null);

    try {
      await axiosInstance.put(`${baseURL}/cart/${id}`, {
        quantity,
      });

    } catch (err: any) {
      setError(err.response.data?.error || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
};

export default useUpdateCart;
