import { FormatRupiah } from "@arismun/format-rupiah";
import { Button } from "flowbite-react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiMenu2Fill } from "react-icons/ri";
import { useCallback, useEffect, useState } from "react";
import useGetAllStock from "../../../hooks/stock/useGetAllStock";
import { ICategory } from "../../../types/category.type";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { ICart, ICartForm } from "../../../types/cart.type";
import useGetCarts from "../../../hooks/cart/useGetCarts";
import useCreateCart from "../../../hooks/cart/useCreateCart";
import useUpdateCart from "../../../hooks/cart/useUpdateCart";
import toast from "react-hot-toast";
import { SidebarProducts } from "./SidebarProducts";

export const ListProducts = () => {
  const { address } = useSelector((state: RootState) => state.address);
  const [sort, setSort] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(10);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search");
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const carts = useGetCarts(address.id);
  const { create } = useCreateCart();
  const { update } = useUpdateCart();
  const [filterCategory, setFilterCategory] = useState<ICategory[]>([]);
  const [showSide, setShowSide] = useState<boolean>(false);

  const { data, loading } = useGetAllStock(
    sort,
    search,
    filterCategory,
    pageSize,
    setHasMore
  );

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 10 >=
      document.documentElement.scrollHeight
    ) {
      if (hasMore) {
        setPageSize((prevPageSize) => prevPageSize + 10);
      }
    }
  }, [hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const addToCartHandler = async (
    stock_id: number,
    price: string,
    amount: number
  ) => {
    if (!user.id) {
      return navigate("/signin");
    }

    if (amount < 1) {
      return;
    }

    if (!address.id) {
      return toast.error("Anda harus membuat alamat Terlebih dahahulu", {
        duration: 2000,
      });
    }
    const cartItem: ICartForm = {
      stock_id,
      price_at_time: parseInt(price, 0),
      quantity: 1,
      user_id: user.id,
      address_id: address.id,
    };

    const isExist = carts.data.find(
      (cart: ICart) => cart.stock_id === stock_id
    );
    if (isExist && isExist?.quantity >= 10) {
      return;
    }
    if (isExist) {
      await update(isExist.quantity + 1, isExist.id as number);
    } else {
      await create(cartItem);
    }
    navigate("/cart");
  };

  return (
    <div className="w-full h-full mb-5 bg-white lg:pt-64 pt-24">
      <>
        <div className="fixed md:top-[8rem] top-[6.7rem] h-max  z-40 bg-white w-full shadow-lg">
          <div className="flex text-nowrap  justify-between items-center text-[10px] sm:text-xl h-full p-4   w-full">
            <div className="flex items-center">
              <div
                className="md:mx-3  h-max w-max md:p-2 p-1 mr-2 rounded-lg  cursor-pointer border-2 "
                onClick={() => setShowSide(!showSide)}
              >
                <RiMenu2Fill />
              </div>
              <p className="max-md:text-[10px]">
                Showing 1-{data?.data.length || 0} of {data?.total || 0} Results{" "}
                {search ? `of "${search}"` : ""}
              </p>
            </div>

            <div className="flex items-center ">
              <p className="mr-3 max-md:text-[10px] ">Sort By: </p>
              <select
                className="rounded-lg max-md:text-[8px] max-md:h-6 max-md:w-20  leading-none "
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value={""} className="max-md:text-[10px] w-max h-max">
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
          <SidebarProducts
            setFilterCategory={setFilterCategory}
            showSide={showSide}
          />
          {filterCategory.length > 0 && (
            <div className={`flex md:pb-4 pb-2 ml-7 `}>
              {filterCategory.map((data: ICategory, index: number) => {
                return (
                  <p
                    className="md:text-sm text-[8px] mr-2 bg-[#77818b] p-1 rounded whitespace-nowrap text-white"
                    key={index}
                  >
                    {data.name}
                  </p>
                );
              })}
            </div>
          )}
        </div>
        <div className="flex flex-col items-center w-full h-full  max-xl:mt-32 mt-4 ">
          {data && data?.data.length > 0 ? (
            <div className="grid  p-2 grid-cols-2 md:grid-cols-4 xl:grid-cols-6  gap-2 lg:gap-8 lg:mb-32 ">
              <>
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
                          <FormatRupiah
                            value={parseInt(product.product.price, 0)}
                          />
                        </p>
                        <Button
                          disabled={product.amount < 1}
                          color="success"
                          className={` text-white hover:bg-green-500 max-lg:bg-green-500 `}
                          onClick={() =>
                            addToCartHandler(
                              product.id,
                              product.product.price,
                              product.amount
                            )
                          }
                        >
                          <MdOutlineAddShoppingCart className="lg:text-[18px]  text-[10px] " />
                        </Button>
                      </div>
                    </div>
                  );
                })}
                {loading && (
                  <>
                    {[...Array(6)].map((_, index) => (
                      <div
                        key={index}
                        className="bg-[#f2f2f2] border rounded-lg hover:shadow-lg transition-shadow w-max animate-pulse"
                      >
                        <div className="h-max justify-center duration-300 lg:w-48 w-40 cursor-pointer pb-2">
                          <div className="w-full relative mb-3 h-32 flex items-center justify-center bg-gray-300 rounded-lg">
                            {/* Image Placeholder */}
                            <div className="bg-gray-200 h-32 w-full rounded-lg"></div>
                          </div>
                          <div className="text-left px-4 mb-4">
                            {/* Title Placeholder */}
                            <div className="bg-gray-200 h-4 w-3/4 rounded mb-2"></div>
                            {/* Weight & Category Placeholder */}
                            <div className="flex justify-between items-center mb-2">
                              <div className="bg-gray-200 h-3 w-1/3 rounded"></div>
                              <div className="bg-gray-200 h-3 w-1/4 rounded"></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex mb-3 items-center justify-between pr-2 pl-1 lg:px-4">
                          {/* Price Placeholder */}
                          <div className="bg-gray-200 h-4 w-1/3 rounded"></div>
                          {/* Button Placeholder */}
                          <div className="bg-gray-200 h-4 w-8 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </>
            </div>
          ) : (
            <div className="flex w-full justify-center h-screen items-center">
              Tidak Ada Product {":("}
            </div>
          )}
        </div>{" "}
      </>
    </div>
  );
};
