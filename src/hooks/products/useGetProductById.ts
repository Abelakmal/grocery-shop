import axios from 'axios';
import { useEffect, useState } from 'react';
import { IProduct } from '../../types/product.type';

const base_url: string | undefined = process.env.API_URL!;

const useGetProductById = (id: string | undefined) => {
  const [data, setData] = useState<IProduct | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${base_url}/products/${id}`,
      );
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

export default useGetProductById;
