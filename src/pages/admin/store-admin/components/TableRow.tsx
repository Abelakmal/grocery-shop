import { Button, Table } from "flowbite-react";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import ModalDelete from "../../components/ModalDelete";
import ModalInput from "../../components/ModalInput";
import FormStoreAdmin from "./FormStoreAdmin";
import useUpdateStore from "../../../../hooks/admin/useUpdateStore";

export const TableRow = ({ index, storeAdmin, refreshData }: any) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const formik = useUpdateStore(storeAdmin, refreshData, setOpenUpdate);
  return (
    <Table.Row
      key={index}
      className="bg-white dark:border-gray-700 dark:bg-gray-800 text-sm"
    >
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {index + 1}
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap">{storeAdmin.name}</Table.Cell>
      <Table.Cell className="whitespace-nowrap">{storeAdmin.email}</Table.Cell>
      <Table.Cell className="whitespace-nowrap">
        {storeAdmin.store_branch?.name}
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
        url={`http://localhost:8000/api/store-admins/` + storeAdmin.id}
        openModal={openDelete}
        title={"Store Admin"}
        setOpenModal={setOpenDelete}
        refreshData={refreshData}
      />
      <ModalInput
        product={storeAdmin}
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
