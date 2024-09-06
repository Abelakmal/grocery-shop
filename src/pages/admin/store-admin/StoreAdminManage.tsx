import { useState } from "react";
import ModalInput from "../components/ModalInput";
import FormStoreAdmin from "./components/FormStoreAdmin";
import TableStoreAdmin from "./components/TableStoreAdmin";
import useCreateAdmin from "../../../hooks/admin/useCreateAdmin";
import useGetAdmin from "../../../hooks/admin/useGetAdmin";
import { Pagination } from "flowbite-react";

const StoreAdminManage = () => {
  const [page, setCurrentPage] = useState(1);
  const [openAdd, setOpenAdd] = useState(false);
  const { data, loading, refreshData } = useGetAdmin(page);
  const formik = useCreateAdmin(refreshData, setOpenAdd);

  const onPageChange = (page: number) => setCurrentPage(page);
  return (
    <div className="w-full px-10 py-10 bg-[#272c2f] text-white ">
      <div className="flex justify-between top-0 sticky bg-[#272c2f] py-4">
        <h1 className={`md:text-3xl text-sm`}>Manage Admin</h1>
        <button
          className="text-sm bg-green-600 p-1 rounded-md"
          onClick={() => setOpenAdd(true)}
        >
          Add Store Admin
        </button>
      </div>

      {data && (
        <TableStoreAdmin
          data={data.data}
          loading={loading}
          refreshData={refreshData}
        />
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
        Form={FormStoreAdmin}
        formik={formik}
        judul="Add Admin"
      />
    </div>
  );
};

export default StoreAdminManage;
