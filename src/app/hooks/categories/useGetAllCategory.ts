import { ICategory } from '@/app/type.web/category.type';
import axios from 'axios';
import { useEffect, useState } from 'react';

const useGetAllCategory = () => {
  const [data, setData] = useState<ICategory[]>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(' http://localhost:8000/api/categories');
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
