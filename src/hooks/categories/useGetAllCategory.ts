import axios from "axios";
import { useEffect, useState } from "react";
import { ICategory } from "../../types/category.type";
import toast from "react-hot-toast";
import { baseURL } from "../../helper/config";

const useGetAllCategory = () => {
  const [data, setData] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseURL}/category`);
      setData(data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  const refreshData = () => {
    fetch();
  };
  return { data, refreshData, loading };
};

export default useGetAllCategory;
