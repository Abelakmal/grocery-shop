/* eslint-disable @next/next/no-img-element */
'use client';
import CartContext from '@/context/CartContext';
import Link from 'next/link';
import { useContext } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { IoBagHandle } from 'react-icons/io5';
import { IoPersonOutline } from 'react-icons/io5';

export const Header = () => {
  const { cart } = useContext(CartContext);
  const cartItems = cart?.cartItems;

  return (
    <header className="py-4 shadow-sm bg-white">
      <div className="container flex items-center justify-around">
        <a href="">
          <img src="/shop.png" className="w-10" alt="" />
        </a>

        <div className="hidden md:flex gap-2">
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-[400px] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
          </div>
          <button className="px-5 py-2 bg-green-500 text-white rounded-lg">
            Search
          </button>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <a
            href="#"
            className=" text-gray-700 hover:text-green-500 transition relative"
          >
            <div className="text-2xl mx-3">
              <FaRegHeart />
            </div>
            <div className="text-xs leading-3">Wish List</div>
            <span className="absolute right-1 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-green-500 text-white text-xs">
              0
            </span>
          </a>
          <Link
            href="/cart"
            className=" text-gray-700 hover:text-green-500 transition relative"
          >
            <div className="text-2xl mx-3">
              <IoBagHandle />
            </div>
            <div className="text-xs leading-3">Wish List</div>
            <span className="absolute right-1 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-green-500 text-white text-xs">
              {cartItems?.length || 0}
            </span>
          </Link>
          <a
            href="#"
            className=" text-gray-700 hover:text-green-500 transition relative"
          >
            <div className="text-2xl mx-3">
              <IoPersonOutline />
            </div>
            <div className="text-xs leading-3">Wish List</div>
          </a>
        </div>
      </div>
    </header>
  );
};
