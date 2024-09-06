import { useState } from "react";
import axiosInstance from "../../helper/axios";
import { baseURL } from "../../helper/config";
import { useDispatch } from "react-redux";
import { getAddress } from "../../redux/features/addressSlice";
import { AppDispatch } from "../../redux/store";
import axios from "axios";
import toast from "react-hot-toast";

const useDelete = (refreshData: () => void) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const deleteAddress = async (id: number) => {
    setLoading(true);

    try {
      setTimeout(async () => {
        await axiosInstance.delete(`${baseURL}/address/${id}`);
        dispatch(getAddress());
        refreshData();
        setLoading(false);
      }, 1000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return { deleteAddress, loading };
};

export default useDelete;
