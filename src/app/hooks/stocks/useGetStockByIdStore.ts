import { IStock } from '@/app/type.web/stock.type';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useGetStockByIdStore = (id: number) => {
  console.log(id);

  const [data, setData] = useState<IStock>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    fetch();
  }, [id]);
  const fetch = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        'http://localhost:8000/api/stocks/' + id,
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
