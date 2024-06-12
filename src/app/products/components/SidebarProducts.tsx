'use client';
import useGetAllCategory from '@/app/hooks/categories/useGetAllCategory';
import { ICategory } from '@/app/type.web/category.type';
import { Poppins } from 'next/font/google';
import React, { useState } from 'react';
const poppins = Poppins({ subsets: ['latin'], weight: '600' });
const poppins2 = Poppins({ subsets: ['latin'], weight: '100' });

const SidebarProducts = ({ setFilterCategory }: any) => {
  const [filter, setFilter] = useState<ICategory[]>([]);

  const handleChecked = (id: number, name: string) => {

    let dataFilter = [...filter];
    const isExist = dataFilter?.find((data) => data.name === name);
    if (isExist) {
      dataFilter = dataFilter?.filter((value) => value?.name !== name);
    } else {
      if (dataFilter?.length <= 3) dataFilter?.push({ id, name });
    }
    setFilterCategory(dataFilter)
    setFilter(dataFilter);
  };

  const handleRemoveFilter = (name: string) => {
    const remove = [...filter];
    const result = remove.filter((val) => val.name !== name);
    setFilter(result);
    setFilterCategory(result)
  };

  const [dropDown, setDropdown] = useState(false);
  const { data } = useGetAllCategory();
  return (
    <div className="p-10 h-max bg-[#4a5765] text-white">
      <div className="flex">
        {filter?.map((value: any, index: number) => {
          return (
            <div key={index}>
              {value.id !== 0 && (
                <p
                  className="text-sm mr-2 bg-[#77818b] p-1 rounded"
                  
                  onClick={() => handleRemoveFilter(value.name)}
                >
                  <span className="text-black">x </span>
                  {value.name}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <h1
        className={`${poppins.className} cursor-pointer`}
        onClick={() => setDropdown(!dropDown)}
      >
        Product <span className="text-[#b1bf4c]">Category</span>
        <span className="ml-2 text-xl font-bold">{dropDown ? '+' : '-'}</span>
      </h1>

      <div className={`  ${dropDown ? 'hidden' : 'block'}`}>
        {data &&
          data.map((value) => {
            return (
              <div
                key={value.id}
                className="flex items-center me-4 my-6 cursor-pointer hover:bg-[#374151] rounded-lg p-1"
                onClick={() =>
                  handleChecked(value?.id as number, value?.name as string)
                }
              >
                <div className="flex justify-between w-full">
                  <p
                    className={`ms-2 text-sm ${poppins2}  font-medium dark:text-gray-300`}
                  >
                    {value.name}
                  </p>
                  <span className="text-[12px] text-gray-400">
                    {value.product?.length}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
      <h2 className={`${poppins.className} mt-5`}>
        Filter <span className="text-[#b1bf4c]">Price</span>
      </h2>
      <form>
        <div className="my-3">
          <input type="text" placeholder="Price Max" className="rounded-lg" />
        </div>
        <div>
          <input type="text" placeholder="Price Min" className="rounded-lg" />
        </div>
      </form>
    </div>
  );
};

export default SidebarProducts;
