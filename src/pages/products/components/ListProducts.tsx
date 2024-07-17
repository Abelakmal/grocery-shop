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

  const { data } = useGetAllProduct(sort,search, filterCategory);

  console.log(data);
  

  return (
    <div className="w-full h-full mb-5">
      {data ? (
        <>
          <div className="flex">
            <div
              className="m-4 h-max p-2 rounded-lg block lg:hidden cursor-pointer border-2"
              onClick={() => setShowSide(true)}
            >
              <RiMenu2Fill />
            </div>
            <div className="lg:flex sm:flex justify-between items-center shadow-lg mb-8 text-base sm:text-xl lg:text-xl mx-5 rounded-lg p-2 w-full">
              <p>
                Showing 1-{data?.length > 10 ? 10 : data.length} of{" "}
                {data?.length} Results {search ? `of "${search}"` : ""}
              </p>
              <div className="flex items-center mr-3  mt-2">
                <p className="mr-3">Sort By: </p>
                <select
                  className="rounded-lg"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value={"random"}>Default</option>
                  <option value={"latest"}>latest</option>
                  <option value={"higher"}>highest price</option>
                  <option value={"lowest"}>lowest price</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center w-full">
            <div className="grid grid-cols-2 p-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 overflow-y-scroll">
              {data?.map((product) => {
                return (
                  <div
                    key={product.id}
                    className="bg-[#f2f2f2] border rounded-lg"
                  >
                    <Link key={product.id} to={`/products/${product.id}`}>
                      <div className="h-max justify-center hover:shadow-lg transition-shadow duration-300 cursor-pointer pb-2 ">
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
                          className=" text-black hover:bg-green-500 max-lg:bg-green-500"
                        >
                          <MdOutlineAddShoppingCart className="text-2xl max-sm:text-sm" />
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
