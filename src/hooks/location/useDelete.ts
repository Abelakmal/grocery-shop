import { useState } from "react";
import axiosInstance from "../../helper/axios";
import { baseURL } from "../../helper/config";
import { useDispatch } from "react-redux";
import { getAddress } from "../../redux/features/addressSlice";

const useDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch<any>();

  const deleteAddress = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      setTimeout(async () => {
        await axiosInstance.delete(`${baseURL}/address/${id}`);
        dispatch(getAddress());
        setLoading(false);
      }, 1000);
    } catch (err: any) {
      setError(err.response.data?.error || "Server Error");
    }
  };

  return { deleteAddress, loading, error };
};

export default useDelete;
