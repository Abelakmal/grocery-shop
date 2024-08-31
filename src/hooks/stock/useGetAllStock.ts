import axios from "axios";
import { useEffect, useState } from "react";
import { ICategory } from "../../types/category.type";
import { IProductWithStock } from "../../types/product.type";
import { baseURL } from "../../helper/config";
import { IResponse } from "../../types/generale.type";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { IAddress } from "../../types/address.type";

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
  useEffect(() => {
    fetch();
  }, [search, filterCategory, sort, pageSize, address]);
  const fetch = async () => {
    try {
      setLoading(true);

      const main: IAddress | undefined = address.find(
        (address: IAddress) => address.main === true
      );

      const latitudeQuery = main ? `latitude=${main.latitude}` : "";
      const longitudeQuery = main ? `longitude=${main.longitude}` : "";


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
