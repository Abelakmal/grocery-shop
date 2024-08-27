import { Card } from "flowbite-react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import ModalDelete from "../../components/ModalDelete";
import ModalInput from "../../components/ModalInput";
import FormCategory from "./FormCategory";
import { baseURL } from "../../../../helper/config";
import useUpdateCategory from "../../../../hooks/categories/useUpdateCategory";
import { jwtPayload } from "../../../../types/admin.type";
import { jwtDecode } from "jwt-decode";

const CardCategory = ({ category, refreshData }: any) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const formik = useUpdateCategory(category, refreshData, setOpenUpdate);
  const token = localStorage.getItem("token");
  const decodeToken = jwtDecode<jwtPayload>(token as string);
  return (
    <Card className=" text-black text-lg w-max flex justify-center ">
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
      )}
      <ModalDelete
        url={baseURL + "/category/" + category.id}
        openModal={openDelete}
        title={"Category"}
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