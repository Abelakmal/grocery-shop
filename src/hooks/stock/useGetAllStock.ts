import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { ICategory } from "../../types/category.type";
import { IProductWithStock } from "../../types/product.type";
import { baseURL } from "../../helper/config";
import { IResponse } from "../../types/generale.type";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const useGetAllStock = (
  sort: string = "",
  search: string | null = null,
  filterCategory: ICategory[] | null = null,
  pageSize: number = 10,
  setHasMore?: CallableFunction
) => {
  const [data, setData] = useState<IResponse<IProductWithStock>>();
  const [loading, setLoading] = useState<boolean>(false);
  const { address } = useSelector((state: RootState) => state.address);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      

      const latitudeQuery = address.id ? `latitude=${address.latitude}` : "";
      const longitudeQuery = address.id ? `longitude=${address.longitude}` : "";

      const categoryQuery =
        filterCategory && filterCategory.length > 0
          ? filterCategory
              .map((value, index) => `category${index + 1}=${value.id}`)
              .join("&")
          : "";

      const searchQuery = search ? `search=${search}` : "";

      const sortQuery = sort ? `sort=${sort}` : "";
      const pageSizeQuery = `pageSize=${pageSize}` || "";

      const query = [
        searchQuery,
        categoryQuery,
        sortQuery,
        pageSizeQuery,
        latitudeQuery,
        longitudeQuery,
      ]
        .filter(Boolean)
        .join("&");

      const url = `${baseURL}/stock${query ? "?" + query : ""}`;

      const { data } = await axios.get(url);
      if (setHasMore) {
        
        setHasMore(data.total >= data.limit);
      }

      setData(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("An error occurred:", error.response?.data.error);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    } finally {
      setLoading(false);
    }
  }, [search, filterCategory, sort, pageSize, address, setHasMore]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const refreshData = () => {
    fetch();
  };
  return { data, refreshData, loading };
};

export default useGetAllStock;
