import { useState } from "react";
import axiosInstance from "../../helper/axios";
import { baseURL } from "../../helper/config";
import { useDispatch } from "react-redux";
import { getAddress } from "../../redux/features/addressSlice";
import { AppDispatch } from "../../redux/store";
import axios from "axios";
import toast from "react-hot-toast";

const useChangeMain = (refreshData: () => void) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const change = async (id: number) => {
    setLoading(true);

    try {
      await axiosInstance.patch(`${baseURL}/address/${id}/main`);
      dispatch(getAddress());
      refreshData();
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return { change, loading };
};

export default useChangeMain;
