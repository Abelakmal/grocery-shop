import { IOrder } from '@/app/type.web/order.type';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useGetAllOrder = (
  id: number,
  categoryId: number,
  startDate: string,
  endDate: string,
  search: string,
) => {
  const [data, setData] = useState<IOrder[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch();
  }, [id, categoryId, startDate, endDate,search]);

  const fetch = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        'http://localhost:8000/api/orders/' +
          id +
          `?${
            startDate && endDate
              ? `startDate=${startDate}&endDate=${endDate}&${
                  categoryId
                    ? `categoryId=${categoryId}`
                    : `${search ? `search=${search}` : ''}`
                }`
              : `${
                  categoryId
                    ? `categoryId=${categoryId}&${
                        search ? `search=${search}` : ''
                      }`
                    : `${search ? `search=${search}` : ''}`
                }`
          }`,
      );

      setData(data.data);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const refreshData = (startDate: string = '', endDate: string = '') => {
    fetch();
  };
  return { data, refreshData, loading };
};
