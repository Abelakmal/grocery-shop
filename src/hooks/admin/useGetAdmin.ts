import { useEffect, useState } from "react";
import { baseURL } from "../../helper/config";
import axiosInstance from "../../helper/axios";
import { IAdmin } from "../../types/admin.type";

const useGetAdmin = () => {
  const [data, setData] = useState<IAdmin[]>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(baseURL + "/admin");
      console.log(data);
      
      setData(data.data);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const refreshData = () => {
    fetch();
  };
  return { data, refreshData, loading };
};

export default useGetAdmin;
