import { useState } from "react";
import { FaBoxOpen } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { FaBoxes } from "react-icons/fa";
import { TbReport } from "react-icons/tb";
import { RiAdminLine } from "react-icons/ri";
import { MdOutlineStorefront } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
import { jwtPayload } from "../../../types/admin.type";
import { BsFillArrowRightSquareFill } from "react-icons/bs";

export function SidebarAdmin({ setShow, isOpen, setIsOpen }: any) {
  const [dropDown, setDropdown] = useState(false);
  const token = localStorage.getItem("token");
  const decodeToken = jwtDecode<jwtPayload>(token as string);

  return (
    <div
      className={`flex transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:w-max w-full`}
    >
      <section className="bg-[#272c2f] text-white lg:w-max w-full h-screen pt-4 px-12 sticky top-0 500 shadow-[rgb(165,170,178)_3px_0px_8px_0px] shadow-black">
        <div className="flex justify-between w-full ">
          <h1 className={`font-mono font-bold text-[2rem]`}>
            Gr<span className="text-yellow-300">oc</span>eria
          </h1>
          <div
            className={` justify-between ${isOpen && "lg:hidden block"}`}
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className=" w-max  text-white p-1 rounded-md"
            >
              <BsFillArrowRightSquareFill className="text-4xl" />
            </button>
          </div>
        </div>
        <ul className="mt-20">
          <li
            className="flex items-center px-5 py-2 rounded-sm hover:bg-[#374151]"
            onClick={() => setShow(1)}
          >
            <MdDashboard className="mr-2" />
            Dashboard
          </li>
          {decodeToken.isSuper && (
            <li
              className="flex items-center px-5 py-2 whitespace-nowrap rounded-sm hover:bg-[#374151] cursor-pointer"
              onClick={() => setShow(2)}
            >
              <RiAdminLine className="mr-2" />
              Manage Store Admin
            </li>
          )}
          {decodeToken.isSuper && (
            <li
              className="flex items-center px-5 py-2 whitespace-nowrap rounded-sm hover:bg-[#374151] cursor-pointer"
              onClick={() => setShow(8)}
            >
              <MdOutlineStorefront className="mr-2" />
              Store Branch
            </li>
          )}
          <li className="px-5 py-2  mt-2 flex items-center flex-col">
            <h1
              className="flex items-center rounded-sm whitespace-nowrap hover:bg-[#374151] cursor-pointer"
              onClick={() => setDropdown(!dropDown)}
            >
              <FaBoxOpen className="mr-2" /> Product Management
              <span className="ml-2 text-xl font-bold">
                {dropDown ? "-" : "+"}
              </span>
            </h1>
            <ul className={`${dropDown ? "block" : "hidden"} text-sm ml-4`}>
              <li
                className="mt-2 text-white  px-5  py-1 rounded-sm hover:bg-[#374151] cursor-pointer"
                onClick={() => setShow(3)}
              >
                Manage Product
              </li>
              <li
                className="mt-2 text-white  px-5  py-1 rounded-sm hover:bg-[#374151] cursor-pointer"
                onClick={() => setShow(4)}
              >
                Manage Category
              </li>
              <li
                className="mt-2 text-white  px-5  py-1 rounded-sm hover:bg-[#374151] cursor-pointer"
                onClick={() => setShow(5)}
              >
                Manage Stock
              </li>
            </ul>
          </li>
          <li
            className="flex items-center mt-2 px-5 py-2 rounded-sm hover:bg-[#374151] cursor-pointer"
            onClick={() => setShow(6)}
          >
            <TbReport className="mr-2" />
            Sales Report
          </li>
          <li
            className="flex items-center mt-2 px-5 py-2 rounded-sm hover:bg-[#374151] cursor-pointer"
            onClick={() => setShow(7)}
          >
            <FaBoxes className="mr-2" />
            Stock Report
          </li>
        </ul>
      </section>
    </div>
  );
}
