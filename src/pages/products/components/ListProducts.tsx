import { FormatRupiah } from "@arismun/format-rupiah";
import { Button } from "flowbite-react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { RiMenu2Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import useGetAllStock from "../../../hooks/stock/useGetAllStock";

export const ListProducts = ({ filterCategory, setShowSide }: any) => {
  const [sort, setSort] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(10);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search");
  const [hasMore, setHasMore] = useState(true);

  const { data, loading } = useGetAllStock(
    sort,
    search,
    filterCategory,
    pageSize,
    setHasMore
  );

  

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (hasMore) {
        setPageSize((prevPageSize) => prevPageSize + 10);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  


  return (
    <div className="w-full h-full mb-5 bg-white lg:pt-64 pt-28">
      {data ? (
        <>
          <div className="flex fixed top-[8.5rem] h-max items-center z-40 bg-white w-full shadow-lg">
            <div
              className="ml-2  h-max w-max p-2 rounded-lg  cursor-pointer border-2 "
              onClick={() => setShowSide(true)}
            >
              <RiMenu2Fill />
            </div>
            <div className="flex text-nowrap  justify-between items-center text-[14px] sm:text-xl h-full p-4   w-full">
              <p className="max-md:text-[10px]">
                Showing 1-{data?.data.length} of{" "}
                {data?.total} Results {search ? `of "${search}"` : ""}
              </p>

              <div className="flex items-center ">
                <p className="mr-3 max-md:text-[10px]">Sort By: </p>
                <select
                  className="rounded-lg max-md:text-[8px] w-max h-max"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value={""} className="max-md:text-[10px]">
                    Default
                  </option>
                  <option value={"latest"} className="max-md:text-[10px]">
                    latest
                  </option>
                  <option value={"higher"} className="max-md:text-[10px]">
                    highest price
                  </option>
                  <option value={"lowest"} className="max-md:text-[10px]">
                    lowest price
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center w-full h-full  max-xl:mt-32 mt-4 ">
            <div className="grid  p-2 grid-cols-2 md:grid-cols-4 xl:grid-cols-6  gap-2 lg:gap-8 lg:mb-32 ">
              {data.data?.map((product) => {
                return (
                  <div
                    key={product.id}
                    className="bg-[#f2f2f2] border rounded-lg hover:shadow-lg transition-shadow w-max"
                  >
                    <Link key={product.id} to={`/products/${product.id}`}>
                      <div className="h-max justify-center  duration-300 lg:w-48 w-40 cursor-pointer pb-2">
                        <div className="w-full relative mb-3 h-32 flex items-center justify-center">
                          <img
                            src={product.product.image as string}
                            alt={product.product.name}
                            className="object-cover h-32 w-full rounded-lg"
                          />
                        </div>
                        <div className={`text-left px-4 mb-4`}>
                          <h3 className="lg:text-base text-[12px] font-semibold h-[3rem] mb-2">
                            {product.product.name}
                          </h3>
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-gray-500 text-[10px]">
                              {product.product.weight}{" "}
                              {product.product.unitWeight}
                            </p>
                            <p className="border-2 p-2 rounded-lg lg:text-sm text-[10px] text-green-400">
                              {product.product.category.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="flex mb-3 items-center justify-between pr-2 pl-1 lg:px-4">
                      <p className=" text-[12px]  font-bold  lg:mr-6 text-[#b1bf4c]">
                        <FormatRupiah value={product.product.price} />
                      </p>
                      <Link to={"/cart"}>
                        <Button
                          color="success"
                          className=" text-white hover:bg-green-500 max-lg:bg-green-500 "
                        >
                          <MdOutlineAddShoppingCart className="lg:text-[18px]  text-[10px] " />
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
              {loading && <p>Loading...</p>}
            </div>
          </div>{" "}
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};
