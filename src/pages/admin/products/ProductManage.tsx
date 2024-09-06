import {  Pagination, Spinner } from "flowbite-react";
import { useState } from "react";
import useGetAllProduct from "../../../hooks/products/useGetAllProduct";
import ModalInput from "../components/ModalInput";
import FormProduct from "./components/FormProduct";
import CardProduct from "./components/CardProduct";
import useCreateProduct from "../../../hooks/products/useCreateProduct";
import { jwtDecode } from "jwt-decode";
import { jwtPayload } from "../../../types/admin.type";

const ProductManage = () => {
  const [page, setCurrentPage] = useState(1);
  const [openAdd, setOpenAdd] = useState(false);
  const { data, refreshData, loading } = useGetAllProduct(page);
  const formik = useCreateProduct(refreshData, setOpenAdd);
  const token = localStorage.getItem("token");
  const decodeToken = jwtDecode<jwtPayload>(token as string);

  const onPageChange = (page: number) => setCurrentPage(page);

  if (loading) {
    return (
      <div className="h-sceen w-full flex justify-center items-center">
        <Spinner aria-label="Extra large spinner example" size="xl" />
        <p className="ml-2">Loading...</p>
      </div>
    );
  }

  return (
    <section className="w-full md:px-10 md:py-10 bg-[#272c2f] text-white h-full">
      <div className="flex justify-between top-0 sticky w-full  bg-[#272c2f] py-4">
        <h1 className={`md:text-3xl text-sm`}>Manage Product</h1>
        {decodeToken.isSuper && (
          <button
            className="text-sm bg-green-600 p-1 rounded-md"
            onClick={() => setOpenAdd(true)}
          >
            Add Product
          </button>
        )}
      </div>

      {data ? (
        <div className="grid md:grid-cols-4 lg:grid-cols-5 sm:grid-cols-3 grid-cols-2 mt-8 gap-2">
          {data.data.map((product) => {
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
      {data && (
        <div className=" text-[10px] flex w-full justify-center mt-10">
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(data?.total / data?.limit)}
            onPageChange={onPageChange}
          />
        </div>
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

export default ProductManage;
