import { FormatRupiah } from "@arismun/format-rupiah";
import { Card } from "flowbite-react";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import ModalDelete from "../../components/ModalDelete";
import { baseURL } from "../../../../helper/config";
import ModalInput from "../../components/ModalInput";
import FormProduct from "./FormProduct";
import useUpdateProduct from "../../../../hooks/products/useUpdateProduct";
import { jwtDecode } from "jwt-decode";
import { jwtPayload } from "../../../../types/admin.type";
// import ModalInput from '../../components/ModalInput';
// import FormProduct from './FormProduct';

const CardProduct = ({ product, refreshData }: any) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const formik = useUpdateProduct(product, refreshData, setOpenUpdate);
  const token = localStorage.getItem("token");
  const decodeToken = jwtDecode<jwtPayload>(token as string);

  return (
    <Card
      className=" text-black text-[10px]"
      imgSrc={`${product.image}`}
      horizontal
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {product?.name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {product.description}
      </p>
      <div className="flex justify-between">
        <p className="font-bold">
          <FormatRupiah value={product?.price} /> /{" "}
          <span className="opacity-80 font-normal">
            {product.weight} {product.unitWeight.toLowerCase()}
          </span>
        </p>
        <p className="border-2 px-2 rounded-sm font-semibold text-green-500">
          {product?.category?.name}
        </p>
      </div>
      <div className="flex">
        {decodeToken.isSuper && (
          <>
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
          </>
        )}
      </div>
      <ModalDelete
        url={baseURL + "/product/" + product.id}
        openModal={openDelete}
        title={"Product"}
        setOpenModal={setOpenDelete}
        refreshData={refreshData}
      />
      <ModalInput
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
