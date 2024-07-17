import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const MobileSearch = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e: any) => {
    e.preventDefault();
    console.log(search);
    // router.push(`/products?search=${search}`)
    navigate(`/products?search=${search}`);
  };
  return (
    <div className="flex items-center md:hidden p-2">
      <Link to="/">
        <div className={` flex font-bold `}>
          <div className=" text-[#b1bf4c]  text-[7px] ">Grocery</div>
          <div className=" text-[#848484] text-sm h-full ">Shop</div>
        </div>
      </Link>
      <form
        onSubmit={handleSearch}
        className="z-10 relative ml-3"
      >
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <span className="w-full">
            <FaSearch className="text-[#848484]" />
          </span>
        </div>
        <input
          className=" bg-gray-100 text-gray-600 placeholder-gray-200 sm:focus:bg-white w-full pl-10  rounded-xl z-10  border-gray-200"
          placeholder="Search for product name..."
          type="text"
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </div>
  );
};

export default MobileSearch;
