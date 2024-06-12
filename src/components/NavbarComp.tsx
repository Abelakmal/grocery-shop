'use client';
import { FaSearch } from 'react-icons/fa';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { TbReport } from 'react-icons/tb';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { RiAccountCircleLine } from 'react-icons/ri';
import { FormEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';

const poppins = Poppins({ subsets: ['latin'], weight: '600' });

const NavbarComp = () => {
  const [search, setSearch] = useState('');
  
  const router =  useRouter()
  const handleSearch = (e: any) => {
    e.preventDefault()
    console.log(search);
    router.push(`/products?search=${search}`)
  }
  return (
    <div className="sticky top-0 z-50 bg-white">
      <div className="hidden text-xl sm:flex sm:flex-row sm:justify-center sm:max-w-7xl sm:container  sm:mx-auto sm:p-5 items-center">
        <Link href="/">
          <div className={`${poppins.className} flex items-center`}>
            <div className=" text-[#b1bf4c] text-5xl">Eco</div>
            <div className=" text-[#848484] text-5xl">Shop</div>
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
        <Link href="/cart">
          <button className="ml-6 flex">
            <span className="w-full text-4xl">
              <HiOutlineShoppingBag />
            </span>
          </button>
        </Link>
        <Link href="/transaction">
          <button className="ml-6 flex">
            <span className="w-full text-4xl">
              <TbReport />
            </span>
          </button>
        </Link>
        <Link href="/account">
          <button className="ml-6 flex">
            <span className="w-full text-4xl">
              <RiAccountCircleLine />
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavbarComp;
