'use client';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import useGetAllCategory from '../hooks/categories/useGetAllCategory';
import { ICategory } from '../type.web/category.type';

const poppins = Poppins({ subsets: ['latin'], weight: '600' });
const poppins2 = Poppins({ subsets: ['latin'], weight: '400' });

const Category = () => {
  const { data } = useGetAllCategory();
  return (
    <div>
      <div className="max-w-7xl mx-auto px-5 pt-20 ">
        <div className="flex justify-between items-center mb-6">
          <h1
            className={`${poppins.className} text-2xl sm:text-3xl lg:text- text-left`}
          >
            Market Categories
          </h1>

          <Link
            href="/products"
            className={`${poppins2.className} text-base hover:underline`}
          >
            See more
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {data?.slice(0, 6).map((category: ICategory, index) => (
            <Link key={index} href={`/products?categoryId=${category.id}`}>
              <div className="flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div className="bg-white  rounded-lg shadow-md transform transition duration-300 hover:shadow-lg ">
                  <Image
                    width={200}
                    height={50}
                    src={category?.image || ''}
                    alt={category?.name || ''}
                  />
                </div>
                <span className={`${poppins2.className} mt-2 text-[#848484]`}>
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
