import { IStoreBranch } from '@/app/type.web/store.type';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const useGetStores = () => {
    const [data, setData] = useState<IStoreBranch[]>();
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
      fetch();
    }, []);
    const fetch = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          ' http://localhost:8000/api/stores',
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
}

export default useGetStores