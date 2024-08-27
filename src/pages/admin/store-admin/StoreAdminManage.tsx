import { Button } from "flowbite-react";
import { useState } from "react";
import ModalInput from "../components/ModalInput";
import FormStoreAdmin from "./components/FormStoreAdmin";
import TableStoreAdmin from "./components/TableStoreAdmin";

import useCreateAdmin from "../../../hooks/admin/useCreateAdmin";
import useGetAdmin from "../../../hooks/admin/useGetAdmin";

const StoreAdminManage = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const { data, loading, refreshData } = useGetAdmin();
  const formik = useCreateAdmin(refreshData, setOpenAdd);
  return (
    <div className="w-full px-10 py-10 bg-[#272c2f] text-white">
      <div className="flex justify-between top-0 sticky bg-[#272c2f] py-4">
        <h1 className={`text-3xl`}>Manage Admin</h1>
        <Button size={"sm"} color="success" onClick={() => setOpenAdd(true)}>
          Add Store Admin
        </Button>
      </div>

      {data && (
        <TableStoreAdmin
          data={data}
          loading={loading}
          formik={formik}
          refreshData={refreshData}
        />
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
