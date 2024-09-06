import { Table } from "flowbite-react";
import ModalInput from "../../components/ModalInput";
import React, { useState } from "react";
import useUpdateStock from "../../../../hooks/stock/useUpdateStock";
import { IStock } from "../../../../types/stock.type";
import FormStock from "./FormStock";
import { format } from "date-fns";
import { FormatRupiah } from "@arismun/format-rupiah";

interface props {
  stock: IStock;
  refreshData: () => void;
}

const RowStock: React.FC<props> = ({ stock, refreshData }) => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const formik = useUpdateStock(stock, refreshData, setOpenUpdate);

  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell>{stock.id}</Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {stock.product.name}
      </Table.Cell>
      <Table.Cell>{stock.product.category.name}</Table.Cell>
      <Table.Cell>
        <FormatRupiah value={parseInt(stock.product.price)} />
      </Table.Cell>
      <Table.Cell>{stock.amount}</Table.Cell>
      <Table.Cell className="whitespace-nowrap">
        {format(new Date(stock.createdAt), "dd-LLL-yyyy")}
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap">
        {format(new Date(stock.updatedAt), "dd-LLL-yyyy")}
      </Table.Cell>
      <Table.Cell>
        <button
          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
          onClick={() => setOpenUpdate(true)}
        >
          Edit
        </button>
      </Table.Cell>
      <ModalInput<{ amount: number }>
        openModal={openUpdate}
        setOpenModal={setOpenUpdate}
        Form={FormStock}
        formik={formik}
        refreshData={refreshData}
        judul="Update Stock"
      />
    </Table.Row>
  );
};

export default RowStock;
