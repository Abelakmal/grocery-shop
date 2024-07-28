import { useEffect, useState } from "react";
import { IUser } from "../../types/user.type";
import { axiosInstance } from "../../helper/axios";
import { baseURL } from "../../helper/config";

const useCurrent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<IUser>();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, []);

  const getUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axiosInstance.get(`${baseURL}/users/current`);
      setData(data.data);
    } catch (err: any) {
      console.log(err);

      setError(err.response.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, getUser };
};

export default useCurrent;
