
import axios from 'axios';
import { useEffect, useState } from 'react';
import { baseURL } from '../../helper/config';
import { IOrder } from '../../types/order.type';

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
        baseURL + '/orders/' +
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
  const refreshData = () => {
    fetch();
  };
  return { data, refreshData, loading };
};
