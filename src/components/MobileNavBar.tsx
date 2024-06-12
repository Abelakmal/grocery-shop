import Link from 'next/link';
import { HiOutlineShoppingBag, HiShoppingBag } from 'react-icons/hi';
import { TbReport } from 'react-icons/tb';
import { RiAccountCircleLine } from 'react-icons/ri';
import { IoHomeOutline } from 'react-icons/io5';

const MobileNavBar = ({ itemOnCartCount }: any) => {
  return (
    <div className="fixed bottom-0 mx-auto z-50 w-full inset-x-0 bg-white shadow-lg md:hidden">
      <div className="flex justify-around items-center p-4 bg-gray-100 rounded-t-lg">
        <Link href="/">
          <div className="flex flex-col items-center text-xs hover:text-[#b1bf4c] transition-colors duration-150">
            <IoHomeOutline className="text-2xl hover:scale-110 transition-transform duration-150" />
            <span>Home</span>
          </div>
        </Link>
        <Link href="/cart">
          <div className="relative flex flex-col items-center text-xs hover:text-[#b1bf4c] transition-colors duration-150">
            <HiOutlineShoppingBag className="text-2xl hover:scale-110 transition-transform duration-150" />
            {itemOnCartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-[10px] px-2">
                {itemOnCartCount}
              </span>
            )}
            <span>Cart</span>
          </div>
        </Link>
        <Link href="/transaction">
          <div className="flex flex-col items-center text-xs hover:text-[#b1bf4c] transition-colors duration-150">
            <TbReport className="text-2xl hover:scale-110 transition-transform duration-150" />
            <span>Orders</span>
          </div>
        </Link>
        <Link href="/account">
          <div className="flex flex-col items-center text-xs hover:text-[#b1bf4c] transition-colors duration-150">
            <RiAccountCircleLine className="text-2xl hover:scale-110 transition-transform duration-150" />
            <span>Account</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MobileNavBar;
