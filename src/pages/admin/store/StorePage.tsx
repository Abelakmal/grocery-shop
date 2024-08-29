import {  Spinner } from "flowbite-react";
import { useGetStore } from "../../../hooks/store/useGetStore";
import TableStore from "./components/TableStore";
import ModalInput from "../components/ModalInput";
import { useState } from "react";
import FormStore from "./components/FormStore";
import useCreateStore from "../../../hooks/store/useCreateStore";

const StorePage = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const { data, loading, refreshData } = useGetStore();
  const formik = useCreateStore(refreshData, setOpenAdd);

  if (loading) {
    return (
      <div className="h-sceen w-full flex justify-center items-center bg-[#272c2f]">
        <Spinner aria-label="Extra large spinner example" size="xl" />
        <p className="ml-2 text-white">Loading...</p>
      </div>
    );
  }
  return (
    <div className="w-full px-10 py-10 bg-[#272c2f] text-white">
      <div className="flex justify-between top-0 sticky bg-[#272c2f] py-4">
        <h1 className={`md:text-3xl text-sm`}>Store Branch</h1>
        <button
          className="text-sm bg-green-600 p-1 rounded-md"
          onClick={() => setOpenAdd(true)}
        >
          Add Store Admin
        </button>
      </div>
      {data && <TableStore data={data} />}
      <ModalInput
        openModal={openAdd}
        setOpenModal={setOpenAdd}
        refreshData={refreshData}
        Form={FormStore}
        formik={formik}
        judul="Add Store"
      />
    </div>
  );
};

export default StorePage;
