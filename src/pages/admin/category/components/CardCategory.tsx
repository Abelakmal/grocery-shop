import { Card } from "flowbite-react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import React, { useState } from "react";
import ModalDelete from "../../components/ModalDelete";
import ModalInput from "../../components/ModalInput";
import FormCategory from "./FormCategory";
import { baseURL } from "../../../../helper/config";
import useUpdateCategory from "../../../../hooks/categories/useUpdateCategory";
import { jwtPayload } from "../../../../types/admin.type";
import { jwtDecode } from "jwt-decode";
import { ICategory, IFormCatgeory } from "../../../../types/category.type";

interface Props {
  category: ICategory;
  refreshData: () => void;
}
const CardCategory: React.FC<Props> = ({ category, refreshData }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const formik = useUpdateCategory(category, refreshData, setOpenUpdate);
  const token = localStorage.getItem("token");
  const decodeToken = jwtDecode<jwtPayload>(token as string);
  return (
    <Card className=" text-black md:text-lg text-xs w-max flex justify-center ">
      <div className="w-32 h-full">
        <img
          className=" rounded-lg"
          width={500}
          height={500}
          src={category.image}
          alt={category.name}
        />
      </div>
      <h1 className="font-bold">{category.name}</h1>
      {decodeToken.isSuper && (
        <div className="flex lg:text-base text-xs">
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
      )}
      <ModalDelete
        url={baseURL + "/category/" + category.id}
        openModal={openDelete}
        title={"Category"}
        setOpenModal={setOpenDelete}
        refreshData={refreshData}
      />

      <ModalInput<IFormCatgeory>
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
