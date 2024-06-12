'use client';
import { Button, Spinner } from 'flowbite-react';
import { Roboto } from 'next/font/google';
import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import CardCategory from './CardCategory';
import useGetAllCategory from '@/app/hooks/categories/useGetAllCategory';
import ModalInput from '../../components/ModalInput';
import FormCategory from './FormCategory';
import useFormikCategoryForm from '@/app/hooks/formiks/useFormikCategoryForm';
const roboto = Roboto({
  weight: '900',
  subsets: ['latin'],
});

const CategoryPage = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const { data, loading, refreshData } = useGetAllCategory();
  const formik = useFormikCategoryForm(
    {},
    '/categories/create-category',
    refreshData,
    'add',
    setOpenAdd,
  );
  if (loading) {
    return (
      <div className="h-sceen w-full flex justify-center items-center">
        <Spinner aria-label="Extra large spinner example" size="xl" />
        <p className="ml-2">Loading...</p>
      </div>
    );
  }
  return (
    <section className="bg-[#272c2f] px-10 py-10 text-white w-full">
      <Toaster />
      <div className="flex justify-between top-0 sticky bg-[#272c2f] py-4">
        <h1 className={`${roboto.className} text-3xl`}>Manage Category</h1>
        <Button size={'sm'} color="success" onClick={() => setOpenAdd(true)}>
          Add Category
        </Button>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {data &&
          data.map((category) => {
            return (
              <CardCategory
                key={category.id}
                category={category}
                refreshData={refreshData}
              />
            );
          })}
      </div>
      <ModalInput
        openModal={openAdd}
        setOpenModal={setOpenAdd}
        refreshData={refreshData}
        Form={FormCategory}
        formik={formik}
        judul="Add Product"
      />
    </section>
  );
};

export default CategoryPage;
