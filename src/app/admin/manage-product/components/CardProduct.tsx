'use client';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { FormatRupiah } from '@arismun/format-rupiah';
import { Card } from 'flowbite-react';
import React, { useState } from 'react';
import FormProduct from './FormProduct';
import ModalDelete from '../../components/ModalDelete';
import useFormikProductForm from '@/app/hooks/formiks/useFormikProductForm';
import ModalInput from '../../components/ModalInput';

const CardProduct = ({ product, refreshData }: any) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const formik = useFormikProductForm(
    product,
    '/products/update-product/' + product.id,
    refreshData,
    'put',
    setOpenUpdate,
  );
  return (
    <Card
      className="max-w-12 text-black text-[10px]"
      imgSrc={`${product.image}`}
      horizontal
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {product?.name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order.
      </p>
      <div className="flex justify-between">
        <p className="font-bold">
          <FormatRupiah value={product?.price} /> /{' '}
          <span className="opacity-80 font-normal">
            {product.weight} {product.unitWeight.toLowerCase()}
          </span>
        </p>
        <p className="border-2 px-2 rounded-sm font-semibold text-green-500">
          {product?.category?.name}
        </p>
      </div>
      <div className="flex">
        <p
          className="mr-4 flex items-center hover:underline cursor-pointer"
          onClick={() => setOpenUpdate(true)}
        >
          edit <CiEdit />
        </p>
        <p
          className="flex items-center hover:underline cursor-pointer"
          onClick={() => setOpenDelete(true)}
        >
          delete <MdDelete />
        </p>
      </div>
      <ModalDelete
        url={`http://localhost:8000/api/products/delete-product/` + product.id}
        openModal={openDelete}
        title={'Product'}
        setOpenModal={setOpenDelete}
        refreshData={refreshData}
      />
      <ModalInput
        product={product}
        openModal={openUpdate}
        setOpenModal={setOpenUpdate}
        Form={FormProduct}
        formik={formik}
        refreshData={refreshData}
        judul="Edit Product"
      />
    </Card>
  );
};

export default CardProduct;
