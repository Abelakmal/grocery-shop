import { useEffect, useState } from "react";
import { baseURL } from "../../helper/config";
import axiosInstance from "../../helper/axios";
import { IAdmin } from "../../types/admin.type";
import { IResponse } from "../../types/generale.type";

const useGetAdmin = (page: number) => {
  const [data, setData] = useState<IResponse<IAdmin>>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(
        baseURL + "/admin" + `?page=${page}`
      );

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
