import axios from "axios";
import { useEffect, useState } from "react";
import { ICategory } from "../../types/category.type";
import { IProductWithStock } from "../../types/product.type";
import { baseURL } from "../../helper/config";
import { IResponse } from "../../types/generale.type";

const useGetAllStock = (
  sort: string = "",
  search: string | null = null,
  filterCategory: ICategory[] | null = null,
  pageSize: number | null = null,
  setHasMore?: CallableFunction
) => {
  const [data, setData] = useState<IResponse<IProductWithStock>>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    fetch();
  }, [search, filterCategory, sort, pageSize]);
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
      const pageSizeQuery = `pageSize=${pageSize}` || "";

      const query = [searchQuery, categoryQuery, sortQuery, pageSizeQuery]
        .filter(Boolean)
        .join("&");

      const url = `${baseURL}/stock${query ? "?" + query : ""}`;

      const { data } = await axios.get(url);
      if (setHasMore) {
        setHasMore(data.total === data.limit);
      }

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

export default useGetAllStock;
