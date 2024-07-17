import { FaSearch } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { TbReport } from "react-icons/tb";
import { RiAccountCircleLine } from "react-icons/ri";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavbarComp = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleSearch = (e: any) => {
    e.preventDefault();
    console.log(search);
    // router.push(`/products?search=${search}`)
    navigate(`/products?search=${search}`);
  };
  return (
    <div className="sticky top-0 z-50 bg-orange-50">
      <div className="hidden text-xl sm:flex sm:flex-row lg:justify-center justify-between sm:max-w-10xl sm:container  mx-auto lg:p-5 items-center">
        <Link to="/">
          <div className={` flex font-bold `}>
            <div className=" text-[#b1bf4c] lg:text-5xl ">Grocery</div>
            <div className=" text-[#848484] lg:text-5xl h-full ">Shop</div>
          </div>
        </Link>
        <form
          onSubmit={handleSearch}
          className="z-10 relative w-full sm:mx-4 md:mx-10 lg:mx-20 xl:mx-auto xl:max-w-3xl"
        >
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="w-full">
              <FaSearch className="text-[#848484]" />
            </span>
          </div>
          <input
            className="pl-12 bg-gray-100 text-gray-600 placeholder-gray-200 sm:focus:bg-white w-full mx-auto my-4 py-2 px-3 rounded-xl z-10 outline-0 border-gray-200"
            placeholder="Search for product name..."
            type="text"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        {token ? (
          <>
            <Link to="/cart">
              <button className="ml-6 flex">
                <span className="w-full text-4xl">
                  <HiOutlineShoppingBag />
                </span>
              </button>
            </Link>
            <Link to="/transaction">
              <button className="ml-6 flex">
                <span className="w-full text-4xl">
                  <TbReport />
                </span>
              </button>
            </Link>
            <Link to="/account">
              <button className="ml-6 flex">
                <span className="w-full text-4xl">
                  <RiAccountCircleLine />
                </span>
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to={"/signin"}>
              <button className="bg-green-600 text-white p-2 font-medium rounded-lg mr-2 whitespace-nowrap text-base">
                <p>SIGN IN</p>
              </button>
            </Link>
            <Link to={"/signup"}>
              <button className="hover:bg-green-600 hover:text-white font-medium bg-white p-2 rounded-lg border-2 text-base whitespace-nowrap">
                SIGN UP
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};


export default NavbarComp