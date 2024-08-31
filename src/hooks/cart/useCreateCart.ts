import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../helper/axios";
import { baseURL } from "../../helper/config";
import { ICart } from "../../types/cart.type";
import toast from "react-hot-toast";

const useCreateCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const create = async (data: ICart) => {
    setLoading(true);
    setError(null);

    try {
      await axiosInstance.post(`${baseURL}/cart`, data);

      navigate("/cart");
      toast.success("Successfully!", { duration: 3000 });
    } catch (err: any) {
      
      setError(err.response.data?.error || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
};

export default useCreateCart;
