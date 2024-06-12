import { IProduct } from '@/app/type.web/product.type';
import axios from 'axios';
import { useEffect, useState } from 'react';

const useGetProductById = (id: number) => {
  const [data, setData] = useState<IProduct>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8000/api/products/${id}`,
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

export default useGetProductById;
