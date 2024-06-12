'use client';
import { Card } from 'flowbite-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import ModalDelete from '../../components/ModalDelete';
import FormCategory from './FormCategory';
import useFormikCategoryForm from '@/app/hooks/formiks/useFormikCategoryForm';
import ModalInput from '../../components/ModalInput';

const CardCategory = ({ category, refreshData }: any) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const formik = useFormikCategoryForm(
    category,
    '/categories/update-category/' + category.id,
    refreshData,
    'put',
    setOpenUpdate,
  );
  return (
    <Card className=" text-black text-lg w-max flex justify-center ">
      <div className="w-32 h-full">
        <Image
          className=" rounded-lg"
          width={500}
          height={500}
          src={category.image}
          alt={category.name}
        />
      </div>
      <h1 className="font-bold">{category.name}</h1>
      <div className="flex text-base">
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
        url={`http://localhost:8000/api/products/delete-product/` + category.id}
        openModal={openDelete}
        title={'Category'}
        setOpenModal={setOpenDelete}
        refreshData={refreshData}
      />

      <ModalInput
        category={category}
        openModal={openUpdate}
        setOpenModal={setOpenUpdate}
        Form={FormCategory}
        formik={formik}
        refreshData={refreshData}
        judul="Edit Product"
      />
    </Card>
  );
};

export default CardCategory;
