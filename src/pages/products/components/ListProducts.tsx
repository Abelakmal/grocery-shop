import { FormatRupiah } from "@arismun/format-rupiah";
import { Button } from "flowbite-react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import useGetAllProduct from "../../../hooks/products/useGetAllProduct";
import { RiMenu2Fill } from "react-icons/ri";
import { useState } from "react";

export const ListProducts = ({ filterCategory, setShowSide }: any) => {
  const [sort, setSort] = useState<string>("random");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search");

  const { data, loading } = useGetAllProduct(sort, search, filterCategory);

  if (loading) {
    return (
      <div className="flex justify-center h-96 w-full items-center bg-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full lg:h-screen mb-5">
      {data ? (
        <>
          <div className="flex max-xl:fixed h-max items-center z-40 bg-white w-full shadow-lg">
            <div
              className="ml-2  h-max w-max p-2 rounded-lg block xl:hidden cursor-pointer border-2 "
              onClick={() => setShowSide(true)}
            >
              <RiMenu2Fill />
            </div>
            <div className="flex text-nowrap  justify-between items-center xl:shadow-lg text-[14px] sm:text-xl h-full p-4  xl:mx-5 xl:rounded-lg w-full">
              <p className="max-md:text-[10px]">
                Showing 1-{data?.length > 10 ? 10 : data.length} of{" "}
                {data?.length} Results {search ? `of "${search}"` : ""}
              </p>
              <div className="flex items-center ">
                <p className="mr-3 max-md:text-[10px]">Sort By: </p>
                <select
                  className="rounded-lg max-md:text-[8px] w-max h-max"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value={"random"} className="max-md:text-[10px]">Default</option>
                  <option value={"latest"} className="max-md:text-[10px]">latest</option>
                  <option value={"higher"} className="max-md:text-[10px]">highest price</option>
                  <option value={"lowest"} className="max-md:text-[10px]">lowest price</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center w-full h-full xl:h-screen max-xl:mt-32 mt-4 ">
            <div className="grid grid-cols-1 p-2  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:mb-32 lg:overflow-y-scroll">
              {data?.map((product) => {
                return (
                  <div
                    key={product.id}
                    className="bg-[#f2f2f2] border rounded-lg  w-max"
                  >
                    <Link key={product.id} to={`/products/${product.id}`}>
                      <div className="h-max justify-center hover:shadow-lg transition-shadow duration-300 cursor-pointer pb-2">
                        <div className="w-full relative mb-3 h-32 flex items-center justify-center">
                          <img
                            src={product.image as string}
                            alt={product.name}
                            width={600}
                            height={100}
                            className="object-cover h-32 w-full rounded-lg"
                          />
                        </div>
                        <div className={`text-left px-4 mb-4`}>
                          <h3 className="text-lg font-semibold h-[3rem] mb-2">
                            {product.name}
                          </h3>
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-gray-500 ">
                              {product.weight} {product.unitWeight}
                            </p>
                            <p className="border-2 p-2 rounded-lg text-sm text-green-400">
                              {product.category.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="flex mb-3 items-center justify-between pr-2 pl-1 lg:px-4">
                      <p className="lg:text-base text-sm  font-bold  mr-6 text-[#b1bf4c]">
                        <FormatRupiah value={product?.price} />
                      </p>
                      <Link to={"/cart"}>
                        <Button
                          color="success"
                          className=" text-black hover:bg-green-500 max-lg:bg-green-500 "
                        >
                          <MdOutlineAddShoppingCart className="text-2xl max-sm:text-sm " />
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>{" "}
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};
