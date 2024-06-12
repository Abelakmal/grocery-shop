'use client';
import useGetAllCategory from '@/app/hooks/categories/useGetAllCategory';
import { format } from 'date-fns';
import { Button, Datepicker, Dropdown } from 'flowbite-react';
import React, { useState } from 'react';

const FilterSalesReport = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  categoryId,
  setCategoryId,
  refreshData,
}: any) => {
  const [dropDown, setDropdown] = useState(false);
  const category = useGetAllCategory();
  return (
    <div>
      <Button onClick={() => setDropdown(!dropDown)}>Filter</Button>
      <div
        className={`h-max p-2 w-96 bg-white m-4 border-2 shadow-lg text-black absolute right-0 z-50 ${
          dropDown ? 'block' : 'hidden'
        }`}
      >
        <h1 className="mb-4 text-center">Filter By</h1>
        <div className="">
          <label htmlFor="startDate" className="mr-2">
            Start Date
          </label>
          <Datepicker
            value={format(new Date(startDate || new Date().toISOString()), 'dd-LLL-yyyy')}
            onSelectedDateChanged={(date) => setStartDate(date.toISOString())}
          />
        </div>
        <div>
          <label htmlFor="endDate" className="mr-2">
            End Date
          </label>
          <Datepicker
            value={format(new Date(endDate), 'dd-LLL-yyyy')}
            onSelectedDateChanged={(date) => setEndDate(date.toISOString())}
          />
        </div>
        <div className="my-4 flex flex-col">
          <label htmlFor="category" className="mr-2">
            Category
          </label>
          <select
            name="category"
            id="category"
            className="rounded-lg"
            value={categoryId}
            onChange={(e) => setCategoryId(parseInt(e.target.value, 0))}
          >
            <option value={0}>All</option>
            {category.data?.map((value) => {
              return (
                <option value={value.id} key={value.id}>
                  {value.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSalesReport;
