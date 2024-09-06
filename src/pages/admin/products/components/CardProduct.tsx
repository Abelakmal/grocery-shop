import { FormatRupiah } from "@arismun/format-rupiah";
import { Card } from "flowbite-react";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import ModalInput from "../../components/ModalInput";
import FormProduct from "./FormProduct";
import useUpdateProduct from "../../../../hooks/products/useUpdateProduct";
import { jwtDecode } from "jwt-decode";
import { jwtPayload } from "../../../../types/admin.type";
import { IFormProduct, IProduct } from "../../../../types/product.type";

interface Props {
  product: IProduct;
  refreshData: () => void;
}

const CardProduct = ({ product, refreshData }: Props) => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const formik = useUpdateProduct(product, refreshData, setOpenUpdate);
  const token = localStorage.getItem("token");
  const decodeToken = jwtDecode<jwtPayload>(token as string);

  return (
    <Card className=" text-black text-[10px]" imgSrc={`${product.image}`}>
      <h5 className="lg:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        {product?.name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {product.description}
      </p>
      <div className="flex flex-col justify-between">
        <p className="font-bold text-nowrap">
          <FormatRupiah value={parseInt(product?.price)} /> /{" "}
          <span className="opacity-80 font-normal text-[8px]">
            {product.weight} {product.unitWeight.toLowerCase()}
          </span>
        </p>
        <p className="border-2 px-2 rounded-sm h-max font-semibold w-max mt-2 text-green-500">
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
          </>
        )}
      </div>
      <ModalInput<IFormProduct>
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
