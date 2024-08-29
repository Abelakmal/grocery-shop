import axios from 'axios';
import { useEffect, useState } from 'react';
import {  IProductWithStock } from '../../types/product.type';

const base_url: string | undefined = process.env.API_URL!;

const useGetStockById = (id: string | undefined) => {
  const [data, setData] = useState<IProductWithStock | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${base_url}/stock/${id}`,
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

export default useGetStockById;
