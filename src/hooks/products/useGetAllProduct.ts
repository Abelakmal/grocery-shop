import axios from "axios";
import { useEffect, useState } from "react";
import { ICategory } from "../../types/category.type";
import { IProduct } from "../../types/product.type";

const base_url: string | undefined = process.env.API_URL!;

const useGetAllProduct = (
  sort: string | null = "random",
  search: string | null = null,
  filterCategory: ICategory[] | null = null
) => {
  const [data, setData] = useState<IProduct[]>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    fetch();
  }, [search,filterCategory,sort]);
  const fetch = async () => {
    try {
      setLoading(true);
      
      const categoryQuery =
        filterCategory && filterCategory.length > 0
          ? filterCategory
              .map((value, index) => `category${index + 1}=${value.id}`)
              .join("&")
          : "";

      const searchQuery = search ? `search=${search}` : "";


      const sortQuery = sort ? `sort=${sort}` : "";

      const query = [searchQuery, categoryQuery ,sortQuery].filter(Boolean).join("&");

      const url = `${base_url}/products${query ? "?" + query : ""}`;

      const { data } = await axios.get(url);


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

export default useGetAllProduct;
