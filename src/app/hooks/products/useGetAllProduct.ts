import { ICategory } from '@/app/type.web/category.type';
import { IProduct } from '@/app/type.web/product.type';
import axios from 'axios';
import { useEffect, useState } from 'react';

const useGetAllProduct = (
  search: string | null = null,
  filterCategory: ICategory[] | null = null,
) => {

  const [data, setData] = useState<IProduct[]>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    fetch();
  }, [search, filterCategory]);
  const fetch = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8000/api/products${
          search ? '?search=' + search : ''
        }${
          filterCategory && filterCategory?.length > 0
            ? '?' +
              filterCategory.map(
                (value, index) =>
                  `category${index + 1}=${value.id}&`,
              )
            : ''
        }`.replaceAll(',', ''),
      );
      console.log(data);

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

export default useGetAllProduct;
