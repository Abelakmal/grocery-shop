import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { IProductWithStock } from "../../types/product.type";

const base_url: string | undefined = process.env.API_URL!;

const useGetStockById = (id: string | undefined) => {
  const [data, setData] = useState<IProductWithStock | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${base_url}/stock/${id}`);
      setData(data.data);
    } catch (error) {
      if (error instanceof Error) {
        console.error("An error occurred:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    } finally {
      setLoading(false);
    }
  }, [id]);
  useEffect(() => {
    fetch();
  }, [fetch]);
  const refreshData = () => {
    fetch();
  };
  return { data, refreshData, loading };
};

export default useGetStockById;
