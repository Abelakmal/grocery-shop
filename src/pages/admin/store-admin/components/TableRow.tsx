import { Button, Table } from "flowbite-react";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import ModalDelete from "../../components/ModalDelete";
import ModalInput from "../../components/ModalInput";
import FormStoreAdmin from "./FormStoreAdmin";
import { IAdmin, IFormAdmin } from "../../../../types/admin.type";
import useUpdateAdmin from "../../../../hooks/admin/useUpdateAdmin";
import { baseURL } from "../../../../helper/config";

interface Props {
  admin: IAdmin;
  refreshData: () => void;
}

export const TableRow: React.FC<Props> = ({ admin, refreshData }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const formik = useUpdateAdmin(admin, refreshData, setOpenUpdate);
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 text-sm">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {admin.id}
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap">{admin.name}</Table.Cell>
      <Table.Cell className="whitespace-nowrap">{admin.email}</Table.Cell>
      <Table.Cell className="whitespace-nowrap">
        {admin.store_branch?.name}
      </Table.Cell>
      <Table.Cell className="flex justify-evenly">
        <Button
          className="mr-4 flex items-center hover:underline cursor-pointer"
          onClick={() => setOpenUpdate(true)}
        >
          edit <CiEdit />
        </Button>
        <Button
          className="flex items-center hover:underline cursor-pointer"
          onClick={() => setOpenDelete(true)}
        >
          delete <MdDelete />
        </Button>
      </Table.Cell>
      <ModalDelete
        url={`${baseURL}/admin/` + admin.id}
        openModal={openDelete}
        title={"Store Admin"}
        setOpenModal={setOpenDelete}
        refreshData={refreshData}
      />
      <ModalInput<IFormAdmin>
        openModal={openUpdate}
        setOpenModal={setOpenUpdate}
        Form={FormStoreAdmin}
        formik={formik}
        method={"put"}
        refreshData={refreshData}
        judul="Edit Store Admin"
      />
    </Table.Row>
  );
};
