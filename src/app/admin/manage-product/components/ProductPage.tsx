'use client';
import React, { useState } from 'react';
import { Roboto } from 'next/font/google';
import { Button, Spinner } from 'flowbite-react';
import CardProduct from './CardProduct';
import useGetAllProduct from '@/app/hooks/products/useGetAllProduct';
import ModalInput from '../../components/ModalInput';
import FormProduct from './FormProduct';
import useFormikProductForm from '@/app/hooks/formiks/useFormikProductForm';

const roboto = Roboto({
  weight: '900',
  subsets: ['latin'],
});

const ProductPage = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const { data, refreshData, loading } = useGetAllProduct();
  const formik = useFormikProductForm(
    {},
    '/products/create-product/',
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
    <section className="w-full px-10 py-10 bg-[#272c2f] text-white">
      <div className="flex justify-between top-0 sticky bg-[#272c2f] py-4">
        <h1 className={`${roboto.className} text-3xl`}>Manage Product</h1>
        <Button size={'sm'} color="success" onClick={() => setOpenAdd(true)}>
          Add Product
        </Button>
      </div>

      {data ? (
        <div className="grid grid-cols-2 mt-8 gap-2">
          {data.map((product) => {
            return (
              <CardProduct
                key={product.id}
                product={product}
                refreshData={refreshData}
              />
            );
          })}
        </div>
      ) : (
        <></>
      )}
      <ModalInput
        openModal={openAdd}
        setOpenModal={setOpenAdd}
        refreshData={refreshData}
        Form={FormProduct}
        formik={formik}
        judul="Add Product"
      />
    </section>
  );
};

export default ProductPage;
