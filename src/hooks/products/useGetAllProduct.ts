import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { ICategory } from "../../types/category.type";
import { IProduct } from "../../types/product.type";
import { baseURL } from "../../helper/config";
import { IResponse } from "../../types/generale.type";

const useGetAllProduct = (
  page: number,
  sort: string = "",
  search: string | null = null,
  filterCategory: ICategory[] | null = null
) => {
  const [data, setData] = useState<IResponse<IProduct>>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetch = useCallback(async () => {
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
      const pageQuery = `page=${page}` || "";

      const query = [searchQuery, categoryQuery, sortQuery, pageQuery]
        .filter(Boolean)
        .join("&");

      const url = `${baseURL}/product${query ? "?" + query : ""}`;

      const { data } = await axios.get(url);

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
  }, [search, filterCategory, sort, page]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const refreshData = () => {
    fetch();
  };
  return { data, refreshData, loading };
};

export default useGetAllProduct;
