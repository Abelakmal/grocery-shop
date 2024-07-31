import { useState } from "react";
import axiosInstance from "../../helper/axios";
import { baseURL } from "../../helper/config";
import { useDispatch } from "react-redux";
import { getAddress } from "../../redux/features/addressSlice";

const useChangeMain = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch<any>();

  const change = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      setTimeout(async () => {
        await axiosInstance.patch(`${baseURL}/address/${id}/main`);
        dispatch(getAddress());
        setLoading(false);
      }, 1000);
    } catch (err: any) {
      setError(err.response.data?.error || "Server Error");
    }
  };

  return { change, loading, error };
};

export default useChangeMain;
