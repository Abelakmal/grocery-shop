import { useCallback, useEffect, useState } from "react";
import { baseURL } from "../../helper/config";
import axiosInstance from "../../helper/axios";
import { IAdmin } from "../../types/admin.type";
import { IResponse } from "../../types/generale.type";

const useGetAdmin = (page: number) => {
  const [data, setData] = useState<IResponse<IAdmin>>();
  const [loading, setLoading] = useState<boolean>(false);
  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(
        baseURL + "/admin" + `?page=${page}`
      );

      setData(data.data);
    } catch (error) {
      if (error instanceof Error) {
        console.error("An error occurred:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    } finally {
      setLoading(false);
    }
  }, [page]);
  
  useEffect(() => {
    fetch();
  }, [fetch]);

  const refreshData = () => {
    fetch();
  };
  return { data, refreshData, loading };
};

export default useGetAdmin;
