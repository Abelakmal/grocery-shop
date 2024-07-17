import axios from "axios";
import { useEffect, useState } from "react";
import { ICategory } from "../../types/category.type";

const base_url: string | undefined = process.env.API_URL!;

const useGetAllCategory = () => {
  const [data, setData] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${base_url}/categories`);
      setData(data);
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

export default useGetAllCategory;
