import { useEffect, useState } from "react";
import { IStoreBranch } from "../../types/store.type";
import axiosInstance from "../../helper/axios";
import { baseURL } from "../../helper/config";

export const useGetStore = () => {

    const [data, setData] = useState<IStoreBranch[]>();
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        fetch();

    },[]);
    const fetch = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(baseURL + "/store-branch");
  
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