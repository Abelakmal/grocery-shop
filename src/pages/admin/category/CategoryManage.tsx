import {  Spinner } from "flowbite-react";
import { useState } from "react";
import useGetAllCategory from "../../../hooks/categories/useGetAllCategory";
import { Toaster } from "react-hot-toast";
import ModalInput from "../components/ModalInput";
import FormCategory from "./components/FormCategory";
import CardCategory from "./components/CardCategory";
import useCreateCategory from "../../../hooks/categories/useCreateCategory";
import { jwtPayload } from "../../../types/admin.type";
import { jwtDecode } from "jwt-decode";

const CategoryManage = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const { data, loading, refreshData } = useGetAllCategory();
  const formik = useCreateCategory(refreshData, setOpenAdd);
  const token = localStorage.getItem("token");
  const decodeToken = jwtDecode<jwtPayload>(token as string);
  if (loading) {
    return (
      <div className="h-sceen w-full flex justify-center items-center">
        <Spinner aria-label="Extra large spinner example" size="xl" />
        <p className="ml-2">Loading...</p>
      </div>
    );
  }

  return (
    <section className="bg-[#272c2f] md:px-10 md:py-10 text-white w-full">
      <Toaster />
      <div className="flex justify-between top-0 sticky bg-[#272c2f] py-4">
        <h1 className={`md:text-3xl text-sm`}>Manage Category</h1>
        {decodeToken.isSuper && (
          <button
            className="text-sm bg-green-600 p-1 rounded-md"
            onClick={() => setOpenAdd(true)}
          >
            Add Category
          </button>
        )}
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

export default CategoryManage;
